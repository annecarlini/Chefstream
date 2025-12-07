import './AdminHeader.css'
import { Bell } from 'lucide-react'

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <h1 className="header-title">Dashboard</h1>

        <button className="notification-btn">
          <Bell size={20} />
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
