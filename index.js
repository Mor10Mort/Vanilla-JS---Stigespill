'use strict';

const boardMechanics = {
  tiles: 100,
  greenTile: '#43F785',
  orangeTile: 'rgb(255 105 0)',
  redTile:'#FA0801',
  emojiCharacters:['\uD83D\uDC7B','\uD83D\uDC7D','\uD83D\uDCA9','\uD83E\uDD21','\uD83D\uDC12'],
  playerSteps: 1,
  cleanTiles: [],
  allPlayers: [],
  allLadders: [],
  theGreenTilesTop: [],
  theGreenTilesBottom: [],
  theRedTilesTop: [],
  theGreenTilesPosX: [],
  theBoardDiv: document.getElementById('theBoard'),
  theTile: document.getElementById('squareNumber' + this.playerSteps),
  colors: ["#FADED5", "#DEBFBD", "#F5DDE2", "#DEBDD4", "#F6D5FA"],
  randomColor: function () {
    //decorates the tiles
    return Math.floor(Math.random() * this.colors.length)
  },
  randoNumber: function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  },
  createTheBoard: function () {
    //Creates the tiles
    for (let i = this.tiles; i >= 0 + 1; i--) {
      let frameDiv = document.createElement('div');
      frameDiv.id = "squareNumber" + i;
      frameDiv.innerHTML = i;
      frameDiv.style.backgroundColor = this.colors[this.randomColor()];
      this.theBoardDiv.append(frameDiv);
    }

    ////This makes the ladders "connect" to the tiles. Borrowed and adjusted from https://thewebdev.info/2021/09/12/how-to-draw-a-line-between-two-divs-with-javascript/
    const getOffset = (el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight,
        xCenter: (rect.left + window.pageXOffset + rect.right) / 2,
        yCenter: (rect.top + window.pageYOffset + rect.bottom) / 2
      };
    }

    const connect = (div1, div2, theClass, thickness) => {
      const off1 = getOffset(div1);
      const off2 = getOffset(div2);

      const x1 = off1.xCenter;
      const y1 = off1.top + off1.height / 2;
      const x2 = off2.xCenter;
      boardMechanics.theGreenTilesPosX.push(x2);
      const y2 = off2.yCenter;

      const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

      const cx = ((x1 + x2) / 2) - (length / 2);
      const cy = ((y1 + y2) / 2) - (thickness / 2);
      const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

      const htmlLine = "<div id='ladderUp' class='ladder " + theClass + "' style='padding:0px; margin:0px; height:" + thickness + "px; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";

      document.body.innerHTML += htmlLine;
    }

    function makeTilesGreenOrRed(element1, element2, theColor) {
      //dynamically creates the ladders.
      let getTheDigitsElement1 = parseInt(element1.slice(-2));
      let getTheDigitsElement2 = parseInt(element2.slice(-2));
      //lage key/value pair for stigene
      if (theColor == "green"){
        if (boardMechanics.allLadders[getTheDigitsElement2] === undefined) {
          boardMechanics.allLadders[getTheDigitsElement2] = [];
      } 
        
        Object.assign(boardMechanics.allLadders[getTheDigitsElement2], {topVerdi: getTheDigitsElement1, bottomVerdi: getTheDigitsElement2});
      } else if (theColor == "red"){
        if (boardMechanics.allLadders[getTheDigitsElement1] === undefined) {
          boardMechanics.allLadders[getTheDigitsElement1] = [];
        }
        Object.assign(boardMechanics.allLadders[getTheDigitsElement1], {topVerdi: getTheDigitsElement1, bottomVerdi: getTheDigitsElement2});
      }
      let d1 = document.getElementById(element1);
      let d2 = document.getElementById(element2);

      if (theColor == 'green') {
        connect(d1, d2, 'up', 5);
        d1.style.backgroundColor = boardMechanics.greenTile;
        d2.style.backgroundColor = boardMechanics.greenTile;
        boardMechanics.theGreenTilesBottom.push(parseInt(element2.slice(-2)));
        boardMechanics.theGreenTilesTop.push(parseInt(element1.slice(-2)));
        document.getElementById(element2).style.backgroundColor = boardMechanics.greenTile;
        
      } else if (theColor == 'red') {
        connect(d1, d2, 'down', 5);
        d1.style.backgroundColor = boardMechanics.redTile;
        d2.style.backgroundColor = boardMechanics.redTile;
        boardMechanics.theRedTilesTop.push(parseInt(element1.slice(-2)));
        document.getElementById(element1).style.backgroundColor = boardMechanics.redTile;
      }
    }
    //adds new ladders here. Bug: not possible to add ladder from 1-9 due to "numbering" issue.
    makeTilesGreenOrRed('squareNumber59', 'squareNumber39', 'green');
    makeTilesGreenOrRed('squareNumber91', 'squareNumber31', 'green');
    makeTilesGreenOrRed('squareNumber62', 'squareNumber35', 'green');
    makeTilesGreenOrRed('squareNumber96', 'squareNumber13', 'green');
    makeTilesGreenOrRed('squareNumber78', 'squareNumber17', 'green');
    makeTilesGreenOrRed('squareNumber97', 'squareNumber66', 'green');
    makeTilesGreenOrRed('squareNumber57', 'squareNumber26', 'red');
    makeTilesGreenOrRed('squareNumber74', 'squareNumber12', 'red');
    makeTilesGreenOrRed('squareNumber38', 'squareNumber19', 'red');
    makeTilesGreenOrRed('squareNumber99', 'squareNumber30', 'red');
    makeTilesGreenOrRed('squareNumber92', 'squareNumber73', 'red');
  },
  countNextPlayer: 0,
  stepThroughEachPlayer: function () {
    if (this.firstPlayerUp == false) {
        this.firstPlayerUp = true;
        return this.countNextPlayer = 0;
    }

    let thePlayerCounter = boardMechanics.countNextPlayer == myPlayass.length - 1;
    if (thePlayerCounter) {
        this.countNextPlayer = 0;
    } else {
        this.countNextPlayer++;
    }
    let nameOfPlayerToRollDize = document.querySelector('#theScore h3');
    let nameOfFirstPlayer = this.returnTheActivePlayer().nameOfPlayer;
    nameOfPlayerToRollDize.innerHTML= 'Kast terning: '+nameOfFirstPlayer;
    let nameOfPlayerEmoji = document.querySelector('#theScore span');
    nameOfPlayerEmoji.innerHTML = boardMechanics.emojiCharacters[this.countNextPlayer];
    return this.countNextPlayer;
  },
