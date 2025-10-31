import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './styles.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-background">
                <Link to={'/'} className="navbar-title">
                    <img
                        className="navbar-title-logo"
                        src={logo}
                        alt="logo capivara"
                    />
                    Capivara
                </Link>
                <ul className="navbar-links">
                    <li>
                        <Link to={'/games'}>Games</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
