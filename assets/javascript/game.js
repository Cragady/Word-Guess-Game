alert("Press any key to play");

var wins = 0;
var guessed = " ";
var attempts = 10;
var validKeyPress = " ";
var activeWord = " ";
var wordRando = " ";
// var wordList = hangman.words[Math.floor(Math.random() * hangman.words.length)];
//function yesGuess() {if (userGuess === indexOf)};





var hangman = {
    // words: {
    //     hopscotch: 'h o p s c o t c h',
    //     solitaire: 's o l i t a i r e',
    //     chess: 'c h e s s',
    //     monopoly: 'm o n o p o l y',
    //     backgammon: 'b a c k g a m m o n'
    // },
    words: [
            'hopscotch',
            'solitaire',
            'chess',
            'monopoly',
            'backgammon'
    ],
    //hangman.words.hopscotch.includes('0'); //returns true
    // .split() converts item to array
    gameWorks: function(){
        hangman.validKeyPress();
        var userGuess = event.key; 
        userGuess = userGuess.toLowerCase();
        if (validKeyPress.includes(userGuess)){
            if (guessed.includes(userGuess)){
                return;
            } else if (attempts != 0) {
                if (activeWord.includes(userGuess)){
                    for (var i = 0; i < activeWord.length; i++){
                        if (userGuess === activeWord[i]){
                            console.log(userGuess);
                        }
                    }
                    // if (/*word is spelled out*/){
                    //     wins = wins + 1;
                    //     document.getElementById("wins").innerHTML = wins;
                    //     hangman.enterToRestart();
                    // }
                } else {
                    guessed += userGuess;
                    attempts--;
                    hangman.letsGuess();
                }
            }
        }
    },

    letsGuess: function() {
        if (attempts === 0) {
            document.getElementById("guesses-left").innerHTML = attempts;
            document.getElementById("gletters").innerHTML = guessed;
            document.getElementById("game-end").innerHTML = "Press 'Enter' for a new word!";
            hangman.enterToRestart();
            
        } else {
            document.getElementById("guesses-left").innerHTML = attempts;
            document.getElementById("gletters").innerHTML = guessed;
        }
    },

    enterToRestart: function(){
        document.addEventListener('keypress', function(e){
            var key = e.which || e.keyCode;
            if (key === 13){
                hangman.gameRestart();
            }
        })
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
            hangman.generator();
        }
    },
    //this sets validKeyPress to all alphabetic characters
    validKeyPress: function() {
        var first = "a", last = "z";
        for (var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
            validKeyPress += String.fromCharCode(i);
        }
    },
    //the keyed method is called below the object to start the entire game
    keyed: function() {
        hangman.randomWord();
        hangman.wordMatch();
        document.onkeyup = function(event){
            hangman.gameWorks();
        }
    },
    //the three methods following this comment are used together in the generator
    randomWord: function() {
        return wordRando = hangman.words[Math.floor(Math.random() * hangman.words.length)];
    },

    wordMatch: function() {
        return activeWord = wordRando;
    },

    randomCheck: function() {
        while (activeWord === wordRando){
            hangman.randomWord();
        }
    },
    /*The generator below uses a combination of the above three methods
    (randomWord, wordMatch, randomCheck)
    to generate a random word that is not the same as the last generated
    word, while avoiding an infinite recursive loop*/
    generator: function() {
        hangman.randomCheck();
        hangman.wordMatch();
    }
}

hangman.keyed();

/* for (var i = 0; i < answerArray.length; i++;{
anserArray [i] = "_";
}*/