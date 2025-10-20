
import React, { useState, useEffect } from 'react';
import './styles.css';

interface SlotSymbol {
  id: number;
  name: string;
  value: number;
  emoji: string;
}

interface SlotBetHistoryEntry {
  round: number;
  initialPlayerBalance: number;
  initialCasinoBalance: number;
  betAmount: number;
  resultSymbols: SlotSymbol[];
  payout: number;
  finalPlayerBalance: number;
  finalCasinoBalance: number;
  outcome: 'win' | 'loss';
}

const symbols: SlotSymbol[] = [
  { id: 1, name: 'Cherry', value: 2, emoji: '🍒' },
  { id: 2, name: 'Lemon', value: 3, emoji: '🍋' },
  { id: 3, name: 'Orange', value: 4, emoji: '🍊' },
  { id: 4, name: 'Plum', value: 5, emoji: '🍑' },
  { id: 5, name: 'Bell', value: 10, emoji: '🔔' },
  { id: 6, name: 'Bar', value: 20, emoji: '🍫' },
  { id: 7, name: 'Seven', value: 50, emoji: '7️⃣' },
];

const SlotMachine: React.FC = () => {
  const [initialPlayerCapital, setInitialPlayerCapital] = useState<number>(100);
  const [playerBalance, setPlayerBalance] = useState<number>(100);
  const [casinoBalance, setCasinoBalance] = useState<number>(10000);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [betType, setBetType] = useState<'fixed' | 'proportional'>('fixed');
  const [reels, setReels] = useState<SlotSymbol[][]>([
    [symbols[0], symbols[1], symbols[2]],
    [symbols[0], symbols[1], symbols[2]],
    [symbols[0], symbols[1], symbols[2]],
  ]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<'fair' | 'biased'>('fair');
  const [houseEdge, setHouseEdge] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<SlotBetHistoryEntry[]>([]);

  useEffect(() => {
    if (playerBalance <= 0 && !gameOver) {
      alert('Game Over! Você perdeu todo o seu capital.');
      setGameOver(true);
    } else if (casinoBalance <= 0 && !gameOver) {
      alert('Parabéns! Você levou o cassino à ruína!');
      setGameOver(true);
    }
  }, [playerBalance, casinoBalance, gameOver]);

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setBetAmount(value);
    }
  };

  const spinReels = () => {
    if (gameOver) {
      alert('O jogo acabou. Por favor, reinicie para jogar novamente.');
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

    const initialPlayerBalance = playerBalance;
    const initialCasinoBalance = casinoBalance;

    setPlayerBalance(prev => prev - currentBet);
    setIsSpinning(true);

    const newReels: SlotSymbol[][] = [];
    const resultSymbols: SlotSymbol[] = [];

    for (let i = 0; i < 3; i++) {
      const reelResult: SlotSymbol[] = [];
      for (let j = 0; j < 3; j++) {
        let chosenSymbol: SlotSymbol;
        if (gameMode === 'biased') {
          // Biased mode: Adjust probabilities based on houseEdge
          // A higher houseEdge means a higher chance of not winning or winning less.
          // For simplicity, we can increase the probability of lower-value symbols
          // or introduce a chance to force a non-winning outcome.
          const biasedPool = [...symbols];
          // Add lower value symbols to the pool based on houseEdge
          for (let k = 0; k < Math.floor(houseEdge / 2); k++) biasedPool.push(symbols[0]); // Cherry
          for (let k = 0; k < Math.floor(houseEdge / 4); k++) biasedPool.push(symbols[1]); // Lemon
          
          // Introduce a chance to force a non-winning outcome
          if (Math.random() * 100 < houseEdge) {
            // Try to pick symbols that won't form a winning line
            const nonWinningSymbols = symbols.filter(s => s.id !== symbols[0].id);
            chosenSymbol = nonWinningSymbols[Math.floor(Math.random() * nonWinningSymbols.length)];
          } else {
            chosenSymbol = biasedPool[Math.floor(Math.random() * biasedPool.length)];
          }
        } else {
          chosenSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        }
        reelResult.push(chosenSymbol);
      }
      newReels.push(reelResult);
      resultSymbols.push(reelResult[1]); // Get the middle symbol for the win condition
    }

    setTimeout(() => {
      setReels(newReels);
      setIsSpinning(false);

      let payout = 0;
      let outcome: 'win' | 'loss' = 'loss';

      // Check for win condition (3 identical symbols in the middle row)
      if (resultSymbols[0].id === resultSymbols[1].id && resultSymbols[1].id === resultSymbols[2].id) {
        payout = currentBet * resultSymbols[0].value;
        outcome = 'win';
        alert(`Parabéns! Você ganhou ${payout} fichas com 3 ${resultSymbols[0].name}s!`);
      } else {
        alert('Você perdeu esta rodada. Mais sorte na próxima!');
      }

      const newPlayerBalance = initialPlayerBalance - currentBet + payout;
      const newCasinoBalance = initialCasinoBalance + currentBet - payout;

      setPlayerBalance(newPlayerBalance);
      setCasinoBalance(newCasinoBalance);

      setGameHistory(prevHistory => [...prevHistory, {
        round: prevHistory.length + 1,
        initialPlayerBalance,
        initialCasinoBalance,
        betAmount: currentBet,
        resultSymbols,
        payout,
        finalPlayerBalance: newPlayerBalance,
        finalCasinoBalance: newCasinoBalance,
        outcome,
      }]);
    }, 1500); // Simulate spin time
  };

  return (
    <div className="slot-machine-container">
      <div className="betting-panel-container">
        <div className="game-controls">
          <h2>Controles do Jogo</h2>
          <div>
            <label>Modo de Jogo: </label>
            <select onChange={(e) => {
              setGameMode(e.target.value as 'fair' | 'biased');
              if (e.target.value === 'fair') {
                setHouseEdge(0);
              } else {
                setHouseEdge(5); // Default house edge for slot machines
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
              <p>A vantagem da casa em máquinas caça-níqueis pode variar bastante, mas frequentemente está entre 2% e 15%.</p>
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
          <input
            type="number"
            placeholder={betType === 'fixed' ? 'Valor da Aposta' : 'Porcentagem da Aposta (%)'}
            value={betAmount}
            onChange={handleBetAmountChange}
            min="0"
            max={betType === 'fixed' ? playerBalance : 100}
            disabled={isSpinning}
          />
          <button onClick={spinReels} disabled={isSpinning || betAmount <= 0 || gameOver}>
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
        </div>
      </div>

      <div className="main-content">
        <div className={`slot-reels ${isSpinning ? 'spinning' : ''}`}>
          {reels.map((reel, reelIndex) => (
            <div key={reelIndex} className="reel">
              {reel.map((symbol, symbolIndex) => (
                <div key={symbolIndex} className="slot-symbol">
                  {symbol.emoji}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="game-history">
        <h2>Histórico de Rodadas da Slot Machine</h2>
        {gameHistory.length === 0 ? (
          <p>Nenhuma rodada jogada ainda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Rodada</th>
                <th>Saldo Inicial (Jogador)</th>
                <th>Aposta</th>
                <th>Símbolos</th>
                <th>Ganhos</th>
                <th>Saldo Final (Jogador)</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.round}</td>
                  <td>${entry.initialPlayerBalance.toFixed(2)}</td>
                  <td>${entry.betAmount.toFixed(2)}</td>
                  <td>{entry.resultSymbols.map(s => s.emoji).join(' ')}</td>
                  <td>${entry.payout.toFixed(2)}</td>
                  <td>${entry.finalPlayerBalance.toFixed(2)}</td>
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

export default SlotMachine;

