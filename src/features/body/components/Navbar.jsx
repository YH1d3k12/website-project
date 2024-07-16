import { Link } from 'react-router-dom';

import user from '../../../assets/user.png';
import './navbar.css';


export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-background">
                <h2 className="navbar-title">Web<span>site</span></h2>
                <ul className="navbar-links">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/games"}>Games</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                </ul>
                <img className="navbar-user" src={user} alt="user" />
            </div>
        </nav>
    );
};