import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

const Header = props => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const history = useHistory();

    const clickHandler = () => {
        history.replace("/expense");
    }

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return <header className='main-header d-flex justify-content-between px-4'>
        <h1 className='text-center py-3 logo' onClick={clickHandler}>Expense Tracker</h1>
        {isLoggedIn && <div>
        <p className='text-center py-3 me-3 d-inline-block'>Your profile is incomplete<Link to="/profile" style={{textDecoration: "underline", color: "white"}}>Complete now</Link></p>
        <Button size='md' variant='danger' onClick={logoutHandler}>Logout</Button>
        </div>}
    </header>
}

export default Header;