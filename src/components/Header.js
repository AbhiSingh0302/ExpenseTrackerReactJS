import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';

const Header = props => {
    console.log(props.loggedIn)
    return <header className='main-header d-flex justify-content-between px-4'>
        <h1 className='text-center py-3'>Expense Tracker</h1>
        {props.loggedIn && <p className='text-center py-3'>Your profile is incomplete<Link to="/profile" style={{textDecoration: "underline", color: "white"}}>Complete now</Link></p>}
    </header>
}

export default Header;