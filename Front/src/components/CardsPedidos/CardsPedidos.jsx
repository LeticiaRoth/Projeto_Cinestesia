import './CardsPedidos.css';
import BotoesAprovacao from '../BotoesAprovacao/BotoesAprovacao.jsx';

function CardFilmes({ filme }) {
    return (
        <div className="cardFilme" id={`filme-${filme.id}`}>
            <img src={filme.poster} alt={`Poster de ${filme.titulo}`} className="cardPoster" />
            <div className="cardInfo">
                <h3 className="cardTitulo">{filme.titulo}</h3>
                <p className="cardDetalhe">Diretor: {filme.diretor}</p>
                <p className="cardDetalhe">{filme.ano} | {filme.genero}</p>
                <BotoesAprovacao />
            </div>
        </div>
    );
}

export default CardFilmes;