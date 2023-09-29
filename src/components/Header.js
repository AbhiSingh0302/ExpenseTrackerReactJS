import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { tokenContext } from '../store/Context';

const Header = props => {
    const ctx = useContext(tokenContext);

    const history = useHistory("/expense");

    const clickHandler = () => {
        history.replace("/expense");
    }

    const logoutHandler = () => {
        ctx.logout();
    }

    return <header className='main-header d-flex justify-content-between px-4'>
        <h1 className='text-center py-3 logo' onClick={clickHandler}>Expense Tracker</h1>
        {ctx.isLoggedIn && <div>
        <p className='text-center py-3 me-3 d-inline-block'>Your profile is incomplete<Link to="/profile" style={{textDecoration: "underline", color: "white"}}>Complete now</Link></p>
        <Button size='md' variant='danger' onClick={logoutHandler}>Logout</Button>
        </div>}
    </header>
}

export default Header;