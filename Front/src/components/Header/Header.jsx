import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import logoCinestesia from '../../assets/Cinestesia.svg';
import loginIcon from '../../assets/iconeLogin.svg';
import iconeSair from '../../assets/iconeSair.svg';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

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
                {!user.token ? (
                    <NavLink to="/login" className="botaoIcone">
                        <img src={loginIcon} alt="Imagem de ícone para simbolizar o Login" className="iconeAutenticacao" />
                        LOGIN
                    </NavLink>
                ) : (
                    <button onClick={handleLogout} className="botaoIcone" style={{background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontFamily: 'Arial, sans-serif', fontSize: '1rem', fontWeight: 'bold'}}>
                        <img src={iconeSair} alt="ícone de porta aberta para simbolizar a saída do site" className="iconeAutenticacao" />
                        SAIR
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;