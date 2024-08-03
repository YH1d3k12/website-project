import GoldFall from '../components/GoldFall';
import SlotMachine from '../features/other/components/SlotMachine.jsx';
import '../features/other/other.css';


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