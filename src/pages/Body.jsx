import { Outlet } from 'react-router-dom';

import Navbar from '../features/body/components/Navbar.jsx';

import '../features/body/body.css';


export default function Body() {
    return (
        <div className="body-background">
            <Navbar />
            <div className="body-outlet">
                <Outlet />
            </div>
        </div>
    );
};