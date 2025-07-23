import './index.css';

const Statistic = ({ upcomingCapsules, pastCapsules }) => {
    const totalCapsules = (upcomingCapsules.length) + (pastCapsules.length);
    const pendingCapsules = upcomingCapsules.length;
    const openedCapsules = pastCapsules.length;

    return (
        <div className="user-stats-grid">
            <div className="user-stat-card">
                <div className="user-stat-number">{totalCapsules}</div>
                <div className="user-stat-label">Total Capsules</div>
            </div>
            <div className="user-stat-card">
                <div className="user-stat-number">{pendingCapsules}</div>
                <div className="user-stat-label">Pending</div>
            </div>
            <div className="user-stat-card">
                <div className="user-stat-number">{openedCapsules}</div>
                <div className="user-stat-label">Opened</div>
            </div>
        </div>
    );
};

export default Statistic;