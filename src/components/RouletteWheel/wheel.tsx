import React, { useState, useEffect } from 'react';

interface RouletteNumber {
    number: number;
    color: 'green' | 'red' | 'black';
}

interface RouletteWheelProps {
    isSpinning: boolean;
    winningNumber: number | null;
    numbersData: RouletteNumber[];
}

// O ângulo de cada segmento da roleta (360 graus / 37 números)
const SEGMENT_ANGLE = 360 / 37;

// Função para calcular o ângulo de parada
const getStopAngle = (winningNumber: number, numbersData: RouletteNumber[]) => {
    if (winningNumber === null) return 0;

    // Encontra o índice do número vencedor na lista de números
    const winningIndex = numbersData.findIndex(n => n.number === winningNumber);

    // O ângulo de parada é baseado no centro do segmento do número vencedor.
    // A roleta gira no sentido horário, mas a rotação CSS é no sentido anti-horário.
    // O 0 (verde) está no índice 0.
    // O ângulo inicial do 0 é 0. O centro do 0 é 0 + SEGMENT_ANGLE/2.
    // Para que o ponteiro aponte para o centro do segmento, precisamos calcular o ângulo
    // que move o centro do segmento para a posição do ponteiro (geralmente 90 graus ou 0 graus, dependendo do design).

    // Vamos assumir que o ponteiro está no topo (0 graus) e a roleta gira no sentido horário.
    // O ângulo do centro do segmento do número vencedor:
    const centerAngle = winningIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;

    // Para que o ponteiro (no topo, 0 graus) aponte para o centro do segmento,
    // a roleta deve girar de forma que o centro do segmento fique em 0 graus.
    // Rotação necessária = 360 - centerAngle.
    // Adicionamos 360 * 10 (múltiplas voltas) para um efeito de giro.
    const fullRotations = 360 * 10;
    const finalAngle = fullRotations + (360 - centerAngle);

    // Adiciona um pequeno offset aleatório dentro do segmento para variar a parada
    const randomOffset = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.8);

    return finalAngle + randomOffset;
};

const RouletteWheel: React.FC<RouletteWheelProps> = ({
    isSpinning,
    winningNumber,
    numbersData,
}) => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (isSpinning) {
            // Inicia o giro com uma rotação alta e aleatória para simular o movimento
            // A rotação deve ser grande o suficiente para que a transição CSS faça o efeito de giro
            setRotation(360 * 20 + Math.random() * 360);
        } else if (winningNumber !== null) {
            // Calcula o ângulo de parada para o número vencedor
            const stopAngle = getStopAngle(winningNumber, numbersData);
            setRotation(stopAngle);
        }
    }, [isSpinning, winningNumber, numbersData]);

    // Mapeia os números para elementos visuais
    const wheelSegments = numbersData.map((item, index) => {
        const style = {
            '--i': index,
            '--color':
                item.color === 'red'
                    ? 'var(--color-red)'
                    : item.color === 'black'
                    ? 'var(--color-black)'
                    : 'var(--color-green)',
            '--angle': `${SEGMENT_ANGLE}deg`,
            '--offset': `${index * SEGMENT_ANGLE}deg`,
        } as React.CSSProperties;

        return (
            <div key={item.number} className="wheel-segment" style={style}>
                <span className="segment-number">{item.number}</span>
            </div>
        );
    });

    return (
        <div className="roulette-container">
            <div className="roulette-pointer"></div>
            <div
                className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {wheelSegments}
            </div>
        </div>
    );
};

export default RouletteWheel;
