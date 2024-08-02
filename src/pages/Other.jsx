import GoldFall from '../components/GoldFall';
import UnderConstruction from '../components/UnderConstruction';
import '../features/other/other.css';


export default function Other() {
    return (
        <div className="other section scroll-y">
            <div className="other-goldfall">
                <GoldFall />
            </div>
            <div className="other-section">
                <UnderConstruction />
            </div>
            <div className="other-goldfall">
                <GoldFall />
            </div>
        </div>
    );
};