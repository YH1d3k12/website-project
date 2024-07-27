export default function WeeklyBestTable({ data }) {
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