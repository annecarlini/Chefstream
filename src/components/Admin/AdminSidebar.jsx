import './AdminSidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, PlayCircle, Users, Settings, LogOut, Utensils } from 'lucide-react'
import { logout } from '../../../firebase'

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Conteúdos", icon: PlayCircle, path: "/admin/conteudos" },
  { title: "Usuários", icon: Users, path: "/admin/usuarios" },
  { title: "Configurações", icon: Settings, path: "/admin/configuracoes" },
]

const AdminSidebar = () => {
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-content">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Utensils size={16} />
          </div>
          <span className="logo-text">Chef Stream</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
