let randomNumber=Math.floor((Math.random()*100)+1)
const submit=document.querySelector('#subt')
const userInput=document.querySelector('#guessField')
const guessLot=document.querySelector('.guesses')
const remaining=document.querySelector('.lastResult')
const lowOrHi=document.querySelector('.lowOrHi')
const startOver=document.querySelector('.resultParas')

const p=document.createElement('p');

// Array in which the value enetered by user is stored and shown as previous guesses

let prevGuess=[]
let numGuess=1

let playGame=true

if(playGame){
  submit.addEventListener('click',function(e){
    e.preventDefault()
    const guess=parseInt(userInput.value)
    console.log(guess)
    validateGuess(guess)
  });
}

function validateGuess(guess){
  //is valid guess entered or not
  if(isNaN(guess)){
    alert('Please enter a valid number')
  }else if(guess<1){
    alert('Please enter a number more than 1')
  }else if(guess>100){
    alert('Please enter a number less than 100')
  }else{
    prevGuess.push(guess)
    if(numGuess===11){
      displayGuess(guess)
      displayMessage(`Game Over. Random number was ${randomNumber}`)
      endGame()
    }
    else{
      displayGuess(guess)
      checkGuess(guess)
    }
  }
}

function checkGuess(guess){
  //prev function only validated the guess value
  //In this function, the value is checked if it is equal to the random no generated so then the msg gets printed using displayGuess game that the game is won.
  if(guess===randomNumber){
    displayMessage(`You guessed it right`)
    endGame()
  }
  else if(guess<randomNumber){
    displayMessage(`Number is TOOO low`)
  }
  else if(guess>randomNumber){
    displayMessage(`Number is TOOO high`)
  }
}

function displayGuess(guess){
  //clean the current value so as to enter the next one
  // This function directly interacts with DOM like emptying the input value in order to input new values, update values in 'previous guesses' section and decreases the number og guess remeining
  userInput.value=''
  guessLot.innerHTML+=`${guess},`
  numGuess++
  remaining.innerHTML=`${11-numGuess}`

}

function displayMessage(message){
  //In this,an error msg gets printed if the input value is low or high
  lowOrHi.innerHTML=`<h2>${message}</h2>`


}

function endGame(){
  userInput.value=''
  userInput.setAttribute('disabled','')
  //start button
  p.classList.add('button')
  p.innerHTML=`<h2 id='newGame'>Start new Game</h2>`
  startOver.appendChild(p);
  playGame=false
  newGame();
}
function newGame(){
  const newGameButton=document.querySelector('#newGame')
  newGameButton.addEventListener('click',function(e){
    randomNumber=Math.floor((Math.random()*100)+1)
    prevGuess=[]
    numGuess=1
    guessLot.innerHTML=''
    remaining.innerHTML=`${11-numGuess}`
    userInput.removeAttribute('disabled')
    startOver.removeChild(p)
    
    playGame=true
  })
}