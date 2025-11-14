import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import BotaoEntrar from '../../components/BotaoFormulario/BotaoFormulario';
import './Cadastro.css';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
      });

      if (!response.ok) {
        throw new Error('Não foi possível criar a conta. O e-mail já pode estar em uso.');
      }

      await response.json();
      
      alert('Conta criada com sucesso! Você será redirecionado para o login.');
      navigate('/login');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paginaCadastro">
      <div className="colunaFormulario">
        <div className="cadastroBox">
          <h1>CADASTRO</h1>
          <p>CADASTRE E APROVEITE UMA AMPLA VARIEDADE DE FILMES.</p>
          <form onSubmit={handleSubmit}>
            <div className="inputGrupo">
              <label htmlFor="nome">NOME</label>
              <div className="inputContainer">
                <FaUser />
                <input 
                  type="nome" 
                  id="nome"
                  placeholder="DIGITE SEU NOME" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
            </div>
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
              <label htmlFor="senha">CRIE UMA NOVA SENHA</label>
              <div className="inputContainer">
                <FaLock />
                <input 
                  type="password" 
                  id="senha"
                  placeholder="CRIE SUA SENHA"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && <p className="mensagemErroCadastro">{error}</p>}
            
            <BotaoEntrar
              type="submit" 
              text={loading ? 'CRIANDO...' : 'ENTRAR'} 
              disabled={loading} 
            />
          </form>
        </div>
      </div>
      <div className="colunaImagemCadastro">
      </div>
    </div>
  );
}

export default Cadastro;