import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/index.tsx';
import './styles.css';

export default function Body() {
    return (
        <div className="body-background">
            <Navbar />
            <Outlet />
        </div>
    );
};
