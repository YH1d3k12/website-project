import gear from '../assets/gear.png';
import './underConstruction.css';


export default function UnderConstruction() {
    return (
        <div className="under-construction">
            <h2 className="under-construction-title">Página em Construção!</h2>
            <img className="under-construction-gear" src={gear} alt="gear" />
            <img className="under-construction-gear" src={gear} alt="gear" />
            <img className="under-construction-gear" src={gear} alt="gear" />
            <h2 className="under-construction-subtitle">Volte mais tarde!</h2>
        </div>
    );
};