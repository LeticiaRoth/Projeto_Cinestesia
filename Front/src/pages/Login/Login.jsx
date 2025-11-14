import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import BotaoEntrar from '../../components/BotaoFormulario/BotaoFormulario';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: senha })
            });

            if (!response.ok) {
                throw new Error('E-mail ou senha inválidos.');
            }

            const data = await response.json();

            const userData = {
                nome: data.nome,
                token: data.token,
                role: data.user_type === 'Administrador' ? 'admin' : 'user'
            };

            setUser(userData);

            if (userData.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="paginaLogin">
            <div className="loginBox">
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputGrupo">
                        <label htmlFor="email">E-MAIL</label>
                        <div className="inputContainer">
                            <FaUser />
                            <input
                                type="email"
                                id="email"
                                placeholder="DIGITE SEU EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="inputGrupo">
                        <label htmlFor="senha">SENHA</label>
                        <div className="inputContainer">
                            <FaLock />
                            <input
                                type="password"
                                id="senha"
                                placeholder="DIGITE SUA SENHA"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="mensagemErroLogin">{error}</p>}

                    <BotaoEntrar
                        type="submit"
                        text={loading ? 'ENTRANDO...' : 'ENTRAR'}
                        disabled={loading}
                    />

                    <p className="linkCadastro">
                        NÃO POSSUI CONTA? <Link to="/cadastro">CADASTRE-SE</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;