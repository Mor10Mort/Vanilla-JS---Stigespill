'use strict';

const boardMechanics = {
  tiles: 100,
  playerSteps: 1,
  rememberTheSteps: [],
  allLadders: [],
  theGreenTilesTop: [],
  theGreenTilesBottom: [],
  theRedTilesTop: [],
  theGreenTilesPosX: [],
  theBoardDiv: document.getElementById('theBoard'),
  theTile: document.getElementById('squareNumber' + this.playerSteps),
  theActiveTileStored: [],
  theActiveTilePositions: function (theElement) {
    let rect = theElement.getBoundingClientRect();
    return {
      'left': rect.left,
      'top': rect.top,
      'bottom': rect.bottom,
      'right': rect.right,
      'center': rect.center
    };
  },
  cleanTheLastTile: function (amount) {
    let theLastTile = this.rememberTheSteps[this.rememberTheSteps.length - amount];
    document.getElementById('squareNumber' + theLastTile).style.backgroundColor = this.colors[this.randomColor()];
  },
  colors: ["#FADED5", "#DEBFBD", "#F5DDE2", "#DEBDD4", "#F6D5FA"],
  randomColor: function () {
    return Math.floor(Math.random() * this.colors.length)
  },
  randoNumber: function (min, max) {
    return 6;
    //return min + Math.floor(Math.random() * (max - min + 1));
  },
  createTheBoard: function () {
    for (let i = this.tiles; i >= 0 + 1; i--) {
      let frameDiv = document.createElement('div');
      frameDiv.id = "squareNumber" + i;
      frameDiv.innerHTML = i;
      frameDiv.style.backgroundColor = this.colors[this.randomColor()];
      this.theBoardDiv.append(frameDiv);
    }
    boardMechanics.activeTile();

    //LAGE SLANGER OG STIGENE
    //denne kopierte jeg fra https://thewebdev.info/2021/09/12/how-to-draw-a-line-between-two-divs-with-javascript/
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

    function makeTilesGreenOrRed(name, element1, element2, theColor) {
      
      let getTheDigitsElement1 = parseInt(element1.slice(-2));
      let getTheDigitsElement2 = parseInt(element2.slice(-2));
      //lage key/value pair for stigene
      if (boardMechanics.allLadders[getTheDigitsElement2] === undefined) {
        boardMechanics.allLadders[getTheDigitsElement2] = [];
    }
      Object.assign(boardMechanics.allLadders[getTheDigitsElement2], {topVerdi: getTheDigitsElement1, bottomVerdi: getTheDigitsElement2});

      const d1 = document.getElementById(element1);
      const d2 = document.getElementById(element2);

      if (theColor == 'green') {
        connect(d1, d2, 'up', 10);
        d1.style.backgroundColor = "#88F7B8";
        d2.style.backgroundColor = "#88F7B8";
        boardMechanics.theGreenTilesBottom.push(parseInt(element2.slice(-2)));

        

      } else if (theColor == 'red') {
        connect(d1, d2, 'down', 10);
        d1.style.backgroundColor = "#88F7B8";
        d2.style.backgroundColor = "#88F7B8";
        boardMechanics.theRedTilesTop.push(parseInt(element1.slice(-2)));
      }
    }

    makeTilesGreenOrRed('Stige 1', 'squareNumber96', 'squareNumber12', 'red');
    makeTilesGreenOrRed('Stige 2', 'squareNumber53', 'squareNumber31', 'green');
    makeTilesGreenOrRed('Stige 3','squareNumber46', 'squareNumber13', 'green');
    makeTilesGreenOrRed('Stige 4','squareNumber97', 'squareNumber56', 'green');
    makeTilesGreenOrRed('Stige 5','squareNumber36', 'squareNumber19', 'red');
    makeTilesGreenOrRed('Stige 6', 'squareNumber89', 'squareNumber57', 'red');
    makeTilesGreenOrRed('Stige 7', 'squareNumber92', 'squareNumber73', 'red');
    //SLUTT markere snakes and ladders
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
    return this.countNextPlayer;
  
  },
  playerCounter: function (playerNR) {
    //console.log(myPlayass[playerNR]);
    /*
    this.allPlayers.forEach(function (value, i) {
        document.getElementById(deckMechanics.allPlayers[i]).classList.remove("activePlayer");
    });
    let thePlayersTitle = document.getElementById(deckMechanics.allPlayers[playerNR]);
    thePlayersTitle.classList.add("activePlayer");
    let playersCardOnHands = document.getElementById(deckMechanics.allPlayers[playerNR]).getElementsByClassName("card");
    deckMechanics.whoGetsToClickTheCards();*/
},
returnTheActivePlayer: function(){
  return myPlayass[this.countNextPlayer];
},
returnTheActivePlayerSteps: function(){
  return myPlayass[this.countNextPlayer].playerSteps;
},
  rollTheDize: function (event) {
    console.log(Object.keys(this.returnTheActivePlayer().playerHistorySteps).length === 0);
   if (Object.keys(this.returnTheActivePlayer().playerHistorySteps).length === 0){
    this.returnTheActivePlayer().playerHistorySteps.push(1);
   }
   
    let rolleTheRandomDize = boardMechanics.randoNumber(1, 6);
    let lastNumberInHistory = this.returnTheActivePlayer().playerHistorySteps[boardMechanics.returnTheActivePlayer().playerHistorySteps.length - 1];
    let summarizeWithLastNumber = lastNumberInHistory + rolleTheRandomDize;
    this.returnTheActivePlayer().playerHistorySteps.push(summarizeWithLastNumber);
    this.returnTheActivePlayer().playerSteps += rolleTheRandomDize;
    console.log(this.returnTheActivePlayer().playerSteps);
    console.log(this.returnTheActivePlayer().nameOfPlayer + ' ' + this.returnTheActivePlayer().playerHistorySteps);
    console.log(lastNumberInHistory);
    boardMechanics.playerSteps += rolleTheRandomDize;
    boardMechanics.activeTile();
    this.playerMechanics();
  },
  
  activeTile: function () {
    if (this.playerSteps <= 100) {
      const theTile = document.getElementById('squareNumber' + this.playerSteps);
      theTile.style.backgroundColor = "#FF6B1A";
      this.rememberTheSteps.push(this.playerSteps);
      //SJekk her hvor pos til theTile er
      this.theActiveTilePositions(theTile);
      if (this.playerSteps > 1) {
        this.cleanTheLastTile(2);
      }
    } else if (this.playerSteps = 30) {
      console.log("you won!");
      this.cleanTheLastTile(1);

      //så tror du må løfte ut fjerne siste tile til funksjon
      document.getElementById('squareNumber100').style.backgroundColor = "#FF6B1A";
    }
  },
  checkLadder: function(){
      let theActiveNumber = this.returnTheActivePlayer().playerSteps;
      console.log(boardMechanics.theGreenTilesBottom, theActiveNumber);

    if ((boardMechanics.theGreenTilesBottom.includes(theActiveNumber))) {
      console.log("Hit a green ladder");
      console.log(this.returnTheActivePlayer().playerSteps);
      let theLadderObject = boardMechanics.allLadders[this.returnTheActivePlayer().playerSteps].topVerdi;
      let theTileToJumpTo = document.getElementById('squareNumber'+theLadderObject).getBoundingClientRect();
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.top = theTileToJumpTo.top +"px";
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.left= theTileToJumpTo.left +"px";
      console.log(theLadderObject);
      this.returnTheActivePlayer().playerHistorySteps.push(theLadderObject);
      this.returnTheActivePlayer().playerSteps += theLadderObject;
      let lastNumberInHistory = this.returnTheActivePlayer().playerHistorySteps[boardMechanics.returnTheActivePlayer().playerHistorySteps.length - 2];
      console.log(lastNumberInHistory);
      let addTheUpSteps = theLadderObject - this.returnTheActivePlayer().playerSteps;
      this.returnTheActivePlayer().playerSteps += addTheUpSteps;
    } else if ((boardMechanics.theRedTilesTop.includes(theActiveNumber))) {
      console.log("Hit a red ladder");
      let theLadderObject = boardMechanics.allLadders[boardMechanics.allPlayers[boardMechanics.countNextPlayer]].bottomVerdi;
      let theTileToJumpTo = document.getElementById('squareNumber'+theLadderObject).getBoundingClientRect();
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.top = theTileToJumpTo.top +"px";
      document.getElementById(this.returnTheActivePlayer().nameOfPlayer).style.left= theTileToJumpTo.left +"px";
      boardMechanics.rememberTheSteps.push(theLadderObject);
      let addTheUpSteps = theLadderObject - boardMechanics.allPlayers[boardMechanics.countNextPlayer];
      boardMechanics.allPlayers[boardMechanics.countNextPlayer] += addTheUpSteps;
    }
  },
  playerMechanics: function () {
    let theRepeater; //we will use this variable to clear the setInterval()

    function stopAnimate() {
      clearInterval(theRepeater);
    } //end of stopAnimate()

    animateScript();

    function animateScript() {
      
      let catchTheTileWeBEENAt = 'squareNumber' + boardMechanics.returnTheActivePlayer().playerHistorySteps[boardMechanics.returnTheActivePlayer().playerHistorySteps.length - 2];
      let theActiveTileOfThePlayer = document.getElementById(catchTheTileWeBEENAt).getBoundingClientRect();
      console.log('catchTheTileWeBEENAt: ' + catchTheTileWeBEENAt + 'playerssteps: '+ boardMechanics.returnTheActivePlayer().playerSteps);
      
      const interval = 0; //100 ms of interval for the setInterval()

      //coordinates for the dude moving around
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
        //console.log(boardMechanics.returnTheActivePlayer().nameOfPlayer);
        let catchTheTileGOINGTo = 'squareNumber' + boardMechanics.returnTheActivePlayer().playerSteps;
        let theActiveTile = document.getElementById(catchTheTileGOINGTo).getBoundingClientRect();
        //let theActiveTile = document.getElementById('squareNumber' + boardMechanics.rememberTheSteps[boardMechanics.rememberTheSteps.length - 1]).getBoundingClientRect();

        //console.log("catchTheTileGOINGTo: " + catchTheTileGOINGTo);

        let speedHorizontal = 2;
        let speedDiagonal = 5;

        if ((moveDudeLeft > theActiveTile.left) && !(moveDudeRight < theActiveTile.right)) {
          moveDudeLeft -= speedHorizontal;
        } else if (moveDudeTop > theActiveTile.top) {
          moveDudeLeft += speedHorizontal;
          moveDudeTop -= speedDiagonal;
        } else if ((moveDudeLeft < theActiveTile.left) && !(moveDudeRight > theActiveTile.right)) {
          moveDudeLeft += speedHorizontal;
        }
        else if ((moveDudeLeft = theActiveTile.left)) {
          stopAnimate();
          boardMechanics.checkLadder();
          boardMechanics.playerCounter(boardMechanics.stepThroughEachPlayer());

          if (boardMechanics.playerSteps >= 100) {
            alert("DU VANT!!");
            console.log("you won!");
            this.cleanTheLastTile(1);
            document.getElementById('squareNumber100').style.backgroundColor = "#FF6B1A";
          }
        } else {
          stopAnimate();
          console.log(" stop turd");
          boardMechanics.playerCounter(boardMechanics.stepThroughEachPlayer());

        }
      }, interval); //end of setInterval
    } //end of animateScript()
  }
};

boardMechanics.createTheBoard();

const createThePlayer = function (nameOfPlayer) {
  this.nameOfPlayer = nameOfPlayer;
  this.playerSteps = 1;
  this.playerHistorySteps = [];
  this.addPlayer = function () {
    let playerDiv = document.createElement('div');
    playerDiv.id = this.nameOfPlayer;
    playerDiv.className = "theHeroImage";
    let theActiveTile = document.getElementById('squareNumber1');
    theActiveTile.append(playerDiv);
    //playerDiv.theActiveTilePositions(theActiveTile);
  };
};


//Create the new players
const emory = new createThePlayer('emory');
const finley = new createThePlayer('finley');
emory.addPlayer();
finley.addPlayer();

const myPlayass = [emory, finley];

boardMechanics.playerCounter(boardMechanics.stepThroughEachPlayer());

const button = document.querySelector('button');
button.addEventListener('click', event => {
  boardMechanics.rollTheDize();
});
