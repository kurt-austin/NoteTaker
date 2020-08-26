const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 3000

let notes = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'))


// API Routes


// Get route for getting notes

app.get("/api/notes", function (req, res) {

  // Reading the string from the file. 

  notes = fs.readFileSync("db/db.json", "utf8");

  // Parsing the string into an object.


  notes = JSON.parse(notes);

  // Returning the string to the browser

  res.json(notes);


});


// POST route for saving a new note

app.post("/api/notes", function (req, res) {

  // Reading the string from the file

  notes = fs.readFileSync("db/db.json", "utf8");

  // Parsing the string into an object.
  notes = JSON.parse(notes);

  // Adding the ID based on the length of the object.

  req.body.id = notes.length;

  // Pushing the response to the notes array of objects.   

  notes.push(req.body);

  // Stringifying the object to save it to the file.
  notes = JSON.stringify(notes);

  // Writing the new entry to the file.

  fs.writeFileSync("./db/db.json", notes, "utf8", function (err) {
    if (err) throw err;

  });

  // Reading the string file with the new etnry.

  notes = fs.readFileSync("db/db.json", "utf8");

  // Parsing the string to an array of objects so that it can be returned to the browser.

  notes = JSON.parse(notes);

  // Returning the array to the browser.

  res.json(notes);

});

// DELETE route for deleting a note
app.delete("/api/notes/:id", function (req, res) {

  // Reading the string from the file

  notes = fs.readFileSync("db/db.json", "utf8");

  // Parsing the string into an object.

  notes = JSON.parse(notes);

  // Looping through the length of the array of objects.

  for (let i = 0; i < notes.length; i++) {

    // If the loop object is = the chosen one deleted, splice the array by deleting that object.      
    if (notes[i].id === parseInt(req.params.id)) {
      notes.splice(i, 1);
    }

  };

  // Stringifying the new object (minus the deleted note) so that it can be written to the file.   
  notes = JSON.stringify(notes);

  // Write to the file   
  fs.writeFileSync("./db/db.json", notes, "utf8", function (err) {
    // error handling
    if (err) throw err;
  });

  // Reading the new file

  notes = fs.readFileSync("db/db.json", "utf8");

  // Parsing the string file into an array of object.

  notes = JSON.parse(notes);

  // Pushing the array to the browser.   

  res.json(notes);

});

// HTML Routes

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/notes.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/index.html'))
})


app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`)
})