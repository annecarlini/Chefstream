import './Footer.css'
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <FaGithub />
        <FaLinkedinIn />
        <FaInstagram />
      </div>
      <ul>
        <li>Descrição de Aúdio</li>
        <li>Central de Ajuda</li>
        <li>FAQ</li>
        <li>Termos de Uso</li>
        <li>Termos de Privacidade</li>
        <li>Sobre a Chef Stream</li>
        <li>Trabalhe conosco</li>
        <li>Contatos</li>
      </ul>
      <p className='copyright-text'>©2025 Chef Stream | Anne Carlini e Matheus Santos | 2ADS - Senai Félix Guisard</p>
    </div>
  )
}

export default Footer