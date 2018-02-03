package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/fatih/color"
	"github.com/gorilla/handlers"
	mgo "gopkg.in/mgo.v2"
)

const keysDir = "keys"
const postsDir = "ownposts"
const keysize = 2048
const hashize = 1536

var userCollection *mgo.Collection
var postCollection *mgo.Collection

func main() {
	color.Blue("Starting ipfs-ai-models-market")

	readConfig("config.json")
	fmt.Println(config)

	//create models directory
	_ = os.Mkdir(keysDir, os.ModePerm)
	//create models directory
	_ = os.Mkdir(postsDir, os.ModePerm)

	initializeToken()

	//mongodb
	session, err := getSession()
	check(err)
	userCollection = getCollection(session, "users")
	postCollection = getCollection(session, "posts")

	//run thw webserver
	go GUI()

	//run API
	log.Println("api server running")
	log.Print("port: ")
	log.Println(config.APIPort)
	router := NewRouter()
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Access-Control-Allow-Origin", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	log.Fatal(http.ListenAndServe(":"+config.APIPort, handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}

func GUI() {
	//here, run webserver
	log.Println("webserver in port " + config.WebPort)
	http.Handle("/", http.FileServer(http.Dir("./webapp")))
	http.ListenAndServe(":"+config.WebPort, nil)
}
