import React, { useState } from 'react';
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
  
  const { setUser } = useAuth(); // Pega a função 'setUser' do Contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Chama a API do backend Python
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: senha }) // Envia o email e a senha
      });

      // 2. Verifica se o backend retornou um erro (ex: 401 Não Autorizado)
      if (!response.ok) {
        throw new Error('E-mail ou senha inválidos.');
      }

      // 3. Pega os dados que o backend enviou (token, nome, user_type)
      const data = await response.json();
      
      // 4. Mapeia os dados do backend para o formato do frontend
      // O backend envia 'Administrador' [cite: banco_filmes.sql], o frontend espera 'admin' [cite: src/App.jsx]
      const userData = {
        nome: data.nome,
        token: data.token,
        role: data.user_type === 'Administrador' ? 'admin' : 'user'
      };

      // 5. Salva o usuário logado no Contexto Global
      setUser(userData);

      // 6. Redireciona para a página correta
      if (userData.role === 'admin') {
        navigate('/admin'); // Rota de admin
      } else {
        navigate('/'); // Rota de usuário comum
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