import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from '../components/Layout/index.tsx';
import Home from '../pages/Home/index.tsx';
import Games from '../pages/Games/index.tsx';
import Other from '../pages/Other/index.tsx';

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
