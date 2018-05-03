alert("Press any key to play");

var wins = 1;
var guessed = " ";
var attempts = 10;
var validKeyPress = " ";
//function yesGuess() {if (userGuess === indexOf)};





var hangman = {
    words: {
        hopscotch: 'hopscotch',
        solitaire: 'hopscotch',
        chess: 'chess',
        monopoly: 'monopoly',
        backgammon: 'backgammon'
    },
    //hangman.words.hopscotch.includes('0'); //returns true
    gameWorks: function(){
        hangman.validKeyPress();
        var userGuess = event.key;
        if (validKeyPress.includes(userGuess)){
            if (guessed.includes(userGuess)){
                return;
            } else if (attempts != 0) {
                guessed += event.key;
                attempts--;
                hangman.letsGuess();
            }
        }
    },

    letsGuess: function() {
        if (attempts === 0) {
            document.getElementById("guesses-left").innerHTML = attempts;
            document.getElementById("gletters").innerHTML = guessed;
            document.getElementById("game-end").innerHTML = "Press 'Enter' for a new word!";
            document.addEventListener('keypress', function(e){
                var key = e.which || e.keyCode;
                if (key === 13){
                    hangman.gameRestart();
                }
            })
            
        } else {
            document.getElementById("guesses-left").innerHTML = attempts;
            document.getElementById("gletters").innerHTML = guessed;
        }
    },

    // scoreWatcher: function() {
    //     document.addEventListener(attempts === 0, function(){
    //         hangman.gameRestart;
    //     });
    // },

    gameRestart: function() {
        if (attempts === 0) {
            attempts = 10;
            guessed = " ";
            document.getElementById("game-end").innerHTML = " ";
            hangman.letsGuess();
        }
    },

    validKeyPress: function() {
        var first = "a", last = "z";
        for (var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
            validKeyPress += String.fromCharCode(i);
        }
    },

    keyed: function() {
        document.onkeyup = function(event){
            hangman.gameWorks();
        }
    }
}

hangman.keyed();
