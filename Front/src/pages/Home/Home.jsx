import { useState, useEffect } from 'react';
import SecaoFilmes from '../../components/SecaoFilmes/SecaoFilmes.jsx';
import './Home.css';


const DADOS_CARROSSEL = [
  { id: 1, url: 'https://m.media-amazon.com/images/S/pv-target-images/b71b06873fb90830776f41793940dddf06e5f38de22aa19e456d1aa3e1da483f.jpg', alt: 'Banner do Filme Gente Grande, com alguns atores descendo o tobogã de água' },
  { id: 2, url: 'https://br.trace.tv/wp-content/uploads/2023/05/Scream6_BR_3840x2160-scaled.jpg', alt: 'Banner do filme pânico com o número em romano e alguns atores em volta' },
  { id: 3, url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgczzwJtZBNkAfv_y1S79280Rco6q_WHplmB9QOTXVkGFv46lSRektWNEw10KTSLy-nagV9z1eFa3-sgKIhKIz40onQsuDTDAIIk22e4BIsbkIINekp4GAfPAlsDvcLPseJrUAwhLYxN9vj/s1600/CeeAdV.jpg', alt: 'Banner do filme Como eu era antes de você, escirto em inglês "Me before you"' },
  { id: 4, url: 'https://static.wixstatic.com/media/272ee3_8da26fe0785f4e10b1de4f1801033254~mv2.png/v1/fill/w_824,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/272ee3_8da26fe0785f4e10b1de4f1801033254~mv2.png', alt: 'Banner do filme Recife Assombrado 2, com a data de lançamento escrito - 23 de outubro' },
];

function Home() {
  const [vencedores, setVencedores] = useState([]);
  const [indicados, setIndicados] = useState([]);
  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    
    const buscarFilmes = async () => {
      try {
        const response = await fetch('http://localhost:8000/filmes');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar filmes da API');
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

        setVencedores(filmesFormatados.slice(0, 5));
        setIndicados(filmesFormatados.slice(5, 10));

      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
        setVencedores([]);
        setIndicados([]);
      }
    };

    buscarFilmes();
    
  }, []); 

  useEffect(() => {
    const timer = setTimeout(() => {
      const proximoSlide = (slideAtual + 1) % DADOS_CARROSSEL.length;
      setSlideAtual(proximoSlide);
    }, 5000);
    return () => clearTimeout(timer);
  }, [slideAtual]);

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

export default Home;