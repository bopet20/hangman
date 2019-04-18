import Hangman from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.querySelector('#puzzle')
const statusEl = document.querySelector('#status')
const guessedLettersEl = document.querySelector('#guesses')
const customWordEl = document.querySelector('#custom-word')
const gameEl = document.querySelector('#game')
const setupEl = document.querySelector('#setup')
const containerEl = document.querySelector('.container')

let game
let puzzle

window.addEventListener('keypress', (e) => {
    if (game) {
        const guess = String.fromCharCode(e.charCode)
        game.makeGuess(guess)
        render()
    }
})

const generateLetterDOM = (letter) => {
    const letterEl = document.createElement('span')
    letterEl.innerText = letter
    puzzleEl.appendChild(letterEl)
}

const render = () => {
    const { puzzle, incorrectGuesses, statusMessage } = game

    animate('up')
    puzzleEl.innerHTML= ''
    const splitPuzzle = puzzle.split('')
    splitPuzzle.forEach((letter) => {
        generateLetterDOM(letter)
    })
    guessedLettersEl.innerHTML = `&nbsp;${incorrectGuesses.toUpperCase()}`
    statusEl.textContent = statusMessage
}

const randomGame = async () => {
    animate('down')
    puzzle = await getPuzzle('1')
    setupEl.style.display = 'none'
    gameEl.style.display = 'block'
    initGame()
}

const customGame = () => {
    if (customWordEl.value.trim() != '') {
        animate('down')
        puzzle = customWordEl.value
        setTimeout(() => {
            customWordEl.value = ''
            setupEl.style.display = 'none'
            gameEl.style.display = 'block'
            initGame()
        }, 250)
    }
}

const initGame = () => {
    game = new Hangman(puzzle, 7)
    render()
}

const reset = () => {
    animate('down-up')
    setTimeout(() => {
        game = null
        gameEl.style.display = 'none'
        setupEl.style.display = 'flex'
        puzzle = ''
    }, 250)
}

const animate = (direction) => {
    if (direction === 'down-up'){
        containerEl.style.animation = `slide-down-up 1s forwards`
    } else {
        containerEl.style.animation = `slide-${direction} .5s forwards`
    }
}

document.querySelector('#custom').addEventListener('click', customGame)
document.querySelectorAll('#random').forEach((element) => element.addEventListener('click', randomGame))
document.querySelector('#reset').addEventListener('click', reset)

// startGame()