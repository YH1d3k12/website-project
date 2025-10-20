import GoldFall from '../../components/GoldFall/';
import SlotMachine from '../../components/SlotMachine/index.tsx';
import './other.css';


export default function Other(): JSX.Element {
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
