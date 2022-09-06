
import { useEffect, useState } from 'react';
import { Navbar as BNavbar, Nav, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.svg'
import { logout } from '../service.ts';
import ConfirmationModal from './ConfirmationModal';
function Navbar({ setIsLoggedIn, isLoggedIn }) {
    const history = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => setIsLoggedIn(localStorage.getItem('user') ? true : false), [])
    async function logoutHandler() {
        try {
            await logout();
            localStorage.removeItem('user');
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            setIsLoggedIn(false);
            setShowModal(false);
            history("/")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <BNavbar bg="primary" variant="dark">
                <Container>
                    <BNavbar.Brand>
                        <img
                            src={logo}
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </BNavbar.Brand>
                    <Nav className="me-auto">
                        {isLoggedIn || <><Link className='nav-link' to="/login">
                            Login
                        </Link>
                            <Link className='nav-link' to="/register">
                                Register
                            </Link></>}

                        {isLoggedIn && <><Link className='nav-link' to="/tweets">
                            Tweets
                        </Link>
                            <Link className='nav-link' to="/all-users">
                                All Users
                            </Link>
                            <a className='nav-link' style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)} >
                                Logout
                            </a></>}
                    </Nav>
                </Container>
            </BNavbar>
            <ConfirmationModal show={showModal} message={"You want to logout from this device"} setShow={setShowModal} onConfirm={logoutHandler} />
        </>
    )
}

export default Navbar;