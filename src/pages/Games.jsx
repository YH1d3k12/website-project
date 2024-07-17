import GoldFall from '../components/GoldFall';
import '../features/games/games.css';


export default function Games() {
    return (
        <div className="games section">
            <div className="games-goldfall">
                <GoldFall />
            </div>
            <div className="games-section">
                <h1>Lista de Jogos</h1>
            </div>
            <div className="games-goldfall">
                <GoldFall />
            </div>
        </div>
    );
};