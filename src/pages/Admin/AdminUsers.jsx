import './AdminUsers.css'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminHeader from '../../components/Admin/AdminHeader'
import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Users, Mail, Calendar, Trash2, Shield, Search } from 'lucide-react'
import { toast } from 'react-toastify'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setUsers(usersData)
      setFilteredUsers(usersData)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      toast.error('Erro ao carregar usuários')
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
      return
    }

    try {
      await deleteDoc(doc(db, 'users', userId))
      setUsers(users.filter(u => u.id !== userId))
      toast.success('Usuário excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)
      toast.error('Erro ao excluir usuário')
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Data desconhecida'
    try {
      return new Date(timestamp).toLocaleDateString('pt-BR')
    } catch {
      return 'Data desconhecida'
    }
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <div className="page-header">
            <div>
              <h1>Gerenciar Usuários</h1>
              <p>Total de {filteredUsers.length} usuários</p>
            </div>
          </div>

          <div className="search-box">
            <Search size={20} />
            <input 
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading-state">
              <p>Carregando usuários...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="loading-state">
              <p>Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="users-grid">
              {filteredUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-avatar">
                    <Users size={32} />
                  </div>
                  <div className="user-info">
                    <h3>{user.name || 'Sem nome'}</h3>
                    <div className="user-detail">
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                    <div className="user-detail">
                      <Shield size={14} />
                      <span>{user.authProvider || 'local'}</span>
                    </div>
                  </div>
                  <div className="user-actions">
                    <button 
                      className="action-btn-danger" 
                      title="Remover usuário"
                      onClick={() => handleDeleteUser(user.id, user.name)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminUsers
