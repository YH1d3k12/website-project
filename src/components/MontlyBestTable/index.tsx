import './styles.css'

interface Entry {
    rank: number;
    score: string;
}

interface MonthlyBestTableProps {
    data: Entry[];
}

export default function MonthlyBestTable({ data }: MonthlyBestTableProps) {
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