returnTheActivePlayer: function(){
  return myPlayass[this.countNextPlayer];
},
returnTheActivePlayerSteps: function(){
  return myPlayass[this.countNextPlayer].playerSteps;
},
currentClass:'',
theValueOfTheDize:1,
  rollTheDize: function (event) {
    //rolls the dize, adds dizevalue to the player, triggers "playerMechanics"
    document.getElementById("theButton").disabled = true;

    let cube = document.querySelector('.cube');
    let rollBtn = document.querySelector('.rollBtn');
     let randNum = boardMechanics.randoNumber(1, 6);
  
     let showClass = 'show-' + randNum;
     if (this.currentClass) {
       cube.classList.remove( this.currentClass );
     }
     cube.classList.add( showClass );
     this.currentClass = showClass;
   console.log(this.returnTheActivePlayer());
   if (Object.keys(this.returnTheActivePlayer().playerHistorySteps).length === 0){
    this.returnTheActivePlayer().playerHistorySteps.push(1);
   }

    let rolleTheRandomDize = boardMechanics.randoNumber(1, 6);
    let lastNumberInHistory = this.returnTheActivePlayer().playerHistorySteps[boardMechanics.returnTheActivePlayer().playerHistorySteps.length - 1];
    let summarizeWithLastNumber = lastNumberInHistory + randNum;
    this.returnTheActivePlayer().playerHistorySteps.push(summarizeWithLastNumber);
    
    function limitNumberWithinRange(num, min, max){
      const MIN = min || 1;
      const MAX = max || 100;
      const parsed = parseInt(num)
      return Math.min(Math.max(parsed, MIN), MAX)
    }
    console.log(this.returnTheActivePlayer().nameOfPlayer);
    console.log(this.returnTheActivePlayer().playerSteps);
    let plussTheNumbas = this.returnTheActivePlayer().playerSteps + randNum;
    let maxCap100 = limitNumberWithinRange(plussTheNumbas);
    console.log("player to move steps: " + maxCap100);
    
     this.returnTheActivePlayer().playerSteps = maxCap100;
    setTimeout(function(){
      boardMechanics.playerMechanics();     
  }, 1000);
  
  },
  checkLadder: function(){
    //checks if player hit a green og red ladder. Improvements is removing repetitive code. 
      let theActiveNumber = this.returnTheActivePlayer().playerSteps;
     
    if ((boardMechanics.theGreenTilesBottom.includes(theActiveNumber))) {
      let theLadderObject = boardMechanics.allLadders[this.returnTheActivePlayer().playerSteps].topVerdi;
      let theTileToJumpTo = document.getElementById('squareNumber'+theLadderObject).getBoundingClientRect();
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.top = theTileToJumpTo.top +"px";
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.left= theTileToJumpTo.left +"px";
      this.cleanTiles.push(theLadderObject);
      this.returnTheActivePlayer().playerHistorySteps.push(theLadderObject);
      this.returnTheActivePlayer().playerSteps += theLadderObject;
      let lastNumberInHistory = this.returnTheActivePlayer().playerHistorySteps[boardMechanics.returnTheActivePlayer().playerHistorySteps.length - 2];
      document.getElementById('squareNumber' + lastNumberInHistory).style.backgroundColor = boardMechanics.greenTile;

      let addTheUpSteps = theLadderObject - this.returnTheActivePlayer().playerSteps;
      this.returnTheActivePlayer().playerSteps += addTheUpSteps;
    } else if ((boardMechanics.theRedTilesTop.includes(theActiveNumber))) {
      console.log("Hit a red ladder");
      let theLadderObject = boardMechanics.allLadders[this.returnTheActivePlayer().playerSteps].bottomVerdi;
      let theTileToJumpTo = document.getElementById('squareNumber'+theLadderObject).getBoundingClientRect();
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.top = theTileToJumpTo.top +"px";
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.left= theTileToJumpTo.left +"px";
      console.log(theLadderObject);
      this.returnTheActivePlayer().playerHistorySteps.push(theLadderObject);
      this.returnTheActivePlayer().playerSteps += theLadderObject;
      let lastNumberInHistory = this.returnTheActivePlayer().playerHistorySteps[boardMechanics.returnTheActivePlayer().playerHistorySteps.length - 2];
      console.log(lastNumberInHistory);
      document.getElementById('squareNumber' + lastNumberInHistory).style.backgroundColor = boardMechanics.redTile;

      let addTheUpSteps = theLadderObject - this.returnTheActivePlayer().playerSteps;
      this.returnTheActivePlayer().playerSteps += addTheUpSteps;
    }
  },
  playerMechanics: function () {  
    //this function makes the player move on the board. Has room for improvement given that there is bugs where player "falls off" the board if window is rezied upon moving.
    let theRepeater; //we will use this variable to clear the setInterval()
    function stopAnimate() {
      clearInterval(theRepeater);
    } //end of stopAnimate()

    animateScript();

    function animateScript() {
      
      let catchTheTileWeBEENAt = 'squareNumber' + boardMechanics.returnTheActivePlayer().playerHistorySteps[boardMechanics.returnTheActivePlayer().playerHistorySteps.length - 2];
      let theActiveTileOfThePlayer = document.getElementById(catchTheTileWeBEENAt).getBoundingClientRect();
      
      const interval = 0;

      let moveDudeLeft = theActiveTileOfThePlayer.left;
      let moveDudeTop = theActiveTileOfThePlayer.top;
      let moveDudeRight = theActiveTileOfThePlayer.right;
      let moveDudeBottom = theActiveTileOfThePlayer.bottom;

      theRepeater = setInterval(() => {
        var styles = {
          "backgroundPosition": `${theActiveTileOfThePlayer.top}px ${theActiveTileOfThePlayer.right} px`,
          "-webkit-transform": "scaleX(-1)",
          "transform": "scaleX(-1)",
          "left": `${moveDudeLeft}px`,
          "top": `${moveDudeTop}px`,
          "right": `${moveDudeRight}px`,
          "bottom": `${moveDudeBottom}px`
        };
        var obj = document.getElementById(boardMechanics.returnTheActivePlayer().nameOfPlayer);
        Object.assign(obj.style, styles);
        let catchTheTileGOINGTo = 'squareNumber' + boardMechanics.returnTheActivePlayer().playerSteps;
        let theActiveTile = document.getElementById(catchTheTileGOINGTo).getBoundingClientRect();
        let speedHorizontal = 2;
        let speedDiagonal = .5;

        if ((moveDudeLeft > theActiveTile.left) && !(moveDudeRight < theActiveTile.right)) {
          moveDudeLeft -= speedHorizontal;
        } else if (moveDudeTop > theActiveTile.top) {
          moveDudeLeft += speedHorizontal;
          moveDudeTop -= speedDiagonal;
        } else if ((moveDudeLeft < theActiveTile.left) && !(moveDudeRight > theActiveTile.right)) {
          moveDudeLeft += speedHorizontal;
        }
        else if ((moveDudeLeft = theActiveTile.left)) {
          document.getElementById("theButton").disabled = false;
          stopAnimate();
          boardMechanics.checkLadder();
          boardMechanics.checkIfSomeOneWon();
          boardMechanics.stepThroughEachPlayer();
        } else {
          document.getElementById("theButton").disabled = false;
          stopAnimate();
          boardMechanics.checkIfSomeOneWon();
         boardMechanics.stepThroughEachPlayer();   
        }
      }, interval); //end of setInterval
    } //end of animateScript()
  },
  checkIfSomeOneWon: function(){
    let hasSomeBodyWon = boardMechanics.returnTheActivePlayer().playerSteps > 99;
    if(hasSomeBodyWon){
      document.getElementById("theButton").disabled = true;
        let gameCompleteInfo = document.querySelector('#gameComplete h2');
        let celebrateIcon = '\uD83D\uDE4C';
        let partyIcon  = '\uD83E\uDD73';
        gameCompleteInfo.innerHTML = 'Og vinneren er....' + boardMechanics.returnTheActivePlayer().nameOfPlayer + boardMechanics.emojiCharacters[boardMechanics.countNextPlayer] + partyIcon + celebrateIcon;
    }
  }
};

