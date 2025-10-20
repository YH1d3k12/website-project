
import React, { useState, useEffect } from 'react';
import './styles.css';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const numbers2: RouletteNumber[] = [
  { number: 0, color: "green" }, { number: 32, color: "red" }, { number: 15, color: "black" },
  { number: 19, color: "red" }, { number: 4, color: "black" }, { number: 21, color: "red" },
  { number: 2, color: "black" }, { number: 25, color: "red" }, { number: 17, color: "black" },
  { number: 34, color: "red" }, { number: 6, color: "black" }, { number: 27, color: "red" },
  { number: 13, color: "black" }, { number: 36, color: "red" }, { number: 11, color: "black" },
  { number: 30, color: "red" }, { number: 8, color: "black" }, { number: 23, color: "red" },
  { number: 10, color: "black" }, { number: 5, color: "red" }, { number: 24, color: "black" },
  { number: 16, color: "red" }, { number: 33, color: "black" }, { number: 1, color: "red" },
  { number: 20, color: "black" }, { number: 14, color: "red" }, { number: 31, color: "black" },
  { number: 9, color: "red" }, { number: 22, color: "black" }, { number: 18, color: "red" },
  { number: 29, color: "black" }, { number: 7, color: "red" }, { number: 28, color: "black" },
  { number: 12, color: "red" }, { number: 35, color: "black" }, { number: 3, color: "red" },
  { number: 26, color: "black" },
];

const redNumbers = numbers2.filter(n => n.color === 'red').map(n => n.number);
const blackNumbers = numbers2.filter(n => n.color === 'black').map(n => n.number);

