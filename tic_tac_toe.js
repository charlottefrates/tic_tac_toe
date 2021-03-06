Game = {
    cells: null,

    turn: "X",

    size: null,

    $board: $(".board"),

    init: function(e) {
        Game.size = e,
        Game.cells = [];
        for (var a = 0; a < Game.size; a++){
            Game.cells[a] = new Array(Game.size);
            if (Game.size >9 || Game.size <3 ){
                $("#outcome h2").text("Please select a number between 3-9 to make it a fair game.");
                $("#outcome").removeClass("hide");
                return false;
            };
        }

        Game.generateBoard()
    },

    nextMove: function(e, a) {
        Game.cells[e][a] = Game.turn,
        Game.makePlay()
    },

    displayBoard: function() {
        $(".cell").text("");
        for (var e = 0; e < Game.size; e++)
            for (var a = 0; a < Game.size; a++) {
                var l = $("#cell-" + e + "-" + a);
                l.removeClass("x"),
                l.removeClass("o"),
                l.addClass(Game.cells[e][a]),
                l.text(Game.cells[e][a])
            }
    },

    generateBoard: function() {
        for (var e = 0; e < Game.size; e++) {
            Game.$board.append('<div class="row"></div>');
            for (var a = Game.$board.find(".row:last-child"), l = 0; l < Game.size; l++)
                a.append("<div class='cell' id='cell-" + e + "-" + l + "' col='" + e + "' row='" + l + "'></div>")
        }
    },

    makePlay: function() {
        Game.displayBoard(),
        (Game.isWon() || Game.isDraw()) && (Game.displayOutcome(),
        Game.$board.off("click")),
        Game.turn = "X" === Game.turn ? "O" : "X"
    },

    isWon: function() {
        return Game.columnWin() || Game.rowWin() || Game.diagonalWin()
    },

    isDraw: function() {
        for (var e = !0, a = 0; a < Game.size; a++)
            for (var l = 0; l < Game.size; l++)
                e = e && ("X" === Game.cells[a][l] || "O" === Game.cells[a][l]);
        return e
    },

    displayOutcome: function() {
        Game.isWon() ? $("#outcome h2").text(Game.turn + " won the game!") : Game.isDraw() && $("#outcome h2").text("Draw"),
        $("#outcome").removeClass("hide")
    },

    columnWin: function() {
        for (var e = 0; e < Game.size; e++) {
            for (var a = Game.cells[0][e], l = 1; l < Game.size; l++)
                a = a && Game.cells[0][e] === Game.cells[l][e];
            if (a)
                return console.log("COLUMN WIN"),
                a
        }
        return !1
    },

    rowWin: function() {
        for (var e = 0; e < Game.size; e++) {
            for (var a = Game.cells[e][0], l = 1; l < Game.size; l++)
                a = a && Game.cells[e][0] === Game.cells[e][l];
            if (a)
                return console.log("ROW WIN"),
                a
        }
        return !1
    },

    diagonalWin: function() {
        return Game.leftDiagonalWin() || Game.rightDiagonalWin()
    },

    leftDiagonalWin: function() {
        for (var e = Game.cells[0][0], a = 0; a < Game.size; a++)
            e = e && Game.cells[0][0] === Game.cells[a][a];
        return e ? (console.log("LEFT DIAGONAL WIN"),
        e) : !1
    },

    rightDiagonalWin: function() {
        for (var e = Game.size - 1, a = Game.cells[0][e], l = 0; l < Game.size; l++)
            a = a && Game.cells[0][e] === Game.cells[l][e - l];
        return a ? (console.log("RIGHT DIAGONAL WIN"),
        a) : !1
    }
},



$(function() {

    $("input").keyup(function(e) {
        $("#size-display").text($(e.target).val())
    }),

    $("input[type=submit]").click(function(e) {
        var a = parseInt($("#size-input").val());
        a && (Game.init(a),
        $("#questions").addClass("hide"),
        $(".board").removeClass("hide"))
    }),

    $(".board").on("click", function(e) {
        if ($(e.target).hasClass("cell")) {
            if ($(e.target).text())
                return;
            col = parseInt($(e.target).attr("col")),
            row = parseInt($(e.target).attr("row")),
            Game.nextMove(col, row)
        }
    })

    $('#restart').on("click",function(){
         location.reload();
    })

});
