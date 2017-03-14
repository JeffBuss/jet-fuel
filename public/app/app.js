require ('../styles.scss');

const urlBtn = $('.url-btn')

urlBtn.on('click', () => {
  event.preventDefault()
  console.log('click')
  // $.post('/test')
})
