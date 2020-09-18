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
app.use(express.static(path.join(__dirname + "/public")));


app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname + "/public/index.html"))
})
//API GET Requests
//Below case when a user visits '/notes' then send notes.html to the client
app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname + "/public/notes.html"))
})
//API GET Requests
//Below case when a user visits '/notes' then send notes.html to the client

//API GET Requests
//Below case will send all saved notes form db.json to client
app.get("/api/notes", (req, res) => {
   fs.readFile(path.join(__dirname + "/db/db.json"), function (err, object) {
      if (err) {
         throw err
      }
      res.json(JSON.parse(object))
   })
})

//API POST Requests
//Below case after the user click save button will send the saved notes to db.json then send it to the client back
app.post("/api/notes", (req, res) => {

   fs.readFile(path.join(__dirname + "/db/db.json"), function (err, object) {
      if (err) {
         console.log(err)
         return
      }
      var notes = JSON.parse(object)

      const newNote = {
         title: req.body.title,
         text: req.body.text,
         id: Math.random().toString(36).substr(2, 9)
      }

      notes.push(newNote)

      let noteJSON = JSON.stringify(notes)
      console.log(noteJSON)

      fs.writeFile(path.join(__dirname + "/db/db.json"), noteJSON, (err) => {
         if (err) {
            return console.log(err)
         }
         return noteJSON
      })
   })
})

app.listen(PORT, function () {
   console.log("App listening on PORT " + PORT);
});