boardMechanics.createTheBoard();

const createThePlayer = function (nameOfPlayer) {
  this.nameOfPlayer = nameOfPlayer;
  this.playerSteps = 1;
  this.playerHistorySteps = [];
  this.addPlayer = function () {
    let playerDiv = document.createElement('div');
    boardMechanics.allPlayers.push(nameOfPlayer);
    playerDiv.id = this.nameOfPlayer;
    playerDiv.className = "theHeroImage";
    for (let i = 0; i < boardMechanics.allPlayers.length; i++) {
      playerDiv.innerHTML = boardMechanics.emojiCharacters[i];
    }
    let theActiveTile = document.getElementById('squareNumber1');
    theActiveTile.append(playerDiv);
  };
};

//collects the amount of players selected from HTML and "sets up" the player
function startTheGame(amount){
  button.disabled = false;
  let playersAmount= amount;

  for (let i = 1; i < amount+1; i++) {
    let playerNumber = 'Spiller '+i;
    const addNewPlaya  = new createThePlayer(playerNumber);
    myPlayass.push(addNewPlaya);
    addNewPlaya.addPlayer();
  }

  //hides the innitial player selector. Displays whos turn it is.
  document.querySelector("#gameInfo").style.display = "none";
  let nameOfPlayerToRollDize = document.querySelector('#theScore h3');
  let nameOfFirstPlayer = myPlayass[0].nameOfPlayer;
  nameOfPlayerToRollDize.innerHTML= 'Kast terning: '+nameOfFirstPlayer;
  let nameOfPlayerEmoji = document.querySelector('#theScore span');
    nameOfPlayerEmoji.innerHTML = boardMechanics.emojiCharacters[boardMechanics.countNextPlayer];

  button.addEventListener('click', event => {
    boardMechanics.rollTheDize();
  });
  //make ENTER possible to use
  document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      boardMechanics.rollTheDize();
    }
  });
}

//Where I place all players
const myPlayass = [];

//Borrowed the dize from here https://icodemag.com/3d-rolling-dice-css-javascript/ Also, make sure possible to use ENTER to roll dize
const button = document.querySelector('.scene button');
button.disabled = true;

