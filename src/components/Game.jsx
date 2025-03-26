import { useEffect, useState } from "react";
import Square from "./Square";
import { toast } from "react-toastify";

const initialGameState = ["", "", "", "", "", "", "", "", ""];
const initialScores = { X: 0, O: 0 };
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function Game() {
    const [gameState, setGameState] = useState(initialGameState);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [scores, setScores] = useState(initialScores);

    useEffect(() => {
        const storedScores = localStorage.getItem("scores");
        if (storedScores) {
            setScores(JSON.parse(storedScores));
        }
    }, []);

    useEffect(() => {
        if(gameState === initialGameState){
            return;
        }
        checkForWinner()
    }, [gameState]);

    const resetBoard = () => {
        setGameState(initialGameState);
    }

    const handleWin = () => {
        toast(`🎉Congratulation Player ${currentPlayer} Win!!!👏🏼`, {
            position: "top-center",
            draggable: true,
            draggableDirection: "x",
        });
        const newPlayerScore = scores[currentPlayer] + 1;
        const newScores = { ...scores };
        newScores[currentPlayer] = newPlayerScore;
        setScores(newScores);
        localStorage.setItem("scores", JSON.stringify(newScores))
        resetBoard();
    }

    const handleDraw = () => {
        toast(`The Game Was draw.`, {
            position: "top-center",
            draggable: true,
            draggableDirection: "x",
        });
        resetBoard();
    }

    const checkForWinner = () => {
        for (let i = 0; i < winningCombos.length; i++) {
            const winCombo = winningCombos[i];

            let a = gameState[winCombo[0]]
            let b = gameState[winCombo[1]]
            let c = gameState[winCombo[2]]

            if ([a, b, c].includes("")) {
                continue;
            };

            if (a === b && b === c) {
                setTimeout(() => handleWin(), 500);
                return;
            }

            if (!gameState.includes("")) {
                setTimeout(() => handleDraw(), 500);
                return;
            }
        }
        changePlayer();
    };

    const changePlayer = () => {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    const handleBoxClick = (e) => {
        const boxIndex = Number(e.target.getAttribute("data-box-index"));
        const currentValue = gameState[boxIndex];
        if (currentValue) {
            return
        };
        const newValue = [...gameState];
        newValue[boxIndex] = currentPlayer;
        setGameState(newValue)
    }

    return (
        <>
            <div>
                <div className="mt-0 mb-2">
                    <h1 className="lobster-text leading-0.5 bg-gradient-to-l from-cyan-400 to-pink-500 bg-clip-text text-transparent">Tic Tac Toe - by Authoi</h1>
                </div>
                <div className="w-full flex justify-center items-center mb-3 mt-0 pt-0">
                    <div>
                        <h1 className="text-xl leading-0.5 flex justify-center items-center player-text "> <span className="text-green-400">X</span> : {scores.X} <span className="divider divider-horizontal divider-info"></span> <span className="text-cyan-400">O</span> : {scores.O} </h1>
                        <h1 className="text-xl mt-1">Now Turn : <span className={`font-bold ${currentPlayer === "X" ? "text-green-400" : "text-cyan-400"}`}>{currentPlayer}</span></h1>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-2 mx-auto ">
                        {gameState.map((player, index) =>
                            <Square onClick={handleBoxClick} key={index} {...{ player, index }} />
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button style={{ backgroundColor: "#05DF72" }} onClick={() => setGameState(initialGameState)} className="text-white btn border-0 mx-2 outline-0 mt-4">Clear Board</button>
                    <button style={{ backgroundColor: "#00D3F3" }} onClick={() => {localStorage.clear(); setScores(initialScores)}} className="text-white mx-2 btn border-0 outline-0 mt-4">Clear Win History</button>
                </div>
            </div >
        </>
    )
}

export default Game
