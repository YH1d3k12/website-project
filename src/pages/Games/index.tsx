import GoldFall from '../../components/GoldFall';
import RouletteWheel from '../../components/RouletteWheel/index.tsx';
import './styles.css';

export default function Games(): JSX.Element {
    return (
        <div className="games">
            <div className="games-goldfall">
                <GoldFall />
            </div>
            <div className="games-section">
                <RouletteWheel />
            </div>
            <div className="games-goldfall">
                <GoldFall />
            </div>
        </div>
    );
}
