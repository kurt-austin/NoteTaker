const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/',(req,res)=> res.sendFile(path.join(__dirname,'assets', 'notes.html')))

let note = [];


// HTML Routes

app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './assets/notes.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/index.html'))
})


// API Routes


// Get route for getting notes

app.get("/api/notes", function(req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  fs.readFile("./db/db.json", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    console.log(data);
    res.json(data);
  
  });


});



 // POST route for saving a new note
  app.post("/api/notes", function(req, res) {


   fs.readFile("./db/db.json", "utf8", function(error, data) {
    console.log(typeof(note));

     if (error) {
       return console.log(error);
     }
   
  
 });

 console.log(req.body);

 fs.appendFile("./db/db.json", JSON.stringify(req.body), "utf8", function (err) {
  if (err) throw err;
  console.log('Updated!');
});



 });

// DELETE route for deleting a note
//  app.delete("/api/notes/:id", function(req, res) {


//    fs.readFile("./db/db.json", "utf8", function(error, data) {

//      if (error) {
//        return console.log(error);
//      }
  
//     console.log(data);
  
//   });
//   db.Post.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(dbPost) {
//     res.json(dbPost);
//   });
// });





app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`)
})