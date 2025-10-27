import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from '../components/Layout';
import Home from '../pages/Home/';
import Games from '../pages/Games/index.tsx';

export default function RootNavigation(): JSX.Element {
    return (
        <BrowserRouter basename={"/website-project/"}>
            <Routes>
                <Route path="/" element={<Body />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
