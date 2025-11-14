import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardFilmes from '../../components/CardFilmes/CardFilmes.jsx';
import { FaSearch } from 'react-icons/fa';
import './VerFilmes.css';


const GENEROS_DISPONIVEIS = [
  'Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 
  'Romance', 'Documentário', 'Animação', 'Suspense', 'Fantasia'
];
const ANOS_DISPONIVEIS = [];
for (let ano = 2025; ano >= 1970; ano--) {
  ANOS_DISPONIVEIS.push(ano);
}

function VerFilmes() {
  const [filmes, setFilmes] = useState([]);
  
  
  const [generos, setGeneros] = useState(GENEROS_DISPONIVEIS);
  const [anos, setAnos] = useState(ANOS_DISPONIVEIS);
  
  const [generoSelecionado, setGeneroSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');
  const [termoBusca, setTermoBusca] = useState('');

  const [loadingFilmes, setLoadingFilmes] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarFilmes = async () => {
      setLoadingFilmes(true);
      setError(null);
      
      try {
        const params = new URLSearchParams();
        
        
        if (generoSelecionado) params.append('genero', generoSelecionado);
        if (anoSelecionado) params.append('ano', anoSelecionado);
        if (termoBusca) params.append('titulo', termoBusca);
       
        const url = `http://localhost:8000/filmes?${params.toString()}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Falha ao buscar filmes');
        }
        
        const data = await response.json();
        
        
        const filmesFormatados = data.map(filme => ({
          id: filme.id_filme,
          titulo: filme.titulo,
          ano: filme.ano,
          poster: filme.poster,
          diretor: filme.diretores || "Não informado", 
          elenco: filme.atores || "Não informado",
          genero: filme.generos || "Não informado"
        }));

        setFilmes(filmesFormatados); 
      } catch (err) {
        setError(err.message);
        setFilmes([]);
      } finally {
        setLoadingFilmes(false);
      }
    };

    const timerId = setTimeout(() => {
        buscarFilmes();
    }, 500);

    return () => clearTimeout(timerId);

  }, [generoSelecionado, anoSelecionado, termoBusca]); 

  const renderizarConteudoFilmes = () => {
    if (loadingFilmes) {
      return <p className="mensagemCarregando">Carregando filmes...</p>;
    }
    
    if (error) {
      return <p className="mensagemErro">{error}</p>;
    }
    
    if (filmes.length === 0) {
      return <p className="mensagemNenhumFilme">Nenhum filme encontrado com esses filtros.</p>;
    }
    
    return (
      <div className="gridFilmes">
        {filmes.map(filme => (
          <CardFilmes key={filme.id} filme={filme} />
        ))}
      </div>
    );
  };

  return (
    <div className="paginaVerFilmes">
      <div className="containerPagina">
        <Link to="/" className="botaoVoltar">
          VOLTAR AO INÍCIO
        </Link>
      </div>

      <section className="barraFiltros">
        <div className="containerFiltrosInterno">
          <select 
            className="dropdownFiltro" 
            id="filtroGenero"
            value={generoSelecionado}
            onChange={(e) => setGeneroSelecionado(e.target.value)}
          >
            <option value="">SELECIONE O GÊNERO</option>
            {generos.map(genero => (
              <option key={genero} value={genero}>{genero}</option>
            ))}
          </select>
          
          <select 
            className="dropdownFiltro" 
            id="filtroAno"
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(e.target.value)}
          >
            <option value="">SELECIONE O ANO</option>
            {anos.map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>

          <div className="containerBusca">
            <FaSearch className="iconeBusca" />
            <input 
              type="text" 
              className="campoBuscaFilme" 
              placeholder="PESQUISE O NOME DO FILME"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="containerPagina">
        <main className="containerListagemFilmes" id="listaTodosFilmes">
          {renderizarConteudoFilmes()}
        </main>
      </div>
    </div>
  );
}

export default VerFilmes;