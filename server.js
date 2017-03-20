const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('build'))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Jet Fuel'
app.locals.folders = []
app.locals.urls = []

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
   response.send(file)
 })
})

app.get('/:id', (request, response) => {
  const id = request.params.id
  database('urls').where('id', request.params.id).increment('clicks', 1)
  .then(() => {
    database('urls').where('id', id).select()
        .then((url) => {
          response.redirect(`http://${url[0].urlName}`);
        })
        .catch((error) => {
        })
    })
})

app.get('/api/folders', (request, response) => {
  database('folders').select()
    .then((folders) => {
      response.status(200).json(folders)
    })
    .catch((error) => {
    })
})

app.post('/api/folders', (request, response) => {
  const folderName = request.body.folderName
  const folders = { folderName }
  database('folders').insert(folders)
  .then((folders) => {
    database('folders').select()
      .then((folders) => {
        response.status(200).json(folders)
      })
      .catch((error) => {
        console.log('something is wrong w db (folders)')
    })
  })
})

app.get('/api/folders/:folderId/urls', (request, response) => {
  const { folderId } = request.params
    database('urls').where('folderId', folderId).select()
      .then((urls) => {
        response.status(200).json(urls)
      })
      .catch((error) => {
        console.error('something wrong w db (get urls)')
  })
})

app.post('/api/folders/:folderId/urls', (request, response) => {
  const { folderId } = request.params
  const urlName = request.body.urlName
  const d = new Date()
  const date = d.toString()
  const clicks = 0
  const urls = {folderId, urlName, date, clicks}
  database('urls').insert(urls)
  .then(() => {
    database('urls').select()
      .then((urls) => {
        response.status(200).json(urls)
      })
    .catch((error) => {
      console.log('something is wrong w db (urls)')
    })
  })
})

app.patch('/api/folders/:folderId/urls', (request, response) => {
  database('urls').increment('clicks', 1).where('id', request.body.urlId)
  .then(clicks => {
    database('urls').where('folderId', request.params.folderId).select()
    .then(urls => {
      response.status(200).json(urls);
    })
    .catch(error => {
      console.error('somethings wrong with db (patch)')
    })
  })

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
