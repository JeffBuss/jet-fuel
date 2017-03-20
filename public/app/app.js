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

const displayFolders = (folders) => {
  clearFolders()
  console.log('folders', folders)
  folders.map((el) => {
    $('.url-folder').append(
      `<li class='${el.folderName} btn folder-list' id='${el.id}'>${el.folderName}</li>`
    )
  })
}

const clearFolders = () => {
  $('.url-folder').empty();
}

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
  let input = cleanUrls($('.url-input').val())
  pushURL(input)
  loadUrls()
})

const cleanUrls = (url) => {
  if(url.slice(0,7) === "http://" || url.slice(0,8) === "https://"){
    return url;
  } else {
    return "http://" + url;
  }
};

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
      console.log('el?', el)
      $('.url-list').append(
        `<li class='${el.urlName}' id='${el.id}'><a target='_blank' href=${el.urlName}>${el.id}</a> visits: ${el.clicks} <p>${el.date}</p></li>`
      )
    })
  }
}

const clearUrls = () => {
  $('.url-list').empty();
}

$('.url-section').on('click', 'li', (e) => {
  console.log('id',e.target.id)
  updateClicks(e)
})

const updateClicks = (e) => {
  console.log(e.target.id)
    fetch(`/api/folders/${currentFolder}/urls`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        urlId: e.target.id,
      })
    })
    .then(response => response.json())
    .then(response => displayUrls(response))
}

const loadUrls = (cf, filter) => {
  if(currentFolder){
    fetch(`/api/folders/${currentFolder}/urls`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then((response) => {
    if (filter === 'up') {
      response = filterPop(response, filter)
    } else if (filter === 'down') {
      response = filterPop(response, filter)
    } else if (filter === 'dUp') {
      response = filterDate(response, filter)
    } else if (filter === 'dDown'){
      response = filterDate(response, filter)
    } else {
      displayUrls(response)
    }
    displayUrls(response)
  })
  }
}

const filterPop = (urls, filter) => {
  let sortedUrls = urls.sort((a,b) => {
    if(filter === 'up') {
      return b.clicks - a.clicks;
    } else {
      return a.clicks - b.clicks;
    }
  })
  return sortedUrls;
}

const filterDate = (urls, filter) => {
  let sortedUrls = urls.sort((a,b) => {
    if(filter == 'dUp') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })
  return sortedUrls;
}

$('.pop-up').on('click', () => {
  event.preventDefault()
  loadUrls(currentFolder, 'up');
})

$('.pop-down').on('click', () => {
  event.preventDefault()
  loadUrls(currentFolder, 'down');
})


$('.date-up').on('click', () => {
  event.preventDefault()
  loadUrls(currentFolder, 'dUp')
})

$('.date-down').on('click', () => {
  event.preventDefault()
  loadUrls(currentFolder, 'dDown')
})
