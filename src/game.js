import Hangman from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.querySelector('#puzzle')
const statusEl = document.querySelector('#status')
const guessedLettersEl = document.querySelector('#guesses')
let game

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game.makeGuess(guess)
    render()
})

const generateLetterDOM = (letter) => {
    const letterEl = document.createElement('span')
    letterEl.innerText = letter
    puzzleEl.appendChild(letterEl)
}

const render = () => {
    const { puzzle, guessedLettersList, statusMessage } = game

    puzzleEl.innerHTML= ''
    const splitPuzzle = puzzle.split('')
    splitPuzzle.forEach((letter) => {
        generateLetterDOM(letter)
    })
    guessedLettersEl.innerHTML = `&nbsp;${guessedLettersList.toUpperCase()}`
    statusEl.textContent = statusMessage
}

const startGame = async () => {
    statusEl.textContent = 'Loading...'
    const puzzle = await getPuzzle('1')
    game = new Hangman(puzzle, 7)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()