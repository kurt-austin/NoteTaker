const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/',(req,res)=> res.sendFile(path.join(__dirname,'assets', 'notes.html')))


app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './assets/notes.html'))
})


app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`)
})