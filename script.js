
let initialValue = sessionStorage.score ?? 0
sessionStorage.setItem('score', initialValue)
UpdateScore(parseInt(sessionStorage.score))


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
    (yourPick == maxNum && housePick == 0) ? 1 :
      (yourPick > housePick || yourPick == 0 && housePick == maxNum) ? -1 : 1;


  console.log(`Player: ${yourPick} House: ${housePick}`)
  // switch(yourPick){
  //   case 0: 
  // }
  // 0 beats 1 and 3
  // 1 beats 2 and 4
  // 2 beats 3 and 0
  // 3 beats 4 and 1
  // 4 beats 1 and 2

  let targetClone = target.cloneNode(true)
  let houseClone = pickOptions[housePick].cloneNode(true)

  let choicesDiv = document.querySelector('.pick__Choice')
  let finalDiv = document.querySelector('.pick__Final')

  choicesDiv.style.display = 'none'
  finalDiv.style.display = 'grid'

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

  sessionStorage.score = currentScore + count
  scoreSpan.innerHTML = sessionStorage.score
}
function timer(ms) {
  return new Promise(res => setTimeout(res, ms))
}