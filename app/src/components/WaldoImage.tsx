import ClickArea from './ClickArea'
import { gameStatus, guessType, setGuessType, waldoSetterType, waldoType } from './util/util_types'

function WaldoImage({ waldo, gameStatus, setGameStatus, guesses, setGuesses }: { waldo: waldoType, gameStatus: gameStatus, setGameStatus: waldoSetterType, guesses: guessType, setGuesses: setGuessType }) {

    return (
        <div className="flex items-center justify-center w-10/12 relative">
            <img src={require(`../assets/${waldo.image_name}`)} alt="waldo"></img>
            <ClickArea className="absolute top-0 left-0 w-full h-full" waldo_box={waldo.waldo_box} gameStatus={gameStatus} setGameStatus={setGameStatus} guesses={guesses} setGuesses={setGuesses}/>
        </div>
    )
}

export default WaldoImage
