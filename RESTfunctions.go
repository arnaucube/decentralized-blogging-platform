package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"
	"strings"
	"time"

	"github.com/fatih/color"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2/bson"
)

type Post struct {
	ID       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Title    string        `json:"title"`
	Summary  string        `json:"summary"`
	Date     time.Time     `json:"date"`
	ThumbImg string        `json:"thumbimg"`
	Content  string        `json:"content"`
	User     User          `json:"user"`
}
type User struct {
	ID          bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Username    string        `json:"username"`
	Name        string        `json:"name"`
	LastName    string        `json:"lastname"`
	Twitter     string        `json:"twitter" bson:",omitempty"`
	Description string        `json:"description" bson:",omitempty"`
	Email       string        `json:"email" bson:",omitempty"`
	Password    string        `json:"password" bson:",omitempty"`
	Token       string        `json:"token" bson:",omitempty"`
	Posts       []Post        `json:"posts" bson:",omitempty"`
}

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "clientApp")
}

func Signup(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Print("user signup: ")
	fmt.Println(user.Username)

	//save the new project to mongodb
	rUser := User{}
	err = userCollection.Find(bson.M{"email": user.Email}).One(&rUser)
	if err != nil {
		//user not exists
		err = userCollection.Insert(user)
		err = userCollection.Find(bson.M{"email": user.Email}).One(&user)
	} else {
		//user exists
		http.Error(w, "user already registered", http.StatusConflict)
		return
	}

	fmt.Println(user.Username)
	jResp, err := json.Marshal(user)
	if err != nil {
		panic(err)
	}
	fmt.Fprintln(w, string(jResp))
}

func Login(w http.ResponseWriter, r *http.Request) {

	decoder := json.NewDecoder(r.Body)
	var user User
	err := decoder.Decode(&user)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()
	//TODO check if the user password exists in the database

	fmt.Print("user login: ")
	fmt.Println(user)

	//save the new project to mongodb
	rUser := User{}
	err = userCollection.Find(bson.M{"email": user.Email}).One(&rUser)
	if err != nil {
		http.Error(w, "error login, email not foun", http.StatusConflict)
		return
	}
	//user exists, check password
	if user.Password != rUser.Password {
		http.Error(w, "error login, password not match", http.StatusConflict)
		return
	}

	token, err := newToken()
	check(err)
	rUser.Token = token

	//update with the token
	err = userCollection.Update(bson.M{"_id": rUser.ID}, rUser)
	check(err)

	jResp, err := json.Marshal(rUser)
	if err != nil {
		panic(err)
	}
	fmt.Fprintln(w, string(jResp))
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	//get projects from mongodb
	users := []User{}
	err := userCollection.Find(bson.M{}).Limit(50).All(&users)
	check(err)

	jResp, err := json.Marshal(users)
	check(err)
	fmt.Fprintln(w, string(jResp))
}
func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userid := vars["userid"]

	//get projects from mongodb
	user := User{}
	err := userCollection.Find(bson.M{"_id": bson.ObjectIdHex(userid)}).One(&user)
	check(err)

	err = postCollection.Find(bson.M{"user._id": bson.ObjectIdHex(userid)}).Limit(50).All(&user.Posts)
	check(err)

	//for each post, get the user
	for i, _ := range user.Posts {
		err = userCollection.Find(bson.M{"_id": user.Posts[i].User.ID}).One(&user.Posts[i].User)
		check(err)
		//TODO don't return the user.Token, password, etc only the Name, LastName, Username, img
	}

	jResp, err := json.Marshal(user)
	check(err)
	fmt.Fprintln(w, string(jResp))
}
func NewPost(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var post Post
	err := decoder.Decode(&post)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	//get user by token
	usertoken := r.Header.Get("Authorization")
	user := User{}
	err = userCollection.Find(bson.M{"token": usertoken}).One(&user)
	check(err)

	//save the post.Content into an html file
	err = ioutil.WriteFile(postsDir+"/"+"file.html", []byte(post.Content), 0644)
	check(err)
	//add the html file to ipfs
	out, err := exec.Command("bash", "-c", "ipfs add "+postsDir+"/file.html").Output()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(out)
	hash := strings.Split(string(out), " ")[1]
	color.Blue(hash)

	//save the hash to the post.content
	post.Content = hash

	//add date to post
	post.Date = time.Now()

	//add user.id to post.user
	post.User.ID = user.ID
	err = postCollection.Insert(post)
	check(err)

	//get user
	//user = User{}
	err = userCollection.Find(bson.M{"token": usertoken}).One(&user)
	check(err)

	jResp, err := json.Marshal(user)
	if err != nil {
		panic(err)
	}
	fmt.Fprintln(w, string(jResp))
}

func GetPosts(w http.ResponseWriter, r *http.Request) {
	//get projects from mongodb
	posts := []Post{}
	err := postCollection.Find(bson.M{}).Limit(50).All(&posts)
	check(err)

	//for each post, get the user
	for i, _ := range posts {
		fmt.Println(posts[i].User.ID)
		err = userCollection.Find(bson.M{"_id": posts[i].User.ID}).One(&posts[i].User)
		check(err)
		//TODO don't return the user.Token, password, etc only the Name, LastName, Username, img
	}
	jResp, err := json.Marshal(posts)
	check(err)
	fmt.Fprintln(w, string(jResp))
}
func GetPost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	postid := vars["postid"]

	//get projects from mongodb
	post := Post{}
	err := postCollection.Find(bson.M{"_id": bson.ObjectIdHex(postid)}).One(&post)
	check(err)

	err = userCollection.Find(bson.M{"_id": post.User.ID}).One(&post.User)
	check(err)

	jResp, err := json.Marshal(post)
	check(err)
	fmt.Fprintln(w, string(jResp))
}
