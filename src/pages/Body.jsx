import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../features/body/body.css';


export default function Body() {
    return (
        <div className="body-background">
            <h1>Body</h1>
            <p>This is the body of the page</p>
            <Link to={"games"}>jogos</Link>
            <Outlet />
        </div>
    );
};