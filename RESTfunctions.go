package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"gopkg.in/mgo.v2/bson"
)

type User struct {
	Id       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Username string        `json:"username"`
	Email    string        `json:"email"`
	Password string        `json:"password"`
	Token    string        `json:"token"`
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
	err = userCollection.Update(bson.M{"_id": rUser.Id}, rUser)
	check(err)

	jResp, err := json.Marshal(rUser)
	if err != nil {
		panic(err)
	}
	fmt.Fprintln(w, string(jResp))
}
