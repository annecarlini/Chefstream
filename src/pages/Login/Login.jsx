import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/chef-stream-logo.png'
import { login, signup } from '../../../firebase'

const Login = () => {
  
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState ("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");

  const user_auth = async (event) => {
    event.preventDefault();
    if(signState==="Sign In"){
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  }

  return (
    <div className="login">
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState==="Sign Up"? <input 
          value={name} onChange={(e)=>{setName(e.target.value)}} 
          type="text" 
          placeholder='Digite seu nome' />:<></>} 
          
          <input 
          value={email} onChange={(e)=>{setEmail(e.target.value)}} 
          type="email" 
          placeholder='Digite seu email' />

          <input
          value={password} onChange={(e)=>{setPassword(e.target.value)}} 
          type="password" 
          placeholder='Digite sua senha' />

          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Lembrar-me</label>
            </div>
            <p>Precisa de ajuda?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In"?
          <p>Novo por aqui? <span onClick={()=>{setSignState("Sign Up")}}>Cadastre-se agora</span></p>
          :<p>Já possui uma conta? <span onClick={()=>{setSignState("Sign In")}}>Entre agora</span></p>} 
        </div>
      </div>



    </div>
  )
}

export default Login
