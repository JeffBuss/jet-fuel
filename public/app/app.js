require ('../styles.scss');

const urlBtn = $('.url-btn')
const folderBtn = $('.folder-btn')
const folderList = $('.folder-list')

let currentFolder = undefined

folderBtn.on('click', (arr) => {
  event.preventDefault()
  let input = $('.folder-input').val()
  saveFolder(input)
  clearFolders()
  loadFolders()
})


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

$('.url-folder').on('click', 'li', (e) => {
  // const folderId = e.target.id
  currentFolder = e.target.id
  console.log(currentFolder)
  // pushURL(folderId)
})

urlBtn.on('click', () => {
  event.preventDefault()
  let input = $('.url-input').val()
  $('.url-list').append(
    `<p className='$currentFolder'>${input}<p>`
  )
  pushURL(input)
  console.log(currentFolder);
})

loadFolders()

const displayFolders = (arr) => {
  arr.folders.map((el) => {
    const folderId = el.id
    $('.url-folder').append(
      `<li class='${el.folderName}' id='${el.id}'>${el.folderName}</li>`
    )
  })
}

const pushURL = (input, folderId) => {
  fetch('http://localhost:3000/api/urls', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      urlName: input,
      folderId: currentFolder,
    })
  })
  .then(response => response.json())
  .then(response => console.log('push url', response))
}

const displayUrls = (arr) => {
  arr.urls.map((el) => {
    // const folderId = el.id
    $('.url-list').append(
      `<li class='${el.urlName}' id='${el.id}'>${el.urlName}</li>`
    )
  })
}

const loadUrls = () => {
  fetch('http://localhost:3000/api/urls', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayUrls(response))
}

loadUrls()
