const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('build'))


app.set('port', process.env.PORT || 3000)
app.locals.title = 'Jet Fuel'
app.locals.folders = [];

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
   response.send(file)
 })
})

app.get('/api/folders', (request, response) => {
  const folders = app.locals.folders
  response.json({ folders })
})

app.post('/api/folders', (request, response) => {
  const id = Date.now()
  const folderName = request.body.folderName
  app.locals.folders.push(id, folderName)
  response.json({ id , folderName})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
