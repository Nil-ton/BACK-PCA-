const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')  

const app = express()
const port = process.env.PORT || 3000

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*")
  app.use(cors())
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/post', (req,res) => {
  const fileDataRead = fs.readFileSync(path.resolve(__dirname,'database.json'), 'utf-8')
  const fileDataModified = JSON.parse(fileDataRead)
  
  fileDataModified[req.query.page].push(req.body)

  fs.writeFileSync(path.resolve(__dirname,'database.json'), JSON.stringify(fileDataModified,null, 2))
})

app.post('/post/edit/:page/:index', (req,res) => {
  const fileDataRead = fs.readFileSync(path.resolve(__dirname,'database.json'), 'utf-8')
  const fileDataModified = JSON.parse(fileDataRead)

  fileDataModified[req.params.page][Number(req.params.index)] = req.body

  fs.writeFileSync(path.resolve(__dirname,'database.json'), JSON.stringify(fileDataModified,null, 2))
})

app.get('/:page',(req,res) => {
  const fileDataRead = fs.readFileSync(path.resolve(__dirname,'database.json'), 'utf-8')
  const fileDataModified = JSON.parse(fileDataRead)

  res.json(fileDataModified[req.params.page])
})

app.delete('/delete/:index',(req,res) => {
  const fileDataRead = fs.readFileSync(path.resolve(__dirname,'database.json'), 'utf-8')
  const fileDataModified = JSON.parse(fileDataRead)

  fileDataModified[req.query.page].splice(req.params.index, 1)

  fs.writeFileSync(path.resolve(__dirname,'database.json'), JSON.stringify(fileDataModified,null, 2))
})


app.listen(port, () => console.log(`Listenner in http://localhost:${port}`))
