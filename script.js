let modalToggle = document.querySelectorAll('.rules__Toggle')
modalToggle.forEach(toggle => {
  toggle.style.display = 'none'
})
function DisplayModal() {
  modalToggle.forEach(toggle => {
    toggle.style.display = (toggle.style.display == 'none') ? 'grid' : 'none'
  })

}