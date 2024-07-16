import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from '../pages/Body.jsx';
import Games from '../pages/Games.jsx';


export default function RootNavigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Body />} >
                    <Route path="/games" element={<Games />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}