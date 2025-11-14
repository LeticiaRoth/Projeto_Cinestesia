import React, { useState, useEffect } from 'react'; 
import './AdminHome.css';

const DADOS_CARROSSEL = [
  { id: 1, url: 'https://wallpapers.com/images/featured/avengers-endgame-mghdp4gaqzu4q4us.jpg', alt: 'Banner Vingadores' },
  { id: 2, url: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2070&auto=format&fit=crop', alt: 'Banner Filmes 2' },
  { id: 3, url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2070&auto=format&fit=crop', alt: 'Banner Filmes 3' },
  { id: 4, url: 'https://images.unsplash.com/photo-1627843563095-f6e9467c6c28?q=80&w=1974&auto=format&fit=crop', alt: 'Banner Filmes 4' },
];

const DADOS_MOCADOS = [
  { id: 1, titulo: 'Marte Precisa de Mães', diretor: 'Simon Wells', elenco: 'Seth Green', ano: 2011, genero: 'Aventura', poster: 'https://m.media-amazon.com/images/M/MV5BMTcwODI3MzE3MF5BMl5BanBnXkFtZTcwNzcyNzc5NA@@._V1_FMjpg_UX1000_.jpg' },
  { id: 2, titulo: 'Filme Exemplo 2', diretor: 'Diretor Famoso', elenco: 'Ator A', ano: 2020, genero: 'Ação', poster: 'https://placehold.co/200x280/0B0B2B/FFFFFF?text=Poster2' },
  { id: 3, titulo: 'Filme Exemplo 3', diretor: 'Diretor Famoso', elenco: 'Ator A', ano: 2020, genero: 'Comédia', poster: 'https://placehold.co/200x280/0B0B2B/FFFFFF?text=Poster3' },
  { id: 4, titulo: 'Filme Exemplo 4', diretor: 'Diretor Famoso', elenco: 'Ator A', ano: 2021, genero: 'Drama', poster: 'https://placehold.co/200x280/0B0B2B/FFFFFF?text=Poster4' },
  { id: 5, titulo: 'Filme Exemplo 5', diretor: 'Diretor Famoso', elenco: 'Ator A', ano: 2022, genero: 'Aventura', poster: 'https://placehold.co/200x280/0B0B2B/FFFFFF?text=Poster5' },
  { id: 6, titulo: 'Filme Exemplo 6', diretor: 'Diretor Famoso', elenco: 'Ator A', ano: 2022, genero: 'Ação', poster: 'https://placehold.co/200x280/0B0B2B/FFFFFF?text=Poster6' },
];


function SecaoFilmes({ titulo, filmes }) {
  return (
    <section className="secaoFilmes">
      <h2>{titulo}</h2>
      <div className="listaFilmes">
        {filmes.map(filme => (
          <div key={filme.id} className="filmeCard">
            <img 
              src={filme.poster} 
              alt={`Poster de ${filme.titulo}`} 
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x280/FF0000/FFFFFF?text=Erro+na+Imagem'; }}
            />
            <h3>{filme.titulo}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}


function AdminHome() {
  const [vencedores, setVencedores] = useState([]);
  const [indicados, setIndicados] = useState([]);
  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    setVencedores(DADOS_MOCADOS.slice(0, 5));
    setIndicados(DADOS_MOCADOS.slice(1, 6));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const proximoSlide = (slideAtual + 1) % DADOS_CARROSSEL.length;
      setSlideAtual(proximoSlide);
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [slideAtual]); 

  // Função para navegar pelos pontos
  const irParaSlide = (index) => {
    setSlideAtual(index);
  };

  return (
    <div className="paginaHome">
      <section className="secaoHero">
        <div className="containerSlides">
          {DADOS_CARROSSEL.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.url}
              alt={slide.alt}
              className={`slideImagem ${index === slideAtual ? 'ativo' : ''}`}
            />
          ))}
        </div>

        <div className="pontosCarrossel">
          {DADOS_CARROSSEL.map((_, index) => (
            <div
              key={index}
              className={`ponto ${index === slideAtual ? 'ativo' : ''}`}
              onClick={() => irParaSlide(index)}
            ></div>
          ))}
        </div>
      </section>

    
      <SecaoFilmes titulo="Vencedores de bilheteria 2025" filmes={vencedores} />
      <SecaoFilmes titulo="Indicados ao Oscar 2026" filmes={indicados} />
      
    </div>
  );
}

export default AdminHome;