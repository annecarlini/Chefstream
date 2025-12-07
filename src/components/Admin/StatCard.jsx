import './StatCard.css'

const StatCard = ({ title, value, change, changeType, icon: Icon, delay = 0 }) => {
  return (
    <div 
      className="stat-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stat-content">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          <p className={`stat-change ${changeType}`}>
            {change}
          </p>
        </div>
        <div className="stat-icon">
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}

export default StatCard
