require ('../styles.scss');

const urlBtn = $('.url-btn')
const folderBtn = $('.folder-btn')

const pushURL = (input) => {
  console.log(input)
}

urlBtn.on('click', () => {
  event.preventDefault()
  let input = $('.url-input').val()
  $('.url-list').append(
    `<p>${input}<p>`
  )
  pushURL(input)
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
  .then(response => console.log(response))
}

folderBtn.on('click', () => {
  event.preventDefault()
  let input = $('.folder-input').val()
  $('.url-folder').append(
    `<li class='${input}'>${input}</li>`
  )
  saveFolder(input)
})
