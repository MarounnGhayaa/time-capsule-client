import './index.css';
import Button from '../Buttons';
import { useNavigate } from 'react-router-dom';

const HeaderNav = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1 className="nav-title">⏳ Time'sApp</h1>
                <Button
                    text={"Logout"}
                    onClickListener={ () => {
                    navigate("/");
                    }}
                className = "logout-btn"
                />
            </div>
        </nav>
    );
};

export default HeaderNav;