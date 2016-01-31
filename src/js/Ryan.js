"use strict";
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  let command = line.split(" ");
  let pick = ""
  let action = ""
  let pick2 = ""
  if (command.length == 2) {
    pick = command[1];
    action = command[0];
    currentInputListen = action;

  } else if (command.length == 3) {
    pick = command[1];
    action = command[0];
    pick2 = command[2];
    currentInputListen = action;

  } else {
    currentInputListen = "nope";



  }
  advanceGame(pick, pick2);
  d("");

})

//---------------------------------------------------------classes
//---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
////---------------------------------------------------------classes
//


class node {
  constructor(x, y, cardtype, playerID) {
    this.x = x;
    this.y = y;
    this.cardType = cardtype;
    this.playerID = playerID;



  }
  updateCardType(cardtype) {
    this.cardType = cardtype;


  }
  toString() {
    return "x = " + this.x + " y = " + this.y + "cardType = " + this.cardType;

  }

}
class hand {
  constructor(playerNumber, color) {
    this.playerNumber = playerNumber;
    this.myHand = [1, 2, 3, 4, 5]; //number indicates card type
    this.myColor = color;
  }
}

class objective {
  constructor(description, objectiveCheck) {
    this.description = description;
    this.objectiveCheck = objectiveCheck;
  }
}

class playerData {
  constructor(name, objectiveArray) {
    this.name = name;
    this.objectiveArray = objectiveArray;
  }
}
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects
//----------------------------------------------function objects

//these function objects check whether the objective has been met
var sevenOnesObjectiveCheck = function() {
  let iIndex = 5;
  let jIndex = 5;
  let count = 0;
  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      if (globalGrid[i][j].cardType == 1) {
        count = count + 1;
      }
    }
  }
  if (count >= 4) {
    return true
  }
  return false;
}

var sevenTwosObjectiveCheck = function() {
  let iIndex = 5;
  let jIndex = 5;
  let count = 0;
  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      if (globalGrid[i][j].cardType == 2) {
        count = count + 1;
      }
    }
  }
  if (count >= 4) {
    return true
  }
  return false;
}

var sevenThreesObjectiveCheck = function() {
  let iIndex = 5;
  let jIndex = 5;
  let count = 0;
  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      if (globalGrid[i][j].cardType == 3) {
        count = count + 1;
      }
    }
  }
  if (count >= 4) {
    return true
  }
  return false;
}

var sevenFoursObjectiveCheck = function() {
  let iIndex = 5;
  let jIndex = 5;
  let count = 0;
  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      if (globalGrid[i][j].cardType == 4) {
        count = count + 1;
      }
    }
  }
  if (count >= 4) {
    return true
  }
  return false;
}

var sevenFivesObjectiveCheck = function() {
  let iIndex = 5;
  let jIndex = 5;
  let count = 0;
  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      if (globalGrid[i][j].cardType == 5) {
        count = count + 1;
      }
    }
  }
  if (count >= 4) {
    return true
  }
  return false;
}

var lessThanTenZerosObjectiveCheck = function() {
  let iIndex = 5;
  let jIndex = 5;
  let count = 0;
  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      if (globalGrid[i][j].cardType == 0) {
        count = count + 1;
      }
    }
  }
  if (count < 10) {
    return true
  }
  return false;
}

var controlNinePlusTilesObjectiveCheck = function() {
  /*let iIndex = 5;
  let jIndex = 5;
  let count = 0;
  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      if (grid[i][j].playerID == this.playerNumber)
      {
        count = count + 1;
      }
      /*if (grid[i][j].cardType == 0) {
        count = count + 1;
      }/**/
  /*}
  }
  if(count >= 9)
  {
    return true
  }
  return false;/**/
}

var opponentControlsLessThanTwelveObjectiveCheck = function() {

}

var controlsFourCornersAndCenterObjectiveCheck = function() {

  }
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals
  //---------------------------------------------------------------------globals


var currentInputListen = "";



var debugs = true; //determines whether debugs should be printed
var globalGrid;
//globalPlayer1Selection is a number of the card PLAYED in hand
//By default, card 0 will be played if no card is selected

var globalPlayer1Selection = null;
//globalPlayer1Selection is a number of card PLAYED in hand
//By default, card 0 will be played if no card is selected

var globalPlayer2Selection = null;
//globalHandPlayer1 is a hand object
//this is the position in the hand, not the card type
var globalHandPlayer1 = null;
//globalHandPlayer2 is a hand object
//this is the position in the hand, not the card type
var globalHandPlayer2 = null;
//displayedHand is a hand object that needs to be displayed this turn
var displayedHand = null;
//gridSelectionPlayer1 is a node object
//by default node[0][0] is selected but it will default to your previous selection
var gridSelectionPlayer1 = null;
//gridSelectionPlayer2 is a node object
var gridSelectionPlayer2 = null;
var currentTurn = 1;
var turnCount = 0; // the number of turns that have passed
var roundCount = 0; // the number of rounds that have passed
//round is a set of consecutive turns that includes player 1 turn, player 2 turn, and result turn.
var numObjectives = 3; //number of objectives for each player.
//This is the array that contains all possible objectives that can be assigned
var globalObjectiveArray = null;

