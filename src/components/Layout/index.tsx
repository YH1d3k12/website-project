import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/index.tsx';
import Footer from '../Footer/index.tsx';
import './styles.css';

export default function Layout() {
    return (
        <div className="layout">
            <Navbar />
            <main className='main'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
