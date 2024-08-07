import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from '../pages/Body.jsx';
import Home from '../pages/Home.jsx';
import Games from '../pages/Games.jsx';
import Other from '../pages/Other.jsx';

export default function RootNavigation() {
    return (
        <BrowserRouter basename={"/website-project/"}>
            <Routes>
                <Route path="/" element={<Body />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/other" element={<Other />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}