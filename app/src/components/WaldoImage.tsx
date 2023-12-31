import ClickArea from './ClickArea'
import { gameStatus, guessType, setGuessType, setMouseType, waldoSetterType, waldoType } from './util/util_types'

function WaldoImage({ waldo, gameStatus, setGameStatus, guesses, setGuesses, setMousePos }: { waldo: waldoType, gameStatus: gameStatus, setGameStatus: waldoSetterType, guesses: guessType, setGuesses: setGuessType, setMousePos: setMouseType }) {

    return (
        <div className="flex items-center justify-center w-10/12 relative">
            <img src={require(`../assets/${waldo.image_name}`)} alt="waldo"></img>
            <ClickArea waldo_box={waldo.waldo_box} gameStatus={gameStatus} setGameStatus={setGameStatus} guesses={guesses} setGuesses={setGuesses} setMousePos={setMousePos} />
        </div>
    )
}

export default WaldoImage
