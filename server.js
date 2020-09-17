const fs = require("fs")
const express = require("express")
// Tells node that we are creating an "express" server
const app = express()
//The path package to get the correct file path for our html
const path = require("path")
const PORT = process.env.PORT || 8080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//API GET Requests
//Below case when a user visits '/notes' then send notes.html to the client
app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname + "/public/notes.html"))
})
//API GET Requests
//Below case when a user visits '/notes' then send notes.html to the client
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname + "/public/index.html"))
})
//API GET Requests
//Below case when a user visits '/api/notes' then send all saved notes form db.json to client
app.get("/api/notes", (req, res) => {

   fs.readFile("db/db.json", function (err, object) {
      if (err) {
         throw err
      }
      res.json(object)
   })
})







