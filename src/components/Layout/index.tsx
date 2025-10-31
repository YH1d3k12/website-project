import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/index.tsx';
import Footer from '../Footer/index.tsx';
import RandomAdRotator from '../Ad/index.tsx';
import { PlayerData } from '../../service/player.tsx';
import data from '../../data/playerData.tsx';
import './styles.css';

export const PlayerDataContext = React.createContext<
    [PlayerData, React.Dispatch<React.SetStateAction<PlayerData>>] | null
>(null);

export default function Layout() {
    const [playerData, setPlayerData] = React.useState<PlayerData>(data);

    return (
        <PlayerDataContext.Provider value={[playerData, setPlayerData]}>
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
        </PlayerDataContext.Provider>
    );
}
