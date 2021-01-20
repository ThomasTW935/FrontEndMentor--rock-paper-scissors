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

  let result = (yourPick == housePick) ? 0 :
    (yourPick == 0 && housePick == maxNum) ? 1 :
      (yourPick < housePick || yourPick == maxNum && housePick == 0) ? -1 : 1;

  let targetClone = target.cloneNode(true)
  let houseClone = pickOptions[housePick].cloneNode(true)

  let choicesDiv = document.querySelector('.pick__Choice')
  choicesDiv.style.display = 'none'

  let finalDiv = document.querySelector('.pick__Final')
  finalDiv.style.display = 'grid'


  // targetClone.classList.add('pick__YouPicked')
  // houseClone.classList.add('pick__HousePicked')
  // finalDiv.append(targetClone)
  // finalDiv.append(houseClone)

  let youDiv = document.querySelector('.pick__YouPicked')
  let houseDiv = document.querySelector('.pick__HousePicked')
  let resultDiv = document.querySelector('.pick__Result')
  resultDiv.childNodes[1].innerHTML = (result == 0) ? 'Draw' : (result == 1) ? 'You Win' : 'You Lose'

  youDiv.style.opacity = '0'
  houseDiv.style.opacity = '0'
  resultDiv.style.opacity = '0'

  await timer(50)
  youDiv.append(targetClone)
  youDiv.style.opacity = '1'
  houseDiv.append(houseClone)
  await timer(1000)
  houseDiv.style.opacity = '1'
  await timer(1000)
  resultDiv.style.opacity = '1'

  UpdateScore(result)
}
function ResetGame() {
  let choicesDiv = document.querySelector('.pick__Choice')
  let finalDiv = document.querySelector('.pick__Final')

  choicesDiv.style.display = 'grid'
  finalDiv.style.display = 'none'

  let youDiv = document.querySelector('.pick__YouPicked')
  let houseDiv = document.querySelector('.pick__HousePicked')
  youDiv.removeChild(youDiv.childNodes[3])
  houseDiv.removeChild(houseDiv.childNodes[3])
}
function UpdateScore(count) {
  let scoreSpan = document.querySelector('.head__Score span')
  let currentScore = parseInt(scoreSpan.innerHTML)
  scoreSpan.innerHTML = currentScore + count
}
function timer(ms) {
  return new Promise(res => setTimeout(res, ms))
}