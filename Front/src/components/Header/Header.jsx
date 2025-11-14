import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logoCinestesia from '../../assets/Cinestesia.svg';

import loginIcon from '../../assets/iconeLogin.svg';
import iconeSair from '../../assets/iconeSair.svg';

function Header() {
 return (
     <header className="headerPrincipal">

    <div className="logoCinesia">
         <NavLink to="/">
        <img 
            src={logoCinestesia}
            alt="Logo Cinestesia" 
            className="logoImagem" 
        />
        </NavLink>
     </div>

     <nav className="navegacaoPrincipal">
        <NavLink to="/" end>INÍCIO</NavLink>
        <NavLink to="/verFilmes">CATÁLOGO FILMES</NavLink>
        <NavLink to="/adicionar">ADICIONAR FILME</NavLink>
     </nav>

    <div className="botoesAutenticacao">
         <NavLink to="/login" className="botaoIcone">
          <img src={loginIcon} alt="Imagem de ícone para simbolizar o Login" className="iconeAutenticacao" />
          LOGIN
        </NavLink>
        <NavLink to="/login" className="botaoIcone">
          <img src={iconeSair} alt="ícone de porta aberta para simbolizar a saída do site" className="iconeAutenticacao" />
          SAIR
        </NavLink>
    </div>
     </header>
 );
}

export default Header;