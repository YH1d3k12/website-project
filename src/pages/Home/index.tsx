import GoldFall from '../../components/GoldFall/index.tsx';
import Slider from '../../components/Slider/index.tsx';
import ScoreBoard from '../../components/ScoreBoard/index.tsx';
import './styles.css';

export default function Home() {
    return (
        <div className="home">
            <div className="home-goldfall">
                <GoldFall />
            </div>
            <div className="home-section">
                <Slider />
                <ScoreBoard />
            </div>
            <div className="home-goldfall">
                <GoldFall />
            </div>
        </div>
    );
}
