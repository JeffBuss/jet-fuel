require ('../styles.scss');

const urlBtn = $('.url-btn')
const folderBtn = $('.folder-btn')

urlBtn.on('click', () => {
  event.preventDefault()
  let input = $('.url-input').val()
  $('.url-list').append(
    `<p>${input}<p>`
  )
})

const saveFolder = (input) => {
  console.log(input)
}

folderBtn.on('click', () => {
  event.preventDefault()
  let input = $('.folder-input').val()
  $('.url-folder').append(
    `<p>${input}<p>`
  )
  saveFolder(input)
})
