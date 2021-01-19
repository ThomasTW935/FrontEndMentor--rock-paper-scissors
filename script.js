let modalToggle = document.querySelectorAll('.rules__Toggle')
modalToggle.forEach(toggle => {
  toggle.style.display = 'none'
})
function DisplayModal() {
  modalToggle.forEach(toggle => {
    toggle.style.display = (toggle.style.display == 'none') ? 'grid' : 'none'
  })
}
function GenerateRandomNumber(min, max) {
  let random = Math.floor((Math.random() * ((max - min) + 1)) + min)
  return random
}

let pickOptions = document.querySelectorAll('.pick__Options')
pickOptions.forEach(option => {
  option.addEventListener('click', Play)
})
async function Play() {
  let target = event.target
  let maxNum = pickOptions.length - 1
  let housePick = GenerateRandomNumber(0, maxNum);
  let yourPick = Array.from(pickOptions).indexOf(target)
  console.log(`Pick: ${yourPick} House: ${housePick}`)
  let result = (yourPick == housePick) ? 'Draw' :
    (yourPick == 0 && housePick == maxNum) ? 'Win' :
      (yourPick < housePick || yourPick == maxNum && housePick == 0) ? 'Lose' : 'Win';
  console.log(`Result: ${result}`)

  let targetClone = target.cloneNode(true)
  let houseClone = pickOptions[housePick].cloneNode(true)
  console.log(targetClone)
  console.log(houseClone)

  let choicesDiv = document.querySelector('.pick__Choice')
  choicesDiv.style.display = 'none'

  let resultDiv = document.querySelector('.pick__Result')
  resultDiv.style.display = 'grid'

  resultDiv.append(targetClone)
  await timer(500)
  resultDiv.append(houseClone)

}

function timer(ms) {
  return new Promise(res => setTimeout(res, ms))
}