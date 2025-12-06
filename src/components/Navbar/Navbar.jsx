import React from 'react'
import './Navbar.css'
import logo from '../../assets/chef-stream-logo.png'
import { Search, Bell, ScanFace, ChevronDown } from 'lucide-react'
import { logout } from '../../../firebase'


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li> {/* Substituir por  Fundamentos */}
          <li>Movies</li> {/* Substituir por Linguagem de programação*/}
          <li>New & Popular</li> {/* Substituir por Trilhas profissionais */}
          <li>Menu</li>
          <li>Browse by Language</li> {/* Manter, vai ser para pesquisar o EN ou PT */}
        </ul>
        </div>
      <div className="navbar-right">
        <Search className='icons'/>
        <p>Children</p>
        <Bell className='icons'/>
        <div className="navbar-profile">
          <ScanFace className='profile'/>
          <ChevronDown />
          <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign out of SkillFlix</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar