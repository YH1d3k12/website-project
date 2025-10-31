import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { usePlayerData } from '../../hook/usePlayerData';
import RouletteWheel from './wheel'; // Importar o novo componente
import './styles.css';

// Registrar componentes do ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// --- INTERFACES E TIPOS ---

interface BetHistoryEntry {
    round: number;
    initialBalance: number;
    betAmount: number;
    betOption: string;
    betDetails: number | string | null;
    winningNumber: number;
    winnings: number;
    finalBalance: number;
    outcome: 'win' | 'loss';
}

interface RouletteNumber {
    number: number;
    color: 'green' | 'red' | 'black';
}

// --- MOCK DATA ---

const numbersData: RouletteNumber[] = [
    { number: 0, color: 'green' },
    { number: 32, color: 'red' },
    { number: 15, color: 'black' },
    { number: 19, color: 'red' },
    { number: 4, color: 'black' },
    { number: 21, color: 'red' },
    { number: 2, color: 'black' },
    { number: 25, color: 'red' },
    { number: 17, color: 'black' },
    { number: 34, color: 'red' },
    { number: 6, color: 'black' },
    { number: 27, color: 'red' },
    { number: 13, color: 'black' },
    { number: 36, color: 'red' },
    { number: 11, color: 'black' },
    { number: 30, color: 'red' },
    { number: 8, color: 'black' },
    { number: 23, color: 'red' },
    { number: 10, color: 'black' },
    { number: 5, color: 'red' },
    { number: 24, color: 'black' },
    { number: 16, color: 'red' },
    { number: 33, color: 'black' },
    { number: 1, color: 'red' },
    { number: 20, color: 'black' },
    { number: 14, color: 'red' },
    { number: 31, color: 'black' },
    { number: 9, color: 'red' },
    { number: 22, color: 'black' },
    { number: 18, color: 'red' },
    { number: 29, color: 'black' },
    { number: 7, color: 'red' },
    { number: 28, color: 'black' },
    { number: 12, color: 'red' },
    { number: 35, color: 'black' },
    { number: 3, color: 'red' },
    { number: 26, color: 'black' },
];

const redNumbers = numbersData
    .filter(n => n.color === 'red')
    .map(n => n.number);
const blackNumbers = numbersData
    .filter(n => n.color === 'black')
    .map(n => n.number);

// --- COMPONENTE DE GRÁFICO ---

