import "./scoreBoard.css";


export default function ScoreBoard() {
    return (
        <div className="score-board">
            <div className="score-board-container">
                <div className="score-board-first-place">
                    <h2>Maior Prêmio Obtido!</h2>
                    <p>R$: 10.000.000,00</p>
                </div>
                <div className="score-board-table">
                    <div className="score-board-montly-best">
                        
                    </div>
                    <div className="score-board-weekly-best">

                    </div>
                </div>
            </div>
        </div>
    );
};