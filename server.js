const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('build'))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Jet Fuel'
app.locals.folders = [];
app.locals.urls = [];

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
   response.send(file)
 })
})

app.get('/api/folders', (request, response) => {
  const folders = app.locals.folders
  response.json({ folders })
})

app.get('/api/urls', (request, response) => {
  const urls = app.locals.urls
  response.json({ urls })
})

app.post('/api/folders', (request, response) => {
  const id = Date.now()
  const folderName = request.body.folderName
  app.locals.folders.push({id, folderName})
  response.json({ id , folderName})
})

app.post('/api/urls', (request, response) => {
  const id = request.body.id
  const urlName = request.body.urlName
  const folderId = request.body.folderId
  app.locals.urls.push({ id, urlName, folderId })
  response.json({ id, urlName, folderId })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
