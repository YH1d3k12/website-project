import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/index.tsx';
import Footer from '../Footer/index.tsx';
import RandomAdRotator from '../Ad/index.tsx';
import './styles.css';

export default function Layout() {
    return (
        <div className="layout">
            <Navbar />
            <main className="main section-padding">
                <div className="ad-container" id="ad-1">
                    <RandomAdRotator showControls={false} />
                </div>
                <Outlet />
                <div className="ad-container" id="ad-3">
                    <RandomAdRotator showControls={false} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
