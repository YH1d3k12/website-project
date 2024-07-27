import GoldFall from '../components/GoldFall.jsx';
import Slider from '../features/home/components/Slider.jsx';
import ScoreBoard from '../features/home/components/ScoreBoard.jsx';
import '../features/home/home.css';


export default function Home() {
    return (
        <div className="home section">
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
};