const ChartComponent: React.FC = () => {
    const [playerData] = usePlayerData();

    const data = {
        labels: Array.from(Array(playerData.balanceHistory.length).keys()).map(
            i => `Rodada ${i}`
        ),
        datasets: [
            {
                label: 'Saldo do Jogador',
                data: playerData.balanceHistory,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Histórico de Saldo do Jogador' },
        },
        scales: {
            x: { title: { display: true, text: 'Rodada' } },
            y: { title: { display: true, text: 'Saldo' }, beginAtZero: true },
        },
    };

    return (
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
    );
};

// --- COMPONENTE PRINCIPAL (Roleta Refatorada) ---

const RouletteGame: React.FC = () => {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [betAmount, setBetAmount] = useState<number>(0);
    const [betOption, setBetOption] = useState<string>('number');
    const [betDetails, setBetDetails] = useState<number | string | null>(null);
    const [betType, setBetType] = useState<'fixed' | 'proportional'>('fixed');
    const [gameMode, setGameMode] = useState<'fair' | 'biased'>('fair');
    const [houseEdge, setHouseEdge] = useState<number>(0);
    const [gameHistory, setGameHistory] = useState<BetHistoryEntry[]>([]);

    const [playerData, setPlayerData] = usePlayerData();

    useEffect(() => {
        if (playerData.playerBalance <= 0 && !playerData.gameOver) {
            setTimeout(
                () => alert('Game Over! Você perdeu todo o seu capital.'),
                10
            );
            setPlayerData(prev => ({ ...prev, gameOver: true }));
        } else if (playerData.casinoBalance <= 0 && !playerData.gameOver) {
            setTimeout(
                () => alert('Parabéns! Você levou o cassino à ruína!'),
                10
            );
            setPlayerData(prev => ({ ...prev, gameOver: true }));
        }
    }, [
        playerData.playerBalance,
        playerData.casinoBalance,
        playerData.gameOver,
        setPlayerData,
    ]);

    const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setBetAmount(value);
        }
    };

    const resetGame = () => {
        setPlayerData(prev => ({
            ...prev,
            playerBalance: 100, // Valor inicial
            casinoBalance: 10000, // Valor inicial
            balanceHistory: [100],
            gameOver: false,
        }));
        setGameHistory([]);
        setSelectedNumber(null);
    };

    const placeBet = () => {
        if (playerData.gameOver) {
            alert('O jogo acabou. Por favor, reinicie para jogar novamente.');
            return;
        }
        if (betDetails === null || betDetails === '') {
            alert('Escolha uma opção de aposta válida.');
            return;
        }

        let currentBet = betAmount;

        if (betType === 'proportional') {
            currentBet = playerData.playerBalance * (betAmount / 100);
        }

        if (currentBet <= 0 || currentBet > playerData.playerBalance) {
            alert(
                'Aposta inválida. Saldo insuficiente ou valor de aposta inválido.'
            );
            return;
        }

        const initialPlayerBalance = playerData.playerBalance;
        setPlayerData(prev => ({
            ...prev,
            playerBalance: prev.playerBalance - currentBet,
        }));
        spinWheel(currentBet, initialPlayerBalance);
    };

    const spinWheel = (currentBet: number, initialPlayerBalance: number) => {
        setIsSpinning(true);
        setSelectedNumber(null); // Limpa o número anterior antes de girar

        setTimeout(() => {
            let winningNumber: number;

            if (gameMode === 'biased') {
                const playerLosingNumbers = numbersData
                    .filter(n => {
                        if (betOption === 'number')
                            return n.number !== betDetails;
                        if (betOption === 'color') {
                            if (betDetails === 'red') return n.color !== 'red';
                            if (betDetails === 'black')
                                return n.color !== 'black';
                        }
                        return true;
                    })
                    .map(n => n.number);

                const shouldWin = Math.random() > houseEdge;
                if (shouldWin) {
                    const playerWinningNumbers = numbersData
                        .filter(n => !playerLosingNumbers.includes(n.number))
                        .map(n => n.number);
                    winningNumber =
                        playerWinningNumbers[
                            Math.floor(
                                Math.random() * playerWinningNumbers.length
                            )
                        ];
                } else {
                    winningNumber =
                        playerLosingNumbers[
                            Math.floor(
                                Math.random() * playerLosingNumbers.length
                            )
                        ];
                }
            } else {
                winningNumber = Math.floor(Math.random() * 37);
            }

            // O tempo de giro da roleta é de 5 segundos (definido no CSS)
            setTimeout(() => {
                setSelectedNumber(winningNumber);

                let winnings = 0;
                let outcome: 'win' | 'loss' = 'loss';

                if (betOption === 'number' && winningNumber === betDetails) {
                    winnings = currentBet * 35;
                    outcome = 'win';
                } else if (betOption === 'color') {
                    if (
                        betDetails === 'red' &&
                        redNumbers.includes(winningNumber)
                    ) {
                        winnings = currentBet * 2;
                        outcome = 'win';
                    } else if (
                        betDetails === 'black' &&
                        blackNumbers.includes(winningNumber)
                    ) {
                        winnings = currentBet * 2;
                        outcome = 'win';
                    }
                }

                const finalBalance =
                    initialPlayerBalance - currentBet + winnings;

                setPlayerData(prev => ({
                    ...prev,
                    playerBalance: prev.playerBalance + winnings,
                    casinoBalance: prev.casinoBalance - winnings,
                    balanceHistory: [...prev.balanceHistory, finalBalance],
                }));

                const historyEntry: BetHistoryEntry = {
                    round: gameHistory.length + 1,
                    initialBalance: initialPlayerBalance,
                    betAmount: currentBet,
                    betOption,
                    betDetails,
                    winningNumber,
                    winnings,
                    finalBalance,
                    outcome,
                };

                setGameHistory(prev => [...prev, historyEntry]);
                setIsSpinning(false);
            }, 5000); // Espera 5 segundos para a roleta parar
        }, 10); // Pequeno delay para iniciar o giro
    };

    return (
        <div className="roulette-game">
            <h2>Roleta</h2>
            <div className="game-info">
                <p>Saldo do Jogador: ${playerData.playerBalance.toFixed(2)}</p>
                <p>Saldo do Cassino: ${playerData.casinoBalance.toFixed(2)}</p>
            </div>

            {playerData.gameOver && (
                <div className="game-over-message">
                    <h3>Fim de Jogo!</h3>
                    <button onClick={resetGame}>Reiniciar Jogo</button>
                </div>
            )}

            {!playerData.gameOver && (
                <div className="betting-controls">
                    <div>
                        <label>Tipo de Aposta:</label>
                        <select
                            value={betType}
                            onChange={e =>
                                setBetType(
                                    e.target.value as 'fixed' | 'proportional'
                                )
                            }
                        >
                            <option value="fixed">Valor Fixo</option>
                            <option value="proportional">
                                Proporcional ao Saldo (%)
                            </option>
                        </select>
                    </div>
                    <div>
                        <label>Valor da Aposta:</label>
                        <input
                            type="number"
                            value={betAmount}
                            onChange={handleBetAmountChange}
                            min="0"
                            step="1"
                        />
                    </div>
                    <div>
                        <label>Opção de Aposta:</label>
                        <select
                            value={betOption}
                            onChange={e => setBetOption(e.target.value)}
                        >
                            <option value="number">Número Específico</option>
                            <option value="color">Cor</option>
                        </select>
                    </div>
                    {betOption === 'number' && (
                        <div>
                            <label>Número (0-36):</label>
                            <input
                                type="number"
                                onChange={e =>
                                    setBetDetails(parseInt(e.target.value, 10))
                                }
                                min="0"
                                max="36"
                            />
                        </div>
                    )}
                    {betOption === 'color' && (
                        <div>
                            <label>Cor:</label>
                            <select
                                onChange={e => setBetDetails(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="red">Vermelho</option>
                                <option value="black">Preto</option>
                            </select>
                        </div>
                    )}
                    <button onClick={placeBet} disabled={isSpinning}>
                        {isSpinning ? 'Girando...' : 'Apostar e Girar'}
                    </button>
                </div>
            )}

            {/* Roleta Visual - Posicionada entre a área de aposta e a área de resultado */}
            <RouletteWheel
                isSpinning={isSpinning}
                winningNumber={selectedNumber}
                numbersData={numbersData}
            />

            {selectedNumber !== null && !isSpinning && (
                <div className="result">
                    <h3>
                        O número sorteado foi:{' '}
                        <span
                            style={{
                                color: numbersData.find(
                                    n => n.number === selectedNumber
                                )?.color,
                            }}
                        >
                            {selectedNumber}
                        </span>
                    </h3>
                </div>
            )}

            <div className="game-settings">
                <h4>Configurações do Jogo</h4>
                <div>
                    <label>Modo de Jogo:</label>
                    <select
                        value={gameMode}
                        onChange={e =>
                            setGameMode(e.target.value as 'fair' | 'biased')
                        }
                    >
                        <option value="fair">Justo</option>
                        <option value="biased">Viciado (Casa)</option>
                    </select>
                </div>
                {gameMode === 'biased' && (
                    <div>
                        <label>Vantagem da Casa (%):</label>
                        <input
                            type="number"
                            value={houseEdge * 100}
                            onChange={e =>
                                setHouseEdge(parseFloat(e.target.value) / 100)
                            }
                            min="0"
                            max="100"
                        />
                    </div>
                )}
            </div>

            <ChartComponent />

            <div className="history-log">
                <h3>Histórico de Rodadas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Rodada</th>
                            <th>Saldo Inicial</th>
                            <th>Aposta</th>
                            <th>Opção</th>
                            <th>Número Sorteado</th>
                            <th>Ganhos</th>
                            <th>Resultado</th>
                            <th>Saldo Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameHistory.map(entry => (
                            <tr key={entry.round}>
                                <td>{entry.round}</td>
                                <td>${entry.initialBalance.toFixed(2)}</td>
                                <td>${entry.betAmount.toFixed(2)}</td>
                                <td>{`${entry.betOption}: ${entry.betDetails}`}</td>
                                <td>{entry.winningNumber}</td>
                                <td>${entry.winnings.toFixed(2)}</td>
                                <td
                                    style={{
                                        color:
                                            entry.outcome === 'win'
                                                ? 'green'
                                                : 'red',
                                    }}
                                >
                                    {entry.outcome}
                                </td>
                                <td>${entry.finalBalance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RouletteGame;
