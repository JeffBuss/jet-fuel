const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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
  database('folders').select()
    .then((folders) => {
      response.status(200).json(folders);
    })
    .catch((error) => {
      console.error('error stuff shit team');
    })
})

// app.get('/api/urls', (request, response) => {
//   database('urls').select()
//     .then((urls) => {
//       response.status(200).json(urls);
//     })
//     .catch((error) => {
//       console.error('error stuff shit team');
//     })
// })
app.get('/api/folders/:folderId/urls', (request, response) => {
  const { folderId } = request.params
    database('urls').where('folderId', folderId).select()
      .then((urls) => {
        response.status(200).json(urls);
      })
      .catch((error) => {
        console.error('error stuff shit team');
  })
})

app.post('/api/folders/:folderId/urls', (request, response) => {
  const { folderId } = request.params
  const date = Date.now()
  const id = request.body.id
  const urlName = request.body.urlName
  app.locals.urls.push({ folderId, date, id, urlName })
  response.json({ folderId, date, id, urlName })
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

module.exports = app;
