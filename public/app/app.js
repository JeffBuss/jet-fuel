require('../reset.css');
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
      fetch('http://localhost:3000/api/folders/' + currentFolder, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(response => displayUrls(response.filteredUrls))
    }
})

urlBtn.on('click', () => {
  event.preventDefault()
  let input = $('.url-input').val()
  pushURL(input)
  loadUrls()
})


const displayFolders = (arr) => {
  arr.folders.map((el) => {
    $('.url-folder').append(
      `<li class='${el.folderName} btn folder-list' id='${el.id}'>${el.folderName}</li>`
    )
  })
}

const pushURL = (input) => {
  fetch('http://localhost:3000/api/folders/' + currentFolder, {
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
  .then(response => {
    console.log('push', response)
    displayUrls([response])
  })
}

const displayUrls = (arr) => {
  console.log('arr', arr);
  clearUrls()
  if(arr) {
    arr.map((el) => {
      console.log('el?', el)
      $('.url-list').append(
        `<li class='${el.urlName}' id='${el.id}'><a target='_blank' href=${el.urlName}>${el.urlName}</a></li>`
      )
    })
  }
}

const clearUrls = () => {
  $('.url-list').empty();
}

const loadUrls = () => {
  if(currentFolder){
    fetch('http://localhost:3000/api/folders/' + currentFolder, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayUrls(response.filteredUrls))
  }
}
loadUrls()

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
