import GoldFall from '../../components/GoldFall/index.tsx';
import UnderConstruction from '../../components/UnderConstruction/index.tsx';
import './styles.css';

export default function Games() {
    return (
        <div className="games section scroll-y">
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
