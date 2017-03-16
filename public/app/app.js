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
  // .then(response => console.log('push folder', response))
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
  currentFolder = e.target.id
    if(currentFolder) {
      fetch(`http://localhost:3000/api/folders/${currentFolder}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        // body: JSON.stringify({
        //   id: id,
        //   urlName: urlName,
        // }),
      })
      .then(response => response.json())
      .then(response => console.log(response))
    }
})

urlBtn.on('click', () => {
  event.preventDefault()
  let input = $('.url-input').val()
  // $('.url-list').append(
  //   `<p className='$currentFolder'>${input}<p>`
  // )
  pushURL(input)
  clearUrls()
  loadUrls()
})

loadFolders()

const displayFolders = (arr) => {
  arr.folders.map((el) => {
    $('.url-folder').append(
      `<li class='${el.folderName}' id='${el.id}'>${el.folderName}</li>`
    )
  })
}

const pushURL = (input, folderId) => {
  fetch(`http://localhost:3000/api/folders/${currentFolder}`, {
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
  .then(response => displayUrls(response.filteredUrls))
}

const displayUrls = (arr) => {
  console.log('arr', arr);
  if(arr) {
    arr.folders.map((el) => {
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
  fetch('http://localhost:3000/api/folders', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayUrls(response))
}

// loadUrls()
