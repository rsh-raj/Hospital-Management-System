import { useHistory } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';
import FormDialogReset from './ResetPasswordPopup';
import '../styles/navbar3.css';
const Navbar3 = () => {
    const history = useHistory();
    const handleMyHome = () => {
        history.push('/login');
    }
    return (
        <nav className='navbar3'>
            <div className="logo"><NavbarLogo /></div>
            <div className='vikasHName2'>
                {/* <NavbarLogo /> */}
                Azad Hospital
            </div>
            <div className="vikasChangePass">
                {/* <button onClick={handleChangePass}>Change Password</button> */}
                <FormDialogReset />
            </div>
            <div className='vikasmyHome'>
                <button onClick={handleMyHome}>Logout</button>
            </div>
            {/* <div className='vikasmyHome2'>
                <Link to="/login"><button >Logout</button></Link>
            </div> */}
        </nav>
    );
}

export default Navbar3;
