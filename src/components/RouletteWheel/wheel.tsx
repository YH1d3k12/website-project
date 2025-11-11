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
// --- ⭐ NOVA LÓGICA "OUT OF THE BOX" ⭐ ---

    // 1. Mapeia as cores do CSS para o JS
    const colorMap = {
        green: 'var(--color-green)',
        red: 'var(--color-red)',
        black: 'var(--color-black)',
    };

    // 2. Cria a string do conic-gradient dinamicamente
    const gradientString = numbersData
        .map((item, index) => {
            const color = colorMap[item.color];
            const startAngle = index * SEGMENT_ANGLE;
            const endAngle = (index + 1) * SEGMENT_ANGLE;
            // Define a cor para cada fatia
            return `${color} ${startAngle}deg ${endAngle}deg`;
        })
        .join(', ');

    // 3. Define o estilo da roleta (fundo e rotação da animação)
    const wheelStyle = {
        background: `conic-gradient(${gradientString})`,
        transform: `rotate(${rotation}deg)`,
    } as React.CSSProperties;

    // 4. Mapeia os números para elementos posicionados
    const wheelNumbers = numbersData.map((item, index) => {
        // Ângulo para o *centro* do segmento
        const angle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;

        const style = {
            /* 1. Gira o container do número para a posição (aponta para fora)
              2. Move para a borda (metade do tamanho da roleta - um offset)
              3. Gira o texto 90deg para ele ficar "deitado"
            */
            transform: `rotate(${angle}deg) translateY(calc(var(--roulette-size) / -2 + 2.5rem)) rotate(90deg)`,
        } as React.CSSProperties;

        return (
            <div key={item.number} className="segment-number" style={style}>
                <span>{item.number}</span>
            </div>
        );
    });
    
    // --- FIM DA NOVA LÓGICA ---

    return (
        <div className="roulette-container">
            {/* O ponteiro agora está em CSS puro para ser mais nítido */}
            <div className="roulette-pointer"></div>
            <div
                className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`}
                style={wheelStyle} // Aplicando o novo estilo de fundo + rotação
            >
                {wheelNumbers} {/* Renderizando os números por cima */}
            </div>
        </div>
    );
};

export default RouletteWheel;
