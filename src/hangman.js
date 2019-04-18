class Hangman {
    constructor(word, guesses) {
        this.word = word.toLowerCase().split('');
        this.guesses = guesses;
        this.guessedLetters = [];
        this.status = 'playing';
    }
    makeGuess(letter) {
        if (this.status === 'playing') {
            letter = letter.toLowerCase();
            if (!this.guessedLetters.includes(letter)) {
                this.guessedLetters = [...this.guessedLetters, letter];
                if (!this.word.includes(letter)) {
                    this.guesses--;
                }
            }
        }
        this.checkStatus();
    }
    checkStatus() {
        if (this.guesses === 0) {
            this.status = 'failed';
        }
        else {
            const winner = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ');
            if (winner) {
                this.status = 'finished';
            }
            else {
                this.status = 'playing';
            }
        }
    }
    get puzzle() {
        let puzzle = '';
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter;
            }
            else {
                puzzle += ' ';
            }
        });
        return puzzle;
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Remaining guesses: ${this.guesses}`;
        }
        else if (this.status === 'failed') {
            return `Nice try! The word was ${this.word.join('')}`;
        }
        else {
            return `Good job! You got it.`;
        }
    }
    get incorrectGuesses() {
        return `${this.guessedLetters.filter((letter) => !this.word.includes(letter)).join(' ')}`
    }
}

export { Hangman as default }