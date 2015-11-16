'use strict';
// Player object

describe('Player', function() {
  it("verifies that the player object is built as intended", function() {
    var testPlayer = new Player("Bill", "O");
    expect(testPlayer.name).to.equal("Bill");
    expect(testPlayer.mark).to.equal("O");
  });
});

// Space object

describe('Space', function() {
  it("verifies that the space object is built as intended", function() {
    var testSpace = new Space(1, 3, null);
    expect(testSpace.x).to.equal(1);
    expect(testSpace.y).to.equal(3);
    expect(testSpace.mark).to.equal(null);
  });
});

// Board object

describe('Board', function() {
  it("verifies that the board object is built as intended", function() {
    var testBoard = new Board();
    expect(testBoard.spaces).to.eql([]);
  });

  describe('buildBoard', function() {
    it("populates the new board with spaces", function() {
      var testBoard = new Board();
      testBoard.buildBoard();
      expect(testBoard.spaces[2].x).to.equal(2);
      expect(testBoard.spaces[2].y).to.equal(0);
    });
  });
});

// Game object

describe('Game', function () {
  it("will create a game with two players and a board", function() {
    var testPlayerX = new Player("Max", "X");
    var testPlayerO = new Player("Charlie", "O");
    var testBoard = new Board();
    testBoard.buildBoard();
    var testGame = new Game(testPlayerX, testPlayerO, testBoard);
    expect(testGame.playerX).to.eql(testPlayerX);
    expect(testGame.playerX).to.eql(testPlayerX);
    expect(testGame.board).to.eql(testBoard);
  });

  describe('victory', function() {
    it("will determine if a horizontal victory condition has been met", function() {
      var testPlayerX = new Player("Max", "X");
      var testPlayerO = new Player("Charlie", "O");
      var testBoard = new Board();
      testBoard.buildBoard();
      var testGame = new Game(testPlayerX, testPlayerO, testBoard);
      testGame.playerTurn(0, testPlayerO);
      testGame.playerTurn(6, testPlayerX);
      testGame.playerTurn(1, testPlayerO);
      testGame.playerTurn(7, testPlayerX);
      testGame.playerTurn(2, testPlayerO);
      expect(testGame.victory(testBoard.spaces[2])).to.eql(true);
    });

    it("will determine if a vertical victory condition has been met", function() {
      var testPlayerX = new Player("Max", "X");
      var testPlayerO = new Player("Charlie", "O");
      var testBoard = new Board();
      testBoard.buildBoard();
      var testGame = new Game(testPlayerX, testPlayerO, testBoard);
      testGame.playerTurn(0, testPlayerX);
      testGame.playerTurn(2, testPlayerO);
      testGame.playerTurn(3, testPlayerX);
      testGame.playerTurn(5, testPlayerO);
      testGame.playerTurn(6, testPlayerX);
      expect(testGame.victory(testBoard.spaces[6])).to.eql(true);
    });
  });

  describe('playerTurn', function() {
    it("changes the mark of the corresponding space to O", function() {
      var testPlayerX = new Player("Max", "X");
      var testPlayerO = new Player("Charlie", "O");
      var testBoard = new Board();
      testBoard.buildBoard();
      var testGame = new Game(testPlayerX, testPlayerO, testBoard);
      testGame.playerTurn(6, testPlayerO);
      expect(testBoard.spaces[6].mark).to.equal("O");
    });
  });

  describe('playerTurn', function() {
    it("changes the mark of the corresponding space to X", function() {
      var testPlayerX = new Player("Max", "X");
      var testPlayerO = new Player("Charlie", "O");
      var testBoard = new Board();
      testBoard.buildBoard();
      var testGame = new Game(testPlayerX, testPlayerO, testBoard);
      testGame.playerTurn(4, testPlayerX);
      expect(testBoard.spaces[4].mark).to.equal("X");
    });
  });
});
