import Slider from '../features/home/components/Slider';
import GoldFall from '../components/GoldFall';
import '../features/home/home.css';


export default function Home() {
    return (
        <div className="home section">
            <div className="home-goldfall">
                <GoldFall />
            </div>
            <div className="home-section">
                <Slider />
            </div>
            <div className="home-goldfall">
                <GoldFall />
            </div>
        </div>
    );
};