var gameBoard = (function(){
    var board = [['.','.','.'],['.','.','.'],['.','.','.']];
    var playerX = document.querySelector("#player-X");
    var playerO = document.querySelector("#player-O");
    var currentPlayerTurn = document.querySelector(".current-player-selection").lastElementChild;
    var startGame = document.querySelector("#start-game");

    //takes the board html and listen for click on every grid

    startGame.addEventListener('click', function(){
        hideButton();
    });

    function hideButton(){
        if (playerX.firstElementChild.textContent !== "" &&  playerO.firstElementChild.textContent !== ""){
            playerX.lastElementChild.style.visibility = "hidden";
            playerO.lastElementChild.style.visibility = "hidden";
            startGame.style.visibility = "hidden";
            currentPlayerTurn.textContent = "Player 1"; 
            boardDOM.addEventListener('click', (event) => {
                playerMove(event);
            });
        }
        else{
            alert("Both Players has not been selected")
        }
    }
    var boardDOM = document.querySelector(".game-board");
    
    function refreshBoard(){
        var squareBoard = boardDOM.children;    
        for (var i = 0; i < squareBoard.length; i++){
            if (squareBoard[i].firstElementChild) {
                squareBoard[i].removeChild(squareBoard[i].firstElementChild);
            }
        }
        board = [['.','.','.'],['.','.','.'],['.','.','.']];

        playerX.firstElementChild.textContent = "";
        playerO.firstElementChild.textContent = "";
        playerX.lastElementChild.style.visibility = "";
        playerO.lastElementChild.style.visibility = "";
        startGame.style.visibility = "";
        currentPlayerTurn.textContent = "Player 1"




    }

    //if clicked on the board display render and send to game board
    function playerMove(e){
        // Ensure we always target the square element, even if clicking on a child
        let square = e.target;
    
        // If the target is an image (or any child), get its parent (the square)
        if (square.tagName === 'IMG') {
            square = square.parentElement;
        }
    
        // Check if the square has been clicked before (i.e., no child elements)
        if (square.children.length === 0){
            const move = currentPlayerTurn.textContent === playerX.firstElementChild.textContent ? 'x' : 'o';
            const current_x = 1 * square.dataset.x;
            const current_y = 1 * square.dataset.y;
    
            // Render the move and update the board
            render(e, move);
            currentPlayerTurn.textContent = move === 'x' ? playerO.firstElementChild.textContent : playerX.firstElementChild.textContent;
            board[current_y][current_x] = move;
            
            // Check if the current player won the game
            checkWin(current_x, current_y);
        }
    }
    function render(e,move){
        const inputMove = new Image();
        inputMove.src = move === 'x' ? "X.png" : "O.png";
        e.target.appendChild(inputMove);
    }


    //when clicked check at that position horizontally vertically etc
    function horizontalCheck(current_x,current_y){
        let combination = "";
        for (let i = 1; i < current_x +1; i++){
            combination += board[current_y][current_x-i];
        }
        for (let i = 0; i + current_x < 3; i++){
            combination += board[current_y][current_x+i];
        }
        return combination === "xxx" || combination === "ooo";
    }

    function verticalCheck (current_x,current_y) {
        let combination = "";

        for (let i = 1; i < current_y + 1; i++){
            combination += board[current_y-i][current_x];
        }

        for (let i = 0; i + current_y < 3; i++ ){

            combination += board[current_y+i][current_x];
        }
        console.log(combination)
        return combination === "xxx" || combination === "ooo";

    }

    function diagonalCheckForwardSlash(current_x, current_y) {
        let combination = "";
        for (let i = -2; i <= 0; i++) {
            let x = current_x + i;
            let y = current_y - i;
            if (x >= 0 && x < 3 && y >= 0 && y < 3) {
                combination += board[y][x];
            }
        }
        return combination === "xxx" || combination === "ooo";
    }

    function diagonalCheckBackSlash(current_x, current_y) {
        let combination = "";
        for (let i = -2; i <= 0; i++) {
            let x = current_x + i;
            let y = current_y + i;
            if (x >= 0 && x < 3 && y >= 0 && y < 3) {
                combination += board[y][x];
            }
        }
        return combination === "xxx" || combination === "ooo";
    }

    function checkWin(current_x, current_y) {
        if (
            horizontalCheck(current_x, current_y) ||
            verticalCheck(current_x, current_y) ||
            diagonalCheckForwardSlash(current_x, current_y) ||
            diagonalCheckBackSlash(current_x, current_y)
        ) {
            setTimeout(function() {
                alert("Player " + board[current_y][current_x].toUpperCase() + " wins!");
                // Optionally reset or disable board to stop further moves
            }, 100); // Small delay to allow render

            setTimeout(function() {
                refreshBoard()
            }, 100);


        }
    }
    
    // Expose fucntions so they can be accessed from outside
    return{
        board,
        checkWin        
    };

}) ();  


var player = (function(){
    var currentPlayerNumber = document.querySelector(".current-player-selection").lastElementChild;
    var playerX = document.querySelector("#player-X");
    var playerO = document.querySelector("#player-O");

        
    playerX.lastElementChild.addEventListener('click', function() {
        addPlayer('X');
    });

    playerO.lastElementChild.addEventListener('click', function() {
        addPlayer('O');
    });
        
    function addPlayer(type) {
        if (type === 'X' && playerX.firstElementChild.textContent === "") {
            playerX.firstElementChild.textContent = currentPlayerNumber.textContent;
            currentPlayerNumber.textContent = "Player 2";
        } else if (type === 'O' && playerO.firstElementChild.textContent === "") {
            playerO.firstElementChild.textContent = currentPlayerNumber.textContent;
            currentPlayerNumber.textContent = "Player 2";
        } else {
            alert("Already selected");
        }
    }


    }) ();  