var playerArray = [];


//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions
//-----------------------------------------------functions

//createGrid creates a grid and returns it
//used to initialize the globalGrid
function createGrid() {
  d("Creating a Grid")


  let grid = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ];
  let iIndex = 5;
  let jIndex = 5;

  for (let i = 0; i < iIndex; i++) {
    for (let j = 0; j < jIndex; j++) {
      grid[i][j] = new node(i, j, 0, 0);
      console.log(grid[i][j].toString());
    }

  } /**/


  return grid;

}



//This function assigns the globalPlayerSelection according to player number
function handleHandSelection(playerNumber, cardNumber) {
  if (playerNumber == 1) {
    globalPlayer1Selection = globalHandPlayer1[cardNumber];
  }
  if (playerNumber == 2) {
    globalPlayer2Selection = globalHandPlayer2[cardNumber];
  }
}

//This function initializes all Globals
//
function initGame() {
  //this is the grid that contains all nodes on the grid
  globalGrid = createGrid();
  //globalHand is a hand object for a player
  globalHandPlayer1 = new hand(1, "red");
  //globalHandPlayer2 is a hand object
  //this is the position in the hand, not the card type
  globalHandPlayer2 = new hand(2, "blue");
  //displayedHand is the current hand that is displayed
  displayedHand = globalHandPlayer1;
  //gridSelectionPlayer1 contains the selection of the node on the grid.
  //by default is node 0 0
  gridSelectionPlayer1 = globalGrid[0][0];

  //gridSelectionPlayer2 is a node object
  //same as player2
  gridSelectionPlayer2 = globalGrid[0][0];

  //the globalObjectiveArray contains function objects for all methods that check
  //whether the objective is accomplished
  globalObjectiveArray = [
    new objective("SevenOnes", sevenOnesObjectiveCheck),
    new objective("SevenTwos", sevenTwosObjectiveCheck),
    new objective("sevenThrees", sevenThreesObjectiveCheck),
    new objective("sevenFours", sevenFoursObjectiveCheck),
    new objective("sevenFives", sevenFivesObjectiveCheck)
    //to do: add other objectives
  ];
  //globalPlayerselection is the position of the card in the hand that
  //they currently have selected
  globalPlayer1Selection = 1;
  globalPlayer2Selection = 1;

}

//there will be a button that a player will press to end his turn/confirm his selections
//nextTurn advances the game to the next turn and realizes the selections
function nextTurn() {

  //update grid with the players selections
  if (currentTurn == 2) {
    //gridSelection... is a pointer to the actual node that they picked
    let aX = gridSelectionPlayer2.x;
    let aY = gridSelectionPlayer2.y;
    d("TargetNode = " + gridSelectionPlayer2.toString());
    //this changes the card type of the selected node to the selected hand card
    globalGrid[aX][aY].cardType = displayedHand.myHand[globalPlayer2Selection];
    d("Now the node is" + gridSelectionPlayer2.toString());

    //now we are printing the objectives
    for (let i = 0; i < playerArray[1].objectiveArray.length; i++) {
      d("objective " + i.toString() + playerArray[1].objectiveArray[i].objectiveCheck() + " " + playerArray[1].objectiveArray[i].description)

    }
    displayedHand = globalHandPlayer2;
    //let you know whose turn it is now
    d("player 1 turn");

  } else {


    //update grid with the players selections
    //gridSelection... is a pointer to the actual node that they picked
    let aX = gridSelectionPlayer1.x;
    let aY = gridSelectionPlayer1.y;
    printGrid();
    d("TargetNode = " + gridSelectionPlayer1.toString());
    //this changes the card type of the selected node to the selected hand card
    globalGrid[aX][aY].cardType = displayedHand.myHand[globalPlayer1Selection];
    d("Now the node is" + gridSelectionPlayer1.toString());

    //now we are printing the objectives
    for (let i = 0; i < playerArray[0].objectiveArray.length; i++) {
      d("objective " + i.toString() + playerArray[0].objectiveArray[i].objectiveCheck() + " " + playerArray[0].objectiveArray[i].description)
    }

    //let you know whose turn it is now
    //show new hand
    displayedHand = globalHandPlayer1;
    d("player 2 turn");

  }

  iWin();
  //advance to the next turn
  if (currentTurn == 2) {
    currentTurn = 1;
    displayedHand = globalHandPlayer1;
  } else {
    currentTurn = 2;
    displayedHand = globalHandPlayer2;
  }

}

//create the players and their objectives
//the player Array contians player data such as objectives and names

function initPlayers() {
  playerArray.length = 2;
  for (let i = 0; i < playerArray.length; i++) {
    playerArray[i] = new playerData("player" + i.toString(), getRandomObjectives());


    d("Done init")
  }
}

//This is called by initPlayers to populate the players objectives
function getRandomObjectives() {


  let randomArray = copyArray(globalObjectiveArray);
  let numObjectivesRemaining = numObjectives;
  let selectedObjectives = [];
  selectedObjectives.length = numObjectives;
  let indexSelectedObjects = 0;
  let numRand = 0;
  //this loop populates an array with randomly selected objectives and
  //and ends when enough objectives have been added
  while (numObjectivesRemaining > 0) {
    numRand = Math.floor((Math.random() * numObjectivesRemaining.length) + 1);
    selectedObjectives[indexSelectedObjects] = (randomArray.splice(numRand, 1))[0];
    indexSelectedObjects = indexSelectedObjects + 1;
    numObjectivesRemaining = numObjectivesRemaining - 1;
  }
  return selectedObjectives;



}
//iWin()
function iWin() {
  d("iWin")
  let win = true;
  if (currentTurn == 1) {
    for (let i = 0; i < playerArray[0].objectiveArray.length; i++) {
      d(i.toString())
      d(playerArray[0].objectiveArray[i].objectiveCheck().toString())
      if (playerArray[0].objectiveArray[i].objectiveCheck() != true) {
        win = false;



      }

    }
    if (win == true) {
      d("\n\n " + playerArray[0].name + " wins" + "\n\n")
      rl.close();
    }

  } else {
    for (let i = 0; i < playerArray[1].objectiveArray.length; i++) {
      if (playerArray[1].objectiveArray[i].objectiveCheck() != true) {
        win = false;



      }



    }
    if (win == true) {
      d("\n\n " + playerArray[1].name + " wins" + "\n\n")
      rl.close();
    }

  }


}

//creates a deep copy for any provided array
function copyArray(targetArray) {
  let arrayCopy = [];
  arrayCopy.length = targetArray.length;
  for (let i = 0; i < targetArray.length; i++) {
    arrayCopy[i] = targetArray[i];
  }
  return arrayCopy;
}
//debug output
function d(message) {
  if (debugs = true) {
    rl.pause();
    console.log(message.toString());
    rl.resume();

  }
}
//function for playing the game
function playGame() {
  initGame();
  initPlayers();
  printGrid();
  printHand();
  currentInputListen = "selectGridXY";
  //inputGridSelection();


}

//prints the grid
function printGrid() {
  if (debugs == true) {
    let theNodeMessage = "";
    for (let j = 0; j < globalGrid.length; j++) {
      theNodeMessage = "";
      for (let i = 0; i < globalGrid.length; i++) {
        theNodeMessage = theNodeMessage + " [x = " + globalGrid[i][j].x + " y = " + globalGrid[i][j].y + " cardType = " + globalGrid[i][j].cardType + "]";

      }
      d(theNodeMessage);
    }
  }


}
//prints the hand based on the current turn
function printHand() {
  if (currentTurn == 1) {

    for (let i = 0; i < globalHandPlayer1.myHand.length; i++) {
      d(globalHandPlayer1.myHand[i].toString());
    }
  } else {
    for (let i = 0; i < globalHandPlayer2.myHand.length; i++) {
      d(globalHandPlayer2.myHand[i].toString());
    }

  }


}
var some = null;
//this function sets the selection for the node in the grid based on
//paras sent
function inputGridSelection(ryanX, ryanY) {
  d("inputGridSelection")
  d("input Grid" + ryanX.toString() + ryanY.toString())
  if (debugs) {
    let xC = ryanX;
    let yC = ryanY;

    if (currentTurn == 1) {
      gridSelectionPlayer1 = globalGrid[xC][yC];
      d("we set to p1" + gridSelectionPlayer1.toString())

    } else {
      gridSelectionPlayer2 = globalGrid[xC][yC];
      d("we set to p2" + gridSelectionPlayer2.toString())

    }
  }
}


//advanceGame
//takes the number selection from the user, and depending upon the command
//it will change selections
//
var inX = null;
var inY = null;

function advanceGame(pInput1, pInput2) {
  d("advanceGame input =  " + pInput1)
    // TODO: Log the answer in a database
  if (currentInputListen == "selectGridXY") {
    d("selectGridXY");
    inX = pInput1
    inY = pInput2
      //note that 0 is not valid, i will subtract 1 from selection
    if (inX >= 0 && inX <= 5 && inY >= 0 && inY <= 5) {
      inputGridSelection(inX, inY);
    }
  } else if (currentInputListen == "selectHandNum") {
    d("selectHandNum");

    inputHandSelection(pInput1);


  } else if (currentInputListen == "play") {
    nextTurn();

  } else {
    d("Only valid inputs are selectGridXY selectHandNum play g");




  }
  printGrid();
  printHand();




}
//inputHandSelection changes the card selected in the hand
function inputHandSelection(cardIn) {
  d("inputHandSelection")
  if (debugs) {
    let cardI = cardIn;
    d("p1handSel + p2handSel");


    if (currentTurn == 1) {

      globalPlayer1Selection = cardI - 1;


    } else {
      globalPlayer2Selection = cardI - 1;


    }
    d(globalPlayer1Selection + " " + globalPlayer2Selection)
    d("inputHandSelection complete");
  }
}
//here we call play game which begins the game
playGame();
