import "./styles.css";

interface Entry {
    rank: number;
    score: string;
}

interface MonthlyBestTableProps {
    data: Entry[];
}

interface WeeklyBestTableProps {
    data: Entry[];
}

export function WeeklyBestTable({ data }: WeeklyBestTableProps) {
    return (
        <div className="score-board-weekly-best">
            <h3>Melhores da Semana</h3>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Prêmio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry.rank}>
                            <td>{entry.rank}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function MonthlyBestTable({ data }: MonthlyBestTableProps) {
    return (
        <div className="score-board-montly-best">
            <h3>Melhores do Mês</h3>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Prêmio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry.rank}>
                            <td>{entry.rank}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function ScoreBoard() {
    const monthlyBest: Entry[] = [
        { rank: 1, score: "R$ 5.000.000,00" },
        { rank: 2, score: "R$ 3.000.000,00" },
        { rank: 3, score: "R$ 2.000.000,00" },
        { rank: 4, score: "R$ 1.000.000,00" },
        { rank: 5, score: "R$ 500.000,00" }
    ];

    const weeklyBest: Entry[] = [
        { rank: 1, score: "R$ 500.000,00" },
        { rank: 2, score: "R$ 300.000,00" },
        { rank: 3, score: "R$ 200.000,00" },
        { rank: 4, score: "R$ 100.000,00" },
        { rank: 5, score: "R$ 50.000,00" }
    ];

    return (
        <div className="score-board">
            <div className="score-board-first-place">
                <h2>Maior Prêmio Obtido!</h2>
                <p>R$: 10.000.000,00</p>
            </div>
            <div className="score-board-tables">
                <MonthlyBestTable data={monthlyBest} />
                <WeeklyBestTable data={weeklyBest} />
            </div>
        </div>
    );
}
