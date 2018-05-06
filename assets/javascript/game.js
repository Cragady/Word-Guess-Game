alert("Press any key to play");

var wins = 0;
var guessed = " ";
var attempts = 10;
var validKeyPress = " ";
var activeWord = " ";
var wordRando = " ";
var answer = [];
var finished = false;
var winCheck;

//there is a fair amount of meta-referencing going on in this code,
//so I tried to follow a good naming convention to cut down on any
//possible confusion

var hangman = {
    words: [
            'hopscotch',
            'solitaire',
            'chess',
            'monopoly',
            'backgammon'
    ],
    
    gameWorks: function(){
        hangman.validKeyPress();
        var userGuess = event.key; 
        userGuess = userGuess.toLowerCase();
        if (finished === undefined) {
            return;
            }
        if (validKeyPress.includes(userGuess)){
            if (guessed.includes(userGuess)){
                return;
            } else if (attempts != 0) {
                if (activeWord.includes(userGuess)){
                    for (var i = 0; i < activeWord.length; i++){
                        if (userGuess === activeWord[i]){
                            var textnode = document.createTextNode(userGuess);
                            var nodeTarget = document.getElementById("active-word").childNodes[i];
                            nodeTarget.replaceChild(textnode, nodeTarget.childNodes[0]);
                            answer[i] = userGuess;
                            winCheck = answer.join("");
                            if (winCheck === activeWord){
                                return finished = true;
                            }
                        }
                    }
                } else {
                    guessed += userGuess;
                    attempts--;
                    hangman.letsGuess();
                }
            }
        }
    },

    gameWin: function() {
        winCheck = answer.join("");
        if (finished === true) {
            wins = wins + 1;
            document.getElementById("wins").innerHTML = wins;
            document.getElementById("game-end").innerHTML = "Press 'Enter' for a new word!";
            hangman.enterToRestart();
            hangman.playJingle();
            return finished = undefined;
        }
    },

    playJingle: function() {
        var audio = document.getElementById("jingle");
        audio.play();
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

    gameRestart: function() {
        if ((attempts === 0) || (finished = true)) {
            var divTarget = document.getElementById("active-word");
            while (divTarget.hasChildNodes()) {
                divTarget.removeChild(divTarget.lastChild);
            }
            attempts = 10;
            guessed = " ";
            answer = [];
            finished = false;
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
        hangman.blankLettersPrint();
        document.onkeyup = function(event){
            hangman.gameWorks();
            hangman.gameWin();
        }
    },
    //the four methods following this comment are used together in the generator
    randomWord: function() {
        wordRando = hangman.words[Math.floor(Math.random() * hangman.words.length)];
    },

    wordMatch: function() {
        activeWord = wordRando;
    },

    randomCheck: function() {
        while (activeWord === wordRando){
            hangman.randomWord();
        }
    },

    blankLettersPrint: function(){
        
        var divTarget = document.getElementById("active-word");
        var tagTarget = document.getElementsByTagName("P");
        for (var i = 0; i < activeWord.length; i++){
            var divLetters = document.createElement("p");
            var textNode = document.createTextNode("_");
            divLetters.className = (i + " p-floats");
            divLetters.appendChild(textNode);
            divTarget.appendChild(divLetters);
            answer[i] = "_";


        }
    }, 
    /*The generator below uses a combination of the above four methods
    (randomWord, wordMatch, randomCheck, blankLettersPrint)
    is supposed to generate a random word that is not the same as the last generated
    word, while avoiding an infinite recursive loop*/
    generator: function() {
        hangman.randomCheck();
        hangman.wordMatch();
        hangman.blankLettersPrint();

    }
}

hangman.keyed();