const RouletteWheel: React.FC = () => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [initialPlayerCapital, setInitialPlayerCapital] = useState<number>(100);
  const [playerBalance, setPlayerBalance] = useState<number>(100);
  const [casinoBalance, setCasinoBalance] = useState<number>(10000);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [betOption, setBetOption] = useState<string>('number');
  const [betDetails, setBetDetails] = useState<number | string | null>(null);
  const [betType, setBetType] = useState<'fixed' | 'proportional'>('fixed');
  const [balanceHistory, setBalanceHistory] = useState<number[]>([100]);
  const [gameHistory, setGameHistory] = useState<BetHistoryEntry[]>([]);
  const [gameMode, setGameMode] = useState<'fair' | 'biased'>('fair'); // 'fair' or 'biased'
  const [houseEdge, setHouseEdge] = useState<number>(0); // House edge percentage
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (playerBalance <= 0) {
      alert('Game Over! Você perdeu todo o seu capital.');
      setGameOver(true);
    } else if (casinoBalance <= 0) {
      alert('Parabéns! Você levou o cassino à ruína!');
      setGameOver(true);
    }
  }, [playerBalance, casinoBalance]);

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setBetAmount(value);
    }
  };

  const placeBet = () => {
    if (gameOver) {
      alert('O jogo acabou. Por favor, reinicie para jogar novamente.');
      return;
    }
    if (betDetails === null || betDetails === '') {
      alert('Escolha uma opção de aposta válida.');
      return;
    }

    let currentBet = betAmount;
    
    if (betType === 'proportional') {
      currentBet = playerBalance * (betAmount / 100);
    }

    if (currentBet <= 0 || currentBet > playerBalance) {
      alert('Aposta inválida. Certifique-se de inserir um valor de aposta válido e que você tenha saldo suficiente.');
      return;
    }

    setPlayerBalance(prevBalance => prevBalance - currentBet);
    spinWheel(currentBet);
  };

  const spinWheel = (currentBet: number) => {
    setIsSpinning(true);
    const initialPlayerBalance = playerBalance;

    setTimeout(() => {
      let winningNumber: number;
      if (gameMode === 'fair') {
        winningNumber = numbers2[Math.floor(Math.random() * numbers2.length)].number;
      } else {
        // Biased mode: incorporate house edge
        // For simplicity, we'll make 0 (green) more likely to hit based on houseEdge
        // A more accurate simulation would adjust probabilities for all numbers
        const biasedNumbers = [...numbers2];
        // Increase the probability of 0 proportional to the house edge
        const zeroProbabilityIncrease = Math.floor(houseEdge * 2); // Adjust multiplier as needed
        for (let i = 0; i < zeroProbabilityIncrease; i++) {
          biasedNumbers.push({ number: 0, color: 'green' });
        }
        winningNumber = biasedNumbers[Math.floor(Math.random() * biasedNumbers.length)].number;
      }
      
      setSelectedNumber(winningNumber);
      setIsSpinning(false);

      setTimeout(() => {
        let winnings = 0;
        let outcome: 'win' | 'loss' = 'loss';

        if (betOption === 'number' && betDetails === winningNumber) {
          winnings = currentBet * 35;
        } else if (betOption === 'redBlack') {
          if (betDetails === 'red' && redNumbers.includes(winningNumber)) {
            winnings = currentBet * 2;
          } else if (betDetails === 'black' && blackNumbers.includes(winningNumber)) {
            winnings = currentBet * 2;
          }
        } else if (betOption === 'evenOdd') {
          if (betDetails === 'even' && winningNumber % 2 === 0 && winningNumber !== 0) {
            winnings = currentBet * 2;
          } else if (betDetails === 'odd' && winningNumber % 2 !== 0 && winningNumber !== 0) {
            winnings = currentBet * 2;
          }
        } else if (betOption === 'lowHigh') {
          if (betDetails === 'low' && winningNumber >= 1 && winningNumber <= 18) {
            winnings = currentBet * 2;
          } else if (betDetails === 'high' && winningNumber >= 19 && winningNumber <= 36) {
            winnings = currentBet * 2;
          }
        } else if (betOption === 'dozen') {
          if (betDetails === 'dozen1' && winningNumber >= 1 && winningNumber <= 12) {
            winnings = currentBet * 3;
          } else if (betDetails === 'dozen2' && winningNumber >= 13 && winningNumber <= 24) {
            winnings = currentBet * 3;
          } else if (betDetails === 'dozen3' && winningNumber >= 25 && winningNumber <= 36) {
            winnings = currentBet * 3;
          }
        }

        let newPlayerBalance = playerBalance + winnings;
        let newCasinoBalance = casinoBalance;

        if (winnings > 0) {
          outcome = 'win';
          newCasinoBalance -= winnings;
          alert(`Parabéns! Você ganhou ${winnings}!`);
        } else {
          newCasinoBalance += currentBet;
          alert('Você perdeu esta rodada. Mais sorte na próxima!');
        }

        setPlayerBalance(newPlayerBalance);
        setCasinoBalance(newCasinoBalance);
        setBalanceHistory(prevHistory => [...prevHistory, newPlayerBalance]);
        setGameHistory(prevHistory => [...prevHistory, {
          round: prevHistory.length + 1,
          initialBalance: initialPlayerBalance,
          betAmount: currentBet,
          betOption,
          betDetails,
          winningNumber,
          winnings,
          finalBalance: newPlayerBalance,
          outcome,
        }]);

      }, 700);
    }, 1500);
  };

  const ChartComponent: React.FC<{ history: number[] }> = ({ history }) => {
    const data = {
      labels: Array.from(Array(history.length).keys()).map(i => `Rodada ${i + 1}`),
      datasets: [
        {
          label: 'Saldo do Jogador',
          data: history,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          fill: true,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Histórico de Saldo do Jogador',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Rodada',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Saldo',
          },
          beginAtZero: true,
        },
      },
    };

    return <Line data={data} options={options} />;
  };

  return (
    <div className="roulette-container">
      <div className="betting-panel-container">
        <div className="game-controls">
          <h2>Controles do Jogo</h2>
          <div>
            <label>Modo de Jogo: </label>
            <select onChange={(e) => {
              setGameMode(e.target.value as 'fair' | 'biased');
              if (e.target.value === 'fair') {
                setHouseEdge(0); // No house edge in fair mode
              } else {
                setHouseEdge(2.7); // Default house edge for European roulette
              }
            }} value={gameMode} disabled={isSpinning || playerBalance !== initialPlayerCapital}>
              <option value="fair">Justo (Fair)</option>
              <option value="biased">Enviesado (House Edge)</option>
            </select>
          </div>
          <div>
            <label>Tipo de Aposta: </label>
            <select onChange={(e) => setBetType(e.target.value as 'fixed' | 'proportional')} value={betType} disabled={isSpinning}>
              <option value="fixed">Valor Fixo</option>
              <option value="proportional">Proporcional (%)</option>
            </select>
          </div>
          {gameMode === 'biased' && (
            <div className="educational-message">
              <p>No modo enviesado, a casa tem uma vantagem, aumentando a probabilidade de você perder a longo prazo. Isso é conhecido como "House Edge" (vantagem da casa).</p>
              <p>A vantagem da casa na roleta europeia é de aproximadamente 2.7% (devido ao único zero).</p>
            </div>
          )}
          {gameMode === 'fair' && (
            <p className="educational-message">No modo justo, não há vantagem para a casa, e as probabilidades de ganho são puramente matemáticas.</p>
          )}
          <div>
            <label>Vantagem da Casa (%): </label>
            <input
              type="number"
              value={houseEdge}
              onChange={(e) => setHouseEdge(parseFloat(e.target.value) || 0)}
              min="0"
              max="100"
              disabled={isSpinning || gameMode === 'fair'}
            />
            {gameMode === 'biased' && houseEdge > 0 && (
              <p className="educational-message">Uma vantagem da casa de {houseEdge}% significa que, a longo prazo, o cassino espera reter {houseEdge}% de cada aposta feita.</p>
            )}
          </div>
        </div>

        <div className="betting-panel">
          <h2>Faça sua Aposta</h2>
          <select onChange={(e) => setBetOption(e.target.value)} disabled={isSpinning}>
            <option value="number">Número Único (35:1)</option>
            <option value="redBlack">Vermelho/Preto (1:1)</option>
            <option value="evenOdd">Par/Ímpar (1:1)</option>
            <option value="lowHigh">1-18 / 19-36 (1:1)</option>
            <option value="dozen">1-12, 13-24, 25-36 (2:1)</option>
          </select>
          {betOption === 'number' && (
            <input
              type="number"
              placeholder="Apostar no Número (0-36)"
              value={betDetails === null ? '' : betDetails}
              onChange={(e) => setBetDetails(parseInt(e.target.value, 10) || null)}
              min="0"
              max="36"
              disabled={isSpinning}
            />
          )}
          {(betOption === 'redBlack' || betOption === 'evenOdd' || betOption === 'lowHigh' || betOption === 'dozen') && (
            <select onChange={(e) => setBetDetails(e.target.value)} value={betDetails || ''} disabled={isSpinning}>
              <option value="">Escolha uma opção</option>
              {betOption === 'redBlack' && (
                <>
                  <option value="red">Vermelho</option>
                  <option value="black">Preto</option>
                </>
              )}
              {betOption === 'evenOdd' && (
                <>
                  <option value="even">Par</option>
                  <option value="odd">Ímpar</option>
                </>
              )}
              {betOption === 'lowHigh' && (
                <>
                  <option value="low">1-18</option>
                  <option value="high">19-36</option>
                </>
              )}
              {betOption === 'dozen' && (
                <>
                  <option value="dozen1">1-12</option>
                  <option value="dozen2">13-24</option>
                  <option value="dozen3">25-36</option>
                </>
              )}
            </select>
          )}
          <input
            type="number"
            placeholder={betType === 'fixed' ? 'Valor da Aposta' : 'Porcentagem da Aposta (%)'}
            value={betAmount}
            onChange={handleBetAmountChange}
            min="0"
            max={betType === 'fixed' ? playerBalance : 100}
            disabled={isSpinning}
          />
          <button onClick={placeBet} disabled={isSpinning || betAmount <= 0 || gameOver}>
            {isSpinning ? 'Girando...' : 'Apostar e Girar'}
          </button>
        </div>

        <div className="balance-info">
          <div>
            <label>Capital Inicial do Jogador: </label>
            <input
              type="number"
              value={initialPlayerCapital}
              onChange={(e) => setInitialPlayerCapital(parseFloat(e.target.value) || 0)}
              min="1"
              disabled={isSpinning || playerBalance !== initialPlayerCapital}
            />
            <button onClick={() => setPlayerBalance(initialPlayerCapital)} disabled={isSpinning || playerBalance === initialPlayerCapital}>Reiniciar Capital</button>
          </div>
          <h3>Saldo do Jogador: ${playerBalance.toFixed(2)}</h3>
          <h3>Saldo do Cassino: ${casinoBalance.toFixed(2)}</h3>
          {selectedNumber !== null && (
            <div className="result">
              O número vencedor é: <strong>{selectedNumber}</strong>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className={`wheel ${isSpinning ? 'spinning' : ''}`}>
          {numbers2.map((item, index) => (
            <div
              key={item.number}
              className="wheel-segment"
              style={{
                transform: `rotate(${(360 / numbers2.length) * index}deg)`,
                backgroundColor: item.color,
              }}
            >
              <span
                className="wheel-number"
                style={{
                  transform: `rotate(-${(360 / numbers2.length) * index}deg)`,
                }}
              >
                {item.number}
              </span>
            </div>
          ))}
        </div>
        <div className="indicator"></div>
      </div>

      <div className="chart-container">
        <ChartComponent history={balanceHistory} />
      </div>

      <div className="game-history">
        <h2>Histórico de Rodadas</h2>
        {gameHistory.length === 0 ? (
          <p>Nenhuma rodada jogada ainda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Rodada</th>
                <th>Saldo Inicial</th>
                <th>Aposta</th>
                <th>Opção</th>
                <th>Detalhes</th>
                <th>Vencedor</th>
                <th>Ganhos</th>
                <th>Saldo Final</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.round}</td>
                  <td>${entry.initialBalance.toFixed(2)}</td>
                  <td>${entry.betAmount.toFixed(2)}</td>
                  <td>{entry.betOption}</td>
                  <td>{entry.betDetails}</td>
                  <td>{entry.winningNumber}</td>
                  <td>${entry.winnings.toFixed(2)}</td>
                  <td>${entry.finalBalance.toFixed(2)}</td>
                  <td>{entry.outcome === 'win' ? 'Ganhou' : 'Perdeu'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RouletteWheel;

