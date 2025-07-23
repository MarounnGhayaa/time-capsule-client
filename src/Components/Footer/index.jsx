import './index.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>Time'sApp ⏳</h3>
                    <p>Where your past self meets your future self.</p>
                    <p>Preserving moments, revealing destinies.</p>
                </div>
                <div className="footer-tagline">
                    <h4>"The best way to predict the future is to create it."</h4>
                    <p>Abraham Lincoln (reimagined by Time'sApp)</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Time'sApp. All moments reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;