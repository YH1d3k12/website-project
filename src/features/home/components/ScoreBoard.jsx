import MonthlyBestTable from "./MontlyBestTable";
import WeeklyBestTable from "./WeeklyBestTable";
import "./scoreBoard.css";

export default function ScoreBoard() {
    // Dados de exemplo
    const monthlyBest = [
        { rank: 1, score: "R$ 5.000.000,00" },
        { rank: 2, score: "R$ 3.000.000,00" },
        { rank: 3, score: "R$ 2.000.000,00" },
        { rank: 4, score: "R$ 1.000.000,00" },
        { rank: 5, score: "R$ 500.000,00" }
    ];

    const weeklyBest = [
        { rank: 1, score: "R$ 500.000,00" },
        { rank: 2, score: "R$ 300.000,00" },
        { rank: 3, score: "R$ 200.000,00" },
        { rank: 4, score: "R$ 100.000,00" },
        { rank: 5, score: "R$ 50.000,00" }
    ];

    return (
        <div className="score-board">
            <div className="score-board-container">
                <div className="score-board-first-place">
                    <h2>Maior Prêmio Obtido!</h2>
                    <p>R$: 10.000.000,00</p>
                </div>
                <div className="score-board-tables">
                    <MonthlyBestTable data={monthlyBest} />
                    <WeeklyBestTable data={weeklyBest} />
                </div>
            </div>
        </div>
    );
}
