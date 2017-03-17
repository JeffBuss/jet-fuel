require('../reset.css');
require ('../styles.scss');

const urlBtn = $('.url-btn')
const folderBtn = $('.folder-btn')
const folderList = $('.folder-list')

let currentFolder = undefined

folderBtn.on('click', (event) => {
  event.preventDefault()
  let input = $('.folder-input').val()
  saveFolder(input)
  loadFolders()
})

const saveFolder = (input) => {
  fetch(`http://localhost:3000/api/folders`, {
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

$('.url-folder').on('click', 'li', (e) => {
  currentFolder = e.target.id
    if(currentFolder) {
      fetch(`http://localhost:3000/api/folders/${currentFolder}/urls`, {
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
  fetch(`http://localhost:3000/api/folders/${currentFolder}/urls`, {
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
      console.log('el?', el)
      $('.url-list').append(
        `<li class='${el.urlName}' id='${el.id}'><a target='_blank' href=${el.urlName}>${el.id}</a></li>`
      )
    })
  }
}

const clearUrls = () => {
  $('.url-list').empty();
}

const loadUrls = () => {
  if(currentFolder){
    fetch(`http://localhost:3000/api/folders/${currentFolder}/urls`, {
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
