'use strict';
//Neste, når en spiller ikke kan OG har trukket 3 kort, så må de trekke hele pilen.

//object for the cardgame
const playersDeck = {
    theDeckOnTable: [],
    playersSelectedCardOnTable: [],
    thePlayersCardsOnHand: [],
    cardSteps: 0,
    cardsClickable: [],
    amountPickedCards: 0,
    noCardsCanBeatTheTable: false,
};


const deckMechanics = {
    theClickCard: [],
    theCounter: function () {
        let timeleft = 10;

        let downloadTimer = setInterval(startTheTime, 1000);
        function startTheTime() {

            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                deckMechanics.thePileBelongsToYouNow();
                deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());
            }
            document.getElementById("progressBar").value = 10 - timeleft;
            timeleft -= 1;
        }
        clearInterval(startTheTime);
        document.getElementById("progressBar").value = 0;


    },
    thePileBelongsToYouNow: function () {
        let amountOfCardsToGet = playersDeck.theDeckOnTable.length;
        for (let i = 0; i < amountOfCardsToGet; i++) {
            let playersCards = document.createElement('div');
            playersCards.className = 'card';
            playersCards.innerHTML = playersDeck.theDeckOnTable[i, i];
            document.getElementById(deckMechanics.returnCurentPlayer()).appendChild(playersCards);
            playersDeck[deckMechanics.returnCurentPlayer()].push(playersDeck.theDeckOnTable[i, i]);
        }
        let playerDeck = document.getElementById("deck").getElementsByTagName("div")[0];
        playerDeck.innerHTML = "INGEN KORT";
        playersDeck.theDeckOnTable = [];
        deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());

    },
    createSomCardsForAFella: function (e) {
        for (let i = 0; i < e; i++) {
            let playersCards = document.createElement('div');
            playersCards.className = 'card';
            //playersCards.innerHTML = playersDeck[count][i, i + 3];
            //document.getElementById(count).appendChild(playersCards);
        }
    },
    removeACard: function (removeThisCardSir) {
        let myDivs = document.getElementById(deckMechanics.returnCurentPlayer()).getElementsByTagName("div");
        for (var i = 0; i < myDivs.length; i++) {
            if (myDivs[i].innerHTML == removeThisCardSir) {
                myDivs[i].parentNode.removeChild(myDivs[i]);
                break;
            }
        }
    },
    dumpThePile: function (theResetCard) {
        playersDeck.theDeckOnTable = [];
        let playerDeck = document.getElementById("deck").getElementsByTagName("div")[0];
        playerDeck.innerHTML = "INGEN KORT";
        let myDivs = document.getElementById(deckMechanics.returnCurentPlayer()).getElementsByTagName("div");
        deckMechanics.removeACard(theResetCard);
        deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());
    },
    resetThePile: function (theResetCard) {
        let theCardChosen = playersDeck[deckMechanics.returnCurentPlayer()].findIndex(rank => rank == theResetCard);
        playersDeck.theDeckOnTable.push(theResetCard);
        playersDeck[deckMechanics.returnCurentPlayer()].splice(theCardChosen, 1);
        deckMechanics.removeACard(theResetCard);
        document.getElementById("deck").getElementsByTagName("div")[0].innerHTML = playersDeck.theDeckOnTable[playersDeck.theDeckOnTable.length - 1];
        deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());

    },
    firstPlayerUp: false,
    allPlayers: [],
    myCard: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Knekt", "Dronning", "Kongen", "Ess"],
    mySuit: ["hjerte", "diamant", "klover", "spar"],
    allCards: [],
    stepThroughEachPlayer: function () {
        if (this.firstPlayerUp == false) {
            this.firstPlayerUp = true;
            return this.countNextPlayer = 0;
        }
        let thePlayerCounter = this.countNextPlayer == deckMechanics.allPlayers.length - 1;
        if (thePlayerCounter) {
            this.countNextPlayer = 0;
        } else {
            this.countNextPlayer++;
        }
        return this.countNextPlayer;

    },
    getValueOfCard: function (str) {
        let makeItAString = String(str);
        return makeItAString.split(" ")[0];

    },
    countNextPlayer: 0,
    returnCurentPlayer: function () {
        return this.allPlayers[this.countNextPlayer];
    },
    createTheDeck: function getCard() {
        for (let rep = 0; rep < this.myCard.length; rep++) {
            const card = this.myCard[rep];
            for (let suity = 0; suity < this.mySuit.length; suity++) {
                const cardWithSuit = this.mySuit[suity];
                this.allCards.push(card + " " + cardWithSuit);
            }
        }
    },
    randoNumber: function () {
        return Math.floor(Math.random() * this.allCards.length);
    },
    forEachRemove: function (theArray, theClass) {
        theArray.forEach(function (el) {
            el.classList.remove(theClass)
        })
    },
    drawCards: function (amountCards) {
        for (let i = 0; i < amountCards; i++) {
            for (let i = 0; i < this.allPlayers.length; i++) {
                let player = this.allPlayers[i];
                if (playersDeck[player] === undefined) {
                    playersDeck[player] = [];
                }
                playersDeck[player].push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
            };
        }
    },
    getKeys: function (query) {
        var keys = Object.keys(datasets).filter(function (key) {
            return !!~key.indexOf(query);
        });

        return keys;
    },
    placeTheVisibleCards: function (numberOfCards) {

        const container = document.getElementById('cards');

        this.allPlayers.forEach(function (count, index) {
            let playerMainDiv = document.createElement('div');
            playerMainDiv.id = count;
            playerMainDiv.className = 'playerDeck';
            if (index == 0) {
                playerMainDiv.className = 'playerDeck activePlayer';

            }
            let playerName = document.createElement('h2');
            playerName.innerHTML = count.charAt(0).toUpperCase() + count.slice(1);
            container.appendChild(playerMainDiv).appendChild(playerName);
            deckMechanics.createSomCardsForAFella(numberOfCards);

            for (let i = 0; i < numberOfCards; i++) {
                let playersCards = document.createElement('div');
                playersCards.className = 'card';
                playersCards.innerHTML = playersDeck[count][i, i + 3];
                document.getElementById(count).appendChild(playersCards);
            }
        });
        playersDeck.visibleCardsPlaced = false;
    },

    theCurrentCardOnTable: function () {
        return this.myCard.indexOf(this.getValueOfCard(playersDeck.theDeckOnTable[playersDeck.theDeckOnTable.length - 1]))
    },
    indexCards: [],
    alwaysTheIndexForThePlayersCards: function () {
        playersDeck[deckMechanics.returnCurentPlayer()].slice(6, playersDeck[deckMechanics.returnCurentPlayer()].length).forEach(function (convertYO) {
            deckMechanics.indexCards.push(deckMechanics.myCard.indexOf(deckMechanics.getValueOfCard(convertYO)));
        });
    },
    //MIGHT here have to add a paramaer that controlls how many cards to become clicklabel..3  to 0?
    applySomeStyleToThePlayersCards: function () {
        giveMeExtraCardBtn.textContent = "Give me a card";


        var elements = document.getElementById(deckMechanics.returnCurentPlayer()).querySelectorAll('div');
        for (let i = 3; i < elements.length; i++) {
            elements[i].className = 'card';
            elements[i].addEventListener("click", deckMechanics.theClickRules);
            giveMeExtraCardBtn.addEventListener("click", deckMechanics.handMeAnotherCardBuddy);

            if (deckMechanics.theCurrentCardOnTable() <= deckMechanics.myCard.indexOf(deckMechanics.getValueOfCard(playersDeck[deckMechanics.returnCurentPlayer()][i + 3]))) {
                elements[i].classList.add("pickMePickMe");
            }
        }
        //check if there are no card possible to select
        deckMechanics.indexCards = [];
        deckMechanics.alwaysTheIndexForThePlayersCards();
        console.log(deckMechanics.indexCards);

        let checkIFAllCardsFailed = deckMechanics.indexCards.every(function (e) {
            return e < deckMechanics.theCurrentCardOnTable();
        });

        let theIsNoHope = checkIFAllCardsFailed && playersDeck.amountPickedCards > 2;
        if (theIsNoHope) {
            deckMechanics.thePileBelongsToYouNow();
        }


        console.log(playersDeck[deckMechanics.returnCurentPlayer()]);

        const mySet1 = new Set(deckMechanics.indexCards);
        let seeIfAnyCardsAlike = (mySet1).size !== deckMechanics.indexCards.length;
        if (seeIfAnyCardsAlike) {
            let hihi = deckMechanics.indexCards.filter((element, index, array) => array.indexOf(element) !== index);
            console.log(hihi);
            deckMechanics.indexCards.forEach(function (value, i) {
                if (value == hihi) {
                    let getTheDuplicates = document.getElementById(deckMechanics.returnCurentPlayer()).getElementsByClassName('card')[i + 3];
                    console.log(getTheDuplicates);
                    let theCheckCard = document.createElement('input');
                    getTheDuplicates.className = 'card theCheckedCard';
                }
            });
        }
        console.log(playersDeck[deckMechanics.returnCurentPlayer()]);

        if (playersDeck.amountPickedCards > 2) {
            giveMeExtraCardBtn.textContent = "Skip me";
            //deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());

        }

    },
    removeSomeStyleFromTheCards: function () {
        var elements = document.getElementById(deckMechanics.returnCurentPlayer()).querySelectorAll('div');
        elements.forEach(function (eachDiv) {
            eachDiv.removeEventListener("click", deckMechanics.theClickRules);
            eachDiv.classList.remove("pickMePickMe");
            eachDiv.classList.remove("theCheckedCard");
        });
    },
    theClickRules: function (event) {
        deckMechanics.theClickCard = this.innerHTML;
        let valuePlayerDeck = deckMechanics.myCard.indexOf(deckMechanics.getValueOfCard(this.innerHTML));
        let theCardTableValue = deckMechanics.theCurrentCardOnTable();
        let theSelectedCard = playersDeck[deckMechanics.returnCurentPlayer()].findIndex(rank => rank == this.innerHTML);

        console.log(valuePlayerDeck, theCardTableValue);
        if (valuePlayerDeck >= theCardTableValue && (valuePlayerDeck != 8)) {
            playersDeck.theDeckOnTable.push(playersDeck[deckMechanics.returnCurentPlayer()][theSelectedCard]);
            playersDeck[deckMechanics.returnCurentPlayer()].splice(theSelectedCard, 1);
            let playerDeck = document.getElementById("deck").getElementsByTagName("div")[0];
            playerDeck.style = "border:3px solid blue;";
            playerDeck.innerHTML = playersDeck.theDeckOnTable[playersDeck.theDeckOnTable.length - 1];

            this.parentNode.removeChild(this);
            deckMechanics.removeSomeStyleFromTheCards();
            console.log(playersDeck[deckMechanics.returnCurentPlayer()].length);
            deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());

            //the card 10 is allowed to "throw out" the deck
        } else if (valuePlayerDeck == 8) {
            deckMechanics.dumpThePile(this.innerHTML);

        } else if (valuePlayerDeck == 0) {
            deckMechanics.resetThePile(this.innerHTML);
        }
        else {

        }
        event.stopImmediatePropagation();
    },
    whoGetsToClickTheCards: function () {


        giveMeExtraCardBtn.disabled = false;
        playersDeck.amountPickedCards = 0;
        var elements = document.getElementById(deckMechanics.returnCurentPlayer()).querySelectorAll('div');
        deckMechanics.applySomeStyleToThePlayersCards();


    },
    handMeAnotherCardBuddy: function (event) {
        playersDeck.amountPickedCards++;
        if (playersDeck.amountPickedCards >= 4) {
            deckMechanics.removeSomeStyleFromTheCards();
            giveMeExtraCardBtn.disabled = true;
            deckMechanics.thePileBelongsToYouNow();
        }

        playersDeck[deckMechanics.returnCurentPlayer()].push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
        let giveMeANewCardYouSOnOffAB = document.createElement('div');
        //giveMeANewCardYouSOnOffAB.className = 'card';
        giveMeANewCardYouSOnOffAB.innerHTML = playersDeck[deckMechanics.returnCurentPlayer()].slice(-1);
        document.getElementById(deckMechanics.returnCurentPlayer()).appendChild(giveMeANewCardYouSOnOffAB);
        giveMeANewCardYouSOnOffAB.addEventListener("click", deckMechanics.theClickRules);
        deckMechanics.applySomeStyleToThePlayersCards();


        event.stopImmediatePropagation();

    },

    drawCardToDeck: function (numberOfCards) {
        let deckname = document.createElement('h2');
        deckname.style = "text-align:center;";
        deckname.innerHTML = "The deck on table";
        document.getElementById('deck').appendChild(deckname);
        let playerCardsOnHands = document.createElement('div');
        playerCardsOnHands.className = 'card';
        document.getElementById('deck').appendChild(playerCardsOnHands);
        playersDeck.theDeckOnTable.push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
        playerCardsOnHands.innerHTML = playersDeck.theDeckOnTable.at(-1);

    },

    playerCounter: function (playerNR) {
        this.allPlayers.forEach(function (value, i) {
            document.getElementById(deckMechanics.allPlayers[i]).classList.remove("activePlayer");
        });
        let thePlayersTitle = document.getElementById(deckMechanics.allPlayers[playerNR]);
        thePlayersTitle.classList.add("activePlayer");
        let playersCardOnHands = document.getElementById(deckMechanics.allPlayers[playerNR]).getElementsByClassName("card");
        deckMechanics.whoGetsToClickTheCards();
    },

};


deckMechanics.createTheDeck();

const pickedCards = function (nameOfPlayer) {
    this.nameOfPlayer = nameOfPlayer;
    this.addPlayer = function () {
        deckMechanics.allPlayers.push(this.nameOfPlayer);
    };
};

//Create the new players
const morten = new pickedCards('morten');
const carly = new pickedCards('carly');
const finley = new pickedCards('finley');
morten.addPlayer();
carly.addPlayer();
finley.addPlayer();

const theButton = document.getElementById('button');
const giveMeExtraCardBtn = document.getElementById('giveMeExtraCard');

deckMechanics.drawCards(9);
deckMechanics.drawCardToDeck(1);
deckMechanics.placeTheVisibleCards(6);

//theButton.disabled = true;
deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());
