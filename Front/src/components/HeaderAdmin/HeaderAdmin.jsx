import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './HeaderAdmin.css';
import loginIcon from '../../assets/iconeLogin.svg';
import iconeSair from '../../assets/iconeSair.svg';

function HeaderAdmin() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="headerAdmin">
            <div className="logoAdmin">
                <NavLink to="/admin">ADMIN</NavLink>
            </div>

            <nav className="navegacaoAdmin">
                <NavLink to="/admin" end>PEDIDOS DOS USUÁRIOS</NavLink>
                <NavLink to="/admin/catalogo">CATÁLOGO DE FILMES</NavLink>
                <NavLink to="/admin/adicionar">ADICIONAR FILMES</NavLink>
            </nav>

            <div className="botoesAutenticacao">
                {!user.token ? (
                    <NavLink to="/login" className="botaoIcone">
                        <img src={loginIcon} alt="Login" className="iconeAutenticacao" />
                        LOGIN
                    </NavLink>
                ) : (
                    <button onClick={handleLogout} className="botaoIcone botaoLogoutAdmin">
                        <img src={iconeSair} alt="Sair" className="iconeAutenticacao" />
                        SAIR
                    </button>
                )}
            </div>
        </header>
    );
}

export default HeaderAdmin;