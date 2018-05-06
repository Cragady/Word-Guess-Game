#### Hangman Game Overview

The purpose of this project was to create a working word guessing game using JavaScript, showing enough understanding of JavaScript to get multiple functions working together to create a functional game. 

The user is supposed to type any letter they believe is in the word, and the letter shows up in it's correct spot. If the user guesses the word, the win counter goes up by one and a short jingle plays. The current attempt is stopped if the user guesses the word correctly or runs out of allotted guesses.

#### Starting Your Own Word Game

Pseudocoding in small chunks and then programming those chunks is key for approaching any project. If you try to solve everything at once, the process becomes a lot longer and intimidating. 

#### How It Works

Everything is stored in an object, and the game is called right after the object using the `hangman.keyed()` method. When keyed() is called, a rondom word is chosen from the `hangman.words` array and empty spaces are displayed for how many letters are in that word.

* `blankLettersPrint` is responsible for printing the blank spaces to the document. It reads the variable `activeWord` that was set by the word generator and runs a for loop that sets the answer array all to "_" for the length of the activeWord. 

* in `keyed`, `gameWorks` and `gameWin` are referenced under an `onkeyup` function that checks if the letters are correct or if the word has been guessed on each key up event.

* `enterToRestart` makes it so that the enter key is able to be pressed bypassing the `validKeyPress` method. The `gameRestart` is nested in the enterToRestart method, gameRestart checks to make sure that either attempts are at 0 or that the word has been guessed.

* `gameWorks` is set with two if statements, the first if statement stops the entire code if the game has been finished, the second if statement makes sure that each keypress is a letter, so that numbers or symbol keys aren't registered.
    * The if else statement stops the code on the keyup if the user guesses a letter they have already guessed that has an else that sets the attempts down by one, and adds a guessed letter in the userGuess variable
    * The if statement following the previous if else statement checks to make sure that the user still has attempts and has a child if else statement that runs a for loop that sets a correct guess in it's corresponding position. 
    * If the word has been spelled out, `finished` is set to true. Initiating a prompt to hit enter to restart.
