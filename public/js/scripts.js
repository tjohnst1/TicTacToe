function Player(name, mark) {
  this.name = name;
  this.mark = mark;
};

function Space(xCoordinate, yCoordinate, mark) {
  this.x = xCoordinate;
  this.y = yCoordinate;
  this.mark = mark;
};

function Board() {
  this.spaces = [];
};

Board.prototype.buildBoard = function() {
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      this.spaces.push(new Space(x, y, ""));
    };
  };
};

function Game(playerX, playerO, board, computer) {
  this.playerX = playerX;
  this.playerO = playerO;
  this.board = board;
  this.computer = computer || false;
};

Game.prototype.playerTurn = function(spaceIndex, player) {
  this.board.spaces[spaceIndex].mark = player.mark;
}

Game.prototype.openSpaces = function() {

  openSpaces = [];
  this.board.spaces.forEach(function(space) {
    if (space.mark === "") {
      openSpaces.push(space);
    }
  });
  return openSpaces;
}

Game.prototype.computerTurn = function() {
  openSpaces = this.openSpaces();

  randIndex = Math.floor(Math.random() * openSpaces.length);
  boardIndex = this.board.spaces.indexOf(openSpaces[randIndex]);
  this.board.spaces[boardIndex].mark = this.playerO.mark;
  return boardIndex;
}

Game.prototype.hardTurn = function() {
  openSpaces = this.openSpaces();
  var nextTurn = undefined;
  var nextIndex;
  var allSpaces = this.board.spaces;
  openSpaces.forEach(function(currentSpace) {
    var xFilteredSpaces = allSpaces.filter(function(space) {
      return space["x"] === currentSpace["x"]
    });
    var yFilteredSpaces = allSpaces.filter(function(space) {
      return space["y"] === currentSpace["y"]
    });
    if (currentSpace.x + currentSpace.y % 2 === 0) {
      var diagFilteredSpaces = allSpaces.filter(function(space) {
        return Math.abs(space.x - currentSpace.x) === Math.abs(space.y - currentSpace.y)
      });
    } else {
      var diagFilteredSpaces = [];
    }

    var xMarks = {x: [], o: [], "": []};
    var yMarks = {x: [], o: [], "": []};
    var diagMarks = {x: [], o: [], "": []};

    for(var i = 0; i < xFilteredSpaces.length; i++){
      xMarks[xFilteredSpaces[i].mark].push(xFilteredSpaces[i]);
      yMarks[yFilteredSpaces[i].mark].push(yFilteredSpaces[i]);
      // debugger;
      if (diagFilteredSpaces.length !== 0) {
        diagMarks[diagFilteredSpaces[i].mark].push(diagFilteredSpaces[i]);
      }
    }


    if (yMarks["x"].length === 2) {
      nextTurn = yMarks[""];
    } else if (diagMarks["x"].length === 2) {
      nextTurn = diagMarks[""];
    } else if (xMarks["x"].length === 2) {
      nextTurn = xMarks[""];
    }

    if (xMarks["o"].length === 2){
      nextTurn = xMarks[""];
    } else if (diagMarks["o"].length === 2){
      nextTurn = diagMarks[""];
    } else if (yMarks["o"].length === 2){
      nextTurn = yMarks[""];
    }


  });

  if (nextTurn === undefined) {
    for (var k = 0; k < openSpaces.length; k++) {
      if ((openSpaces[k].x + openSpaces[k].y) % 2 === 0) {
        nextIndex = this.board.spaces.indexOf(openSpaces[k]);
      }
      nextTurn = [this.board.spaces[nextIndex]];
    };
  }

  boardIndex = this.board.spaces.indexOf(nextTurn[0]);
// debugger;
  this.board.spaces[boardIndex].mark = this.playerO.mark;
  return boardIndex;

}

Game.prototype.lineWin = function(currentSpace, axis) {
  var allSpaces = this.board.spaces;
  var win = true;
  axis = axis.toLowerCase();
  var filteredSpaces = allSpaces.filter(function(space) {
    return space[axis] === currentSpace[axis]
  });

  filteredSpaces.forEach(function(filteredSpace) {
    if (filteredSpace.mark !== currentSpace.mark) {
      win = false;
    }

  });
  return win;
}

Game.prototype.diagWin = function(currentSpace) {
  var allSpaces = this.board.spaces;
  var win = true;
  if (currentSpace.x + currentSpace.y % 2 !== 0) {
    return false;
  }
  var filteredSpaces = allSpaces.filter(function(space) {
    return Math.abs(space.x - currentSpace.x) === Math.abs(space.y - currentSpace.y)
  });

  filteredSpaces.forEach(function(filteredSpace) {
    if (filteredSpace.mark !== currentSpace.mark) {
      win = false;
    }
  });

  return win;
}

Game.prototype.victory = function(currentSpace) {
  return this.lineWin(currentSpace, 'x') ||
    this.lineWin(currentSpace, 'y') ||
    this.diagWin(currentSpace);

  return
}

function playAgain() {
  location.reload();
}

$(document).ready(function() {

  var game,
    computer,
    win,
    difficulty,
    playerOne,
    playerTwoName,
    playerOneMark,
    playerTwo,
    playerTwoMark,
    board,
    currentSpace,
    currentPlayer,
    otherPlayer,
    turn = 1;

  $('#single-player').click(function() {

    $('div.title-screen').hide();
    $('div.select-difficulty').show();

  });

  $('button.difficulty').click(function() {
    difficulty = $(this).attr('id');
    $('div.select-difficulty').hide();
    $('#new-players').show();
    $('div.playerTwo').hide();

  });

  $('#two-player').click(function() {

    difficulty = false;

    $('div.title-screen').hide();
    $('#new-players').show();


  });

  $('#player-form').submit(function(event) {

    event.preventDefault();

    playerOneMark = $('#playerOne-mark').val();
    playerTwoMark = $('#playerTwo-mark').val();

    playerOne = new Player($('#playerOne-name').val(), playerOneMark);
    playerTwo = new Player($('#playerTwo-name').val(), playerTwoMark);
    board = new Board();
    board.buildBoard();

    if (difficulty === "easy") {

    } else if (difficulty === "hard") {

    }

    game = new Game(playerOne, playerTwo, board, difficulty);
    if (game.computer !== false) {
      playerTwo.name = "Computer";
    }
    $('#playerOne-displayMark').text(playerOne.mark);
    $('#playerTwo-displayMark').text(playerTwo.mark);

    $('#new-players').hide();
    $('.game-space').show();
    $('span.current-player').text(playerOne.name);
  });

  $('td.blank-space').each(function() {
    $(this).click(function() {
      currentPlayer = playerOne;
      otherPlayer = playerTwo;
      if (turn % 2 === 0) {
        otherPlayer = playerOne;
        currentPlayer = playerTwo;
      }

      $('span.current-player').text(otherPlayer.name);

      $(this).unbind("click");

      var index = parseInt($(this).attr('id'));
      currentSpace = board.spaces[index];
      game.playerTurn(index, currentPlayer);
      $(this).text(board.spaces[index].mark);

      win = game.victory(currentSpace);

      if (win === true) {
        $('div.game-space').hide();
        $('div.game-over').show();
        $('h1.game-over-message').text(currentPlayer.name + " has defeated " +
          otherPlayer.name);
      }

      turn += 1;

      if (turn === 10 && win === false) {
        $('div.game-over').show();
        $('div.game-space').hide();
        $('h1.game-over-message').text("CatScratch #!%*");

      } else if (currentPlayer.name !== "Computer" && game.computer != false && win !== true) {
        if (difficulty === "hard") {
          id = game.hardTurn();
        } else if (difficulty === "easy") {
          id = game.computerTurn();
        }
        window.setTimeout(function() {
          $("#" + id).text(playerTwo.mark);
          turn += 1;
          $('span.current-player').text(playerOne.name);
        }, 500);

        win = game.victory(game.board.spaces[id]);

        if (win === true) {
          $('div.game-space').hide();
          $('div.game-over').show();
          $('h1.game-over-message').text(otherPlayer.name + " has defeated " +
            currentPlayer.name);
        }


      }

      if (turn === 10 && win === false) {
        $('div.game-over').show();
        $('div.game-space').hide();
        $('h1.game-over-message').text("CatScratch #!%*");

      }

    });
  });

});
