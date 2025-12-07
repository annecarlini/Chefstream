import './AdminSettings.css'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminHeader from '../../components/Admin/AdminHeader'
import { Settings, Bell, Shield, Palette, Globe } from 'lucide-react'

const AdminSettings = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <div className="page-header">
            <h1>Configurações</h1>
            <p>Gerencie as configurações da plataforma</p>
          </div>

          <div className="settings-grid">
            <div className="setting-card">
              <div className="setting-icon">
                <Bell size={24} />
              </div>
              <div className="setting-content">
                <h3>Notificações</h3>
                <p>Configure alertas e notificações push</p>
                <button className="setting-btn">Configurar</button>
              </div>
            </div>

            <div className="setting-card">
              <div className="setting-icon">
                <Shield size={24} />
              </div>
              <div className="setting-content">
                <h3>Segurança</h3>
                <p>Gerencie autenticação e permissões</p>
                <button className="setting-btn">Configurar</button>
              </div>
            </div>

            <div className="setting-card">
              <div className="setting-icon">
                <Palette size={24} />
              </div>
              <div className="setting-content">
                <h3>Aparência</h3>
                <p>Personalize cores e temas</p>
                <button className="setting-btn">Configurar</button>
              </div>
            </div>

            <div className="setting-card">
              <div className="setting-icon">
                <Globe size={24} />
              </div>
              <div className="setting-content">
                <h3>Idioma & Região</h3>
                <p>Configure idioma e localização</p>
                <button className="setting-btn">Configurar</button>
              </div>
            </div>

            <div className="setting-card">
              <div className="setting-icon">
                <Settings size={24} />
              </div>
              <div className="setting-content">
                <h3>API Keys</h3>
                <p>Gerencie chaves de API do YouTube e Firebase</p>
                <button className="setting-btn">Configurar</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminSettings
