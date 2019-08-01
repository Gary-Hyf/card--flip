// css class for different card image
const CARD_TECHS = [
  'html5',
  'css3',
  'js',
  'sass',
  'nodejs',
  'react',
  'linkedin',
  'heroku',
  'github',
  'aws'
];

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  timerDisplay: null,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  startButton: null,
  // and much more
  preSelected: null,
  checkMatching: false,
  gameOver: true,
  totalCards: 0,
  clearedCards: 0,
  gameBoard: null,
  // and much more
  barWidth: 100,
  levelOneSet: [],
  levelTwoSet: [],
  levelThreeSet: [],
  lastCard: null,
  currentCard: null
};

setGame();

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  var levelDisplay=document.getElementsByClassName('game-stats__level--value');
  levelDisplay[0].innerHTML="1";
  var ScoreDisplay=document.getElementsByClassName('game-stats__score--value');
  ScoreDisplay[0].innerHTML="0";
  var timerInterval=document.getElementsByClassName('game-timer__bar');
  timerInterval[0].innerHTML="60";
  game.timerDisplay = document.querySelector('.game-timer__bar');
  bindStartButton();


}

function startGame() {
  var levelDisplay=document.getElementsByClassName('game-stats__level--value');
  levelDisplay[0].innerHTML="1";
  var ScoreDisplay=document.getElementsByClassName('game-stats__score--value');
  ScoreDisplay[0].innerHTML="0";
  var timerInterval=document.getElementsByClassName('game-timer__bar');
  timerInterval[0].innerHTML="60";
  var game_board=document.getElementsByClassName('game-board')
  game.timerDisplay = document.querySelector('.game-timer__bar');
  clearGameBoard();
  creatCards(1);
 updateTimerDisplay();
  
}
function clearGameBoard() {
  document.querySelector('.game-board').innerHTML = '';
}
function creatCards(level){
  
  set=["html5", "html5", "css3", "css3", "js", "js", "sass", "sass", "nodejs", "nodejs", "react", "react", "linkedin", "linkedin", "heroku", "heroku", "github", "github", "aws", "aws","html5", "html5", "css3", "css3", "js", "js", "sass", "sass", "nodejs", "nodejs", "react", "react"];
  var row =level*2;
  var total_cards=row *row;
  var board=document.getElementsByClassName("game-board");
  board[0].setAttribute("style","display:grid; grid-template-columns:auto auto");
  for (var i = 0; i < total_cards; i++) {
    var div_card=document.createElement("div");
    div_card.className='card '+set[i];
    div_card.setAttribute("data-tech",set[i]);
    board[0].appendChild(div_card);
    var card_front=document.createElement("div");
    var card_back=document.createElement("div");
    card_front.className='card__face card__face--front';
    card_back.className='card__face card__face--back';
    var card=document.getElementsByClassName("card");
    board[0].children[i].appendChild(card_front);
    board[0].children[i].appendChild(card_back);
  
    // cd[0].appendChild(card_front);
    // rd[0].appendChild(card_back);
    bindCardClick()
  }

}
function handleCardFlip() {}


function nextLevel() {

}

function handleGameOver() {
var StartButton=document.querySelector('.game-stats__button')
alert('your score is')
StartButton.innerHTML="New Game";
}

/*******************************************
/     UI update
/******************************************/
function updateScore() {

}
function updateTimerDisplay() {
  game.timer=60;
    setInterval(()=>{
    game.timer--;
    document.getElementsByClassName('game-timer__bar')[0].innerHTML=""+game.timer+"s";
    if(game.timer === 0){  
      handleGameOver();
    }
  },1000);
  
}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {
  var StartButton=document.querySelector('.game-stats__button')
  StartButton.addEventListener("click", function(event){
    console.log(event);
    var target=event.target;
    var Button=target.innerHTML;
    if (Button == "New Game"){
      target.innerHTML="End Game";
      startGame();
    }
    if (Button == "End Game"){
      handleGameOver()
    }
    else (Button == "Start Game");{
      startGame();
    }

  })
}



function handleCardClick(){
if(game.checkMatching){
  return;
}
  this.classList.add('card--flipped');
  const currentSelected = this;
if(game.preSelected === currentSelected){
  currentSelected.classList.remove('card--flipped');
  game.preSelected=null;
  return;
}
if(game.preSelected){
  if(game.preSelected.dataset.tech===currentSelected.dataset.tech){  
  unBindCardClick(game.preSelected);
  unBindCardClick(currentSelected);
  game.preSelected=null;
  return;
}
game.checkMatching=true;
setTimeout(()=>  {
currentSelected.classList.remove('card--flipped');
game.preSelected.classList.remove('card--flipped');
game.preSelected=null;
game.checkMatching=false;
},1000);
return;
}

  game.preSelected=currentSelected;
}
function unBindCardClick(card) {
  card.removeEventListener('click',handleCardClick);
}

function bindCardClick() {
  const cards= document.querySelectorAll('.card');
  cards.forEach(function(card){
    card.addEventListener('click', handleCardClick)
  })
  }