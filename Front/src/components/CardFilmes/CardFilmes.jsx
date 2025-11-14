import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BotaoDetalhes from '../BotaoDetalhes/BotaDetalhes.jsx';
import './CardFilmes.css';

function CardFilmes({ filme, onFilmeDeleted }) {
    const { user } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!window.confirm(`Tem certeza que deseja excluir "${filme.titulo}"?`)) {
            return;
        }
        
        setIsDeleting(true);
        setError(null);
        
        try {
            const response = await fetch(`http://localhost:8000/filmes/${filme.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                const resErr = await response.json();
                throw new Error(resErr.error || 'Falha ao excluir.');
            }
            
            alert('Filme excluído com sucesso!');
            onFilmeDeleted(filme.id);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="cardFilme" id={`filme-${filme.id}`}>
            <img src={filme.poster} alt={`Poster de ${filme.titulo}`} className="cardPoster" />
            <div className="cardInfo">
                <h3 className="cardTitulo">{filme.titulo}</h3>
                <p className="cardDetalhe">Diretor: {filme.diretor}</p>
                <p className="cardDetalhe">Elenco: {filme.elenco}</p>
                <p className="cardDetalhe">{filme.ano} | {filme.genero}</p>
                
                {user.role !== 'admin' && (
                    <BotaoDetalhes idFilme={filme.id} />
                )}

                {user.role === 'admin' && (
                    <div className="adminBotoes">
                        <Link to={`/filme/editar/${filme.id}`} className="botaoAdmin editar">
                            EDITAR
                        </Link>
                        <button onClick={handleDelete} className="botaoAdmin excluir" disabled={isDeleting}>
                            {isDeleting ? 'EXCLUINDO...' : 'EXCLUIR'}
                        </button>
                    </div>
                )}
                
                {error && <p className="mensagemErroCard">{error}</p>}
            </div>
        </div>
    );
}

export default CardFilmes;