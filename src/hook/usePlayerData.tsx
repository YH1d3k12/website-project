import { useContext } from 'react';
import { PlayerDataContext } from '../components/Layout';

export function usePlayerData() {
    const context = useContext(PlayerDataContext);
    if (!context)
        throw new Error('usePlayerData must be used within PlayerProvider');
    return context;
}
