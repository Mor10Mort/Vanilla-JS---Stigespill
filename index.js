'use strict';

const boardMechanics = {
    tiles: 30,
    playerSteps: 1,
    rememberTheSteps: [],
    theBoardDiv: document.getElementById('theBoard'),
    theTile : document.getElementById('squareNumber'+this.playerSteps),
    theActiveTilePositions : function(theElement){
      let rect = theElement.getBoundingClientRect();
      return {
        'left':rect.left,
        'top': rect.top,
        'bottom': rect.bottom,
        'right': rect.right,
      };
    },
    cleanTheLastTile: function(amount){
        let theLastTile = this.rememberTheSteps[this.rememberTheSteps.length-amount];
        document.getElementById('squareNumber'+theLastTile).style.backgroundColor = this.colors[this.randomColor()];
    },
    colors: ["#024059", "#026873", "#04BF8A", "#025940","#03A64A"],
    randomColor: function(){
        return Math.floor(Math.random() * this.colors.length)
    },
    randoNumber: function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    },
    createTheBoard: function () {
        for (let i = this.tiles; i >= 0 +1; i--) {
            let frameDiv = document.createElement('div');
            frameDiv.id = "squareNumber"+i;
            frameDiv.innerHTML = i;
            frameDiv.style.backgroundColor = this.colors[this.randomColor()];
            this.theBoardDiv.append(frameDiv);
        }
        boardMechanics.activeTile();
        this.moveTheDude();
       
    },
    rollTheDize: function (event){
        boardMechanics.playerSteps += boardMechanics.randoNumber(1, 6);
      //  console.log(boardMechanics.playerSteps);
        boardMechanics.activeTile();      
        animateScript(this.theActiveTilePositions(document.getElementById('squareNumber'+this.playerSteps)));
    },
    moveTheDude: function(){
      let heroDiv = document.createElement('div');
      heroDiv.id = "theHeroImage";
      let theActiveTile = document.getElementById('squareNumber1');
      theActiveTile.append(heroDiv);
      this.theActiveTilePositions(theActiveTile);
    },
    activeTile: function (){
        if (this.playerSteps<=100){
            const theTile = document.getElementById('squareNumber'+this.playerSteps);
            theTile.style.backgroundColor = "#FF6B1A";    
            this.rememberTheSteps.push(this.playerSteps);
            //SJekk her hvor pos til theTile er
            this.theActiveTilePositions(theTile); 
            if (this.playerSteps>1){
                this.cleanTheLastTile(2); 
            } 
        } else {
            console.log("you won!");
            this.cleanTheLastTile(1); 

            //så tror du må løfte ut fjerne siste tile til funksjon
            document.getElementById('squareNumber100').style.backgroundColor = "#FF6B1A";
        }
    }
};

boardMechanics.createTheBoard();

const button = document.querySelector('button');
button.addEventListener('click', event => {
    boardMechanics.rollTheDize();
    
    //stopAnimate();
  });


  var tID; //we will use this variable to clear the setInterval()

  function stopAnimate() {
    clearInterval(tID);
  } //end of stopAnimate()
  
  
  function animateScript(positionOfFrame) {
   
  let theLastTile = document.getElementById('squareNumber'+boardMechanics.rememberTheSteps[boardMechanics.rememberTheSteps.length-2]).getBoundingClientRect();


    const interval = 0; //100 ms of interval for the setInterval()
   
    let moveDudeLeft = theLastTile.left;
    let moveDudeTop = theLastTile.top;
    let moveDudeRight = theLastTile.right;
    let moveDudeBottom = theLastTile.bottom;

    tID = setInterval(() => {
        var styles = {
          "backgroundPosition" : `${theLastTile.top}px ${theLastTile.right} px`,
            "-webkit-transform" : "scaleX(-1)",
            "transform" : "scaleX(-1)",
            "left" : `${moveDudeLeft}px`,
            "top":`${moveDudeTop}px`,
            "right":`${moveDudeRight}px`,
            "bottom":`${moveDudeBottom}px`
        };
        var obj = document.getElementById("theHeroImage");
        Object.assign(obj.style, styles);
   
        let theActiveTile = document.getElementById('squareNumber'+boardMechanics.rememberTheSteps[boardMechanics.rememberTheSteps.length-1]).getBoundingClientRect();
        console.log(theActiveTile.left);
        let speedHorizontal = 1;
        let speedDiagonal = 1;
        console.log("moveDudeLeft: " + moveDudeLeft,"moveDudeRight: " + moveDudeRight,"theActiveTile.left: " + theActiveTile.left,"theActiveTile.right: " + theActiveTile.right );

        if ((moveDudeLeft >= theActiveTile.left) && !(moveDudeLeft <= theActiveTile.left)){
          console.log("go left");
          moveDudeLeft -= speedHorizontal;
     
        } else if ((moveDudeRight <= theActiveTile.right) && !(moveDudeLeft >= theActiveTile.left)){
          console.log("go right");
          moveDudeLeft += speedHorizontal;
         
        } else if (moveDudeRight = theActiveTile.left){
          console.log("else stop");
          stopAnimate();
        }
        
      
    }, interval); //end of setInterval
  } //end of animateScript()
  
