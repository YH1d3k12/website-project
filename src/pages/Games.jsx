import GoldFall from '../components/GoldFall';
import UnderConstruction from '../components/UnderConstruction';
import '../features/games/games.css';


export default function Games() {
    return (
        <div className="games section">
            <div className="games-goldfall">
                <GoldFall />
            </div>
            <div className="games-section">
                <UnderConstruction />
            </div>
            <div className="games-goldfall">
                <GoldFall />
            </div>
        </div>
    );
};