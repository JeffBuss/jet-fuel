require('../reset.css');
require ('../styles.scss');

const urlBtn = $('.url-btn')
const folderBtn = $('.folder-btn')
const folderList = $('.folder-list')

let currentFolder = undefined
let clicked = 0

folderBtn.on('click', (event) => {
  event.preventDefault()
  let input = $('.folder-input').val()
  saveFolder(input)
})

const saveFolder = (input) => {
  fetch(`/api/folders`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      folderName: input,
    })
  })
  .then(response => response.json())
  .then(response => displayFolders(response))
}

const clearFolders = () => {
  $('.url-folder').empty();
}

const loadFolders = () => {
  fetch('/api/folders', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayFolders(response))
}
loadFolders()

$('.url-folder').on('click', 'li', (e) => {
  currentFolder = e.target.id
    if(currentFolder) {
      fetch(`/api/folders/${currentFolder}/urls`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(response => displayUrls(response))
    }
})

urlBtn.on('click', () => {
  event.preventDefault()
  let input = $('.url-input').val()
  pushURL(input)
  loadUrls()
})


const displayFolders = (folders) => {
  clearFolders()
  console.log('folders', folders)
  folders.map((el) => {
    $('.url-folder').append(
      `<li class='${el.folderName} btn folder-list' id='${el.id}'>${el.folderName}</li>`
    )
  })
}

const pushURL = (input) => {
  console.log('input', input)
  fetch(`/api/folders/${currentFolder}/urls`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      urlName: input,
      folderId: currentFolder,
      id: 5,
    })
  })
  .then(response => response.json())
  .then(response => loadUrls(response)
  )
}

const displayUrls = (folders) => {
  clearUrls()
  if(folders.length > 0) {
    folders.map((el) => {
      // let clicked = 0
      console.log('el?', el)
      $('.url-list').append(
        `<li class='${el.urlName}' id='${el.id}'><a target='_blank' href=${el.urlName}>${el.id} </a> visits: ${clicked}</li>`
      )
    })
  }
}

$('.url-section').on('click', 'li', (e) => {
  console.log('id',e.target.id)
  console.log('clicked', clicked)
  updateClicks()
})

const updateClicks = () => {
  console.log('clicked me')
    fetch(`/api/folders/${currentFolder}/urls`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        folderId: currentFolder,
      })
    })
    .then(response => response.json())
    .then(response => console.log('patch request', response))
}

const clearUrls = () => {
  $('.url-list').empty();
}

const loadUrls = () => {
  if(currentFolder){
    fetch(`/api/folders/${currentFolder}/urls`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayUrls(response))
  }
}

$('.pop-up').on('click', () => {
  console.log('pop-up');
})

$('.pop-down').on('click', () => {
  console.log('pop-down');
})

$('.date-up').on('click', () => {
  console.log('date-up');
})

$('.date-up').on('click', () => {
  console.log('date-up');
})
