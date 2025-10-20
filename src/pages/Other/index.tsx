import GoldFall from '../../components/GoldFall/index.tsx';
import SlotMachine from '../../components/SlotMachine/index.tsx';
import './styles.css';

export default function Other() {
    return (
        <div className="other section scroll-y">
            <div className="other-goldfall">
                <GoldFall />
            </div>
            <div className="other-section">
                <SlotMachine />
            </div>
            <div className="other-goldfall">
                <GoldFall />
            </div>
        </div>
    );
};
