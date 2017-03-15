require ('../styles.scss');

const urlBtn = $('.url-btn')
const folderBtn = $('.folder-btn')
const folderList = $('.folder-list')


folderBtn.on('click', (arr) => {
  event.preventDefault()
  let input = $('.folder-input').val()
  saveFolder(input)
  clearFolders()
  loadFolders()
})

const loadFolders = () => {
  fetch('http://localhost:3000/api/folders', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayFolders(response))
}

loadFolders()

const saveFolder = (input) => {
  fetch('http://localhost:3000/api/folders', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      folderName: input,
    })
  })
  .then(response => response.json())
  .then(response => console.log('push folder', response))
}

const clearFolders = () => {
  $('.url-folder').empty();
}


const displayFolders = (arr) => {
  arr.folders.map((el) => {
    $('.url-folder').append(
      `<li class='${el.folderName}' id='${el.id}'>${el.folderName}</li>`
    )
  })
}

const pushURL = (input) => {
  fetch('http://localhost:3000/api/urls', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      urlName: input,
    })
  })
  .then(response => response.json())
  .then(response => console.log('push url', response))
}

urlBtn.on('click', () => {
  event.preventDefault()
  let input = $('.url-input').val()
  $('.url-list').append(
    `<p>${input}<p>`
  )
  pushURL(input)
})

$('.url-folder').on('click', 'li', (e) => {

  console.log(e.target.id)
})
