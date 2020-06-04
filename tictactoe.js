var scr = document.getElementById("ttc");
var ctx = scr.getContext("2d");
ctx.strokeRect(0, 0, 100, 100);
ctx.strokeRect(100, 0, 100, 100);
ctx.strokeRect(200, 0, 100, 100);
ctx.strokeRect(0, 100, 100, 100);
ctx.strokeRect(100, 100, 100, 100);
ctx.strokeRect(200, 100, 100, 100);
ctx.strokeRect(0, 200, 100, 100);
ctx.strokeRect(100, 200, 100, 100);
ctx.strokeRect(200, 200, 100, 100);

class Board{
    constructor(){
        this.gboard = [[null, null, null],
                [null, null, null],
                [null, null, null]];
    }
    check(){
        var winner = false;
        var champion = null;
        for(var i = 0; i < 3; i++){
            if((this.gboard[i][0] == this.gboard[i][1]) && (this.gboard[i][0] == this.gboard[i][2]) &&(this.gboard[i][0] != null)){
                winner = true;
                champion = this.gboard[i][0];
            }
            else if((this.gboard[0][i] == this.gboard[1][i])&&(this.gboard[0][i] == this.gboard[2][i])&&(this.gboard[0][i] != null)){
                winner = true;
                champion = this.gboard[0][i];
            }
        }
        if(!(winner)){
            if((this.gboard[0][0] == this.gboard[1][1])&&(this.gboard[0][0] == this.gboard[2][2])&&(this.gboard[0][0] != null)){
                winner = true;
                champion = this.gboard[0][0];
            }
            else if((this.gboard[0][2] == this.gboard[1][1])&&(this.gboard[2][0] == this.gboard[0][2])&&(this.gboard[0][2] != null)){
                winner = true;
                champion = this.gboard[0][2];
            }
        }
        return [winner, champion];
    }

    post_check(){
        var results = this.check()
        if(results[0] == false){
            var procceed = false;
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    if(this.gboard[i][j] == null){
                        procceed = true;
                    }
                }
            }
            if(!procceed){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return results[1]
        }
    }

    play(x,y,subs){
        var played = false
        if(this.gboard[x][y] == null){
            this.gboard[x][y] = subs;
            played = true;
        }
        return played;
    }
}
var board = new Board();
scr.addEventListener('mousedown',onDown,false);
var menu = document.getElementById("menu");
var who = "";
function transform(c){
    if(c < 100){
        var p = 0;
    }
    else if(c < 200){
        var p = 1;
    }
    else{
        var p = 2;
    }
    return p;
}
var who = "O";

function whos_next(alpha){
    if(alpha == "X"){
        alpha = "O";
    }
    else{
        alpha = "X";
    }
    return alpha;
}

function onDown(event){
    cx = event.pageX - (scr.offsetLeft + 8); //8 is there due to the minimum distance of the
    cy = event.pageY - (scr.offsetTop + menu.offsetHeight + 18); //18 is there due to the header of the page, feel free to change it
    px = transform(cx);
    py = transform(cy);
    var played = window.board.play(px,py,who);
    if(played){
        draw(who, px, py);
        who = whos_next(who);
        var results = window.board.post_check();
        if(!(results === true)){
            document.getElementById("restart").style.visibility = "visible";
            if(results == "X"){
                alert("The square wins! Restart the game clicking the button bellow!");
            }
            else if(results == "O"){
                alert("The ball wins! Restart the game clicking the button bellow!");
            }
            else{
                alert("It's a tie! Restart the game clicking the button bellow!");
            }
        }
    }
    else{
        alert("You can't play here!");
    }
}
function drawO(px,py){
    ctx.beginPath();
    ctx.arc(px*100 + 50, py*100 + 50, 30, 0, 2 * Math.PI, false);
    ctx.stroke();
}
function drawX(px,py){
    ctx.strokeRect(px*100 + 25, py*100 + 25, 50, 50);
}
function draw(who, px, py){
    if(who == "O"){
        drawO(px,py);
    }
    else{
        drawX(px,py);
    }
}
function restart(){
    board = new Board();
    ctx.clearRect (0, 0, 300, 300);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.strokeRect(100, 0, 100, 100);
    ctx.strokeRect(200, 0, 100, 100);
    ctx.strokeRect(0, 100, 100, 100);
    ctx.strokeRect(100, 100, 100, 100);
    ctx.strokeRect(200, 100, 100, 100);
    ctx.strokeRect(0, 200, 100, 100);
    ctx.strokeRect(100, 200, 100, 100);
    ctx.strokeRect(200, 200, 100, 100);
}
