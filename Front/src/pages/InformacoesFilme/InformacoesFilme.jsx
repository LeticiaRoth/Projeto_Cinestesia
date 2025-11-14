import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import './InformacoesFilme.css';

function InformacoesFilme() {
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const buscarFilmePorId = async () => {
            setLoading(true);
            setError(null);

            try {

                const response = await fetch(`http://localhost:8000/filmes/${id}`);

                if (!response.ok) {
                    throw new Error('Filme não encontrado.');
                }
                const data = await response.json();
                setFilme(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        buscarFilmePorId();
    }, [id]);

    const renderizarConteudo = () => {
        if (loading) {
            return <p className="mensagemInfo">Carregando...</p>;
        }

        if (error) {
            return <p className="mensagemInfo erro">{error}</p>;
        }

        if (!filme) {
            return null;
        }


        return (
            <div className="containerConteudoInfo">
                <div className="colunaPoster">
                    <img src={filme.poster} alt={`Poster do filme ${filme.titulo}`} className="imagemPoster" />
                </div>
                <div className="colunaDetalhes">
                    <div className="infoBox">
                        <div className="infoBoxHeader">
                            <FaInfoCircle />
                            <h3>INFORMAÇÕES DO FILME</h3>
                        </div>
                        <ul className="infoLista">
                            <li className="infoItem">
                                <span className="infoLabel">NOME:</span>
                                <span className="infoDado">{filme.titulo}</span>
                            </li>
                            <li className="infoItem">
                                <span className="infoLabel">ANO DE LANÇAMENTO:</span>
                                <span className="infoDado">{filme.ano}</span>
                            </li>
                            <li className="infoItem">
                                <span className="infoLabel">DIRETOR:</span>
                                <span className="infoDado">{filme.diretores}</span>
                            </li>
                            <li className="infoItem">
                                <span className="infoLabel">ATOR PRINCIPAL:</span>
                                <span className="infoDado">{filme.atores}</span>
                            </li>
                            <li className="infoItem">
                                <span className="infoLabel">PRODUTORA:</span>
                                <span className="infoDado">{filme.produtora}</span>
                            </li>

                            <li className="infoItem sinopse">
                                <span className="infoLabel">SINOPSE:</span>
                                <p className="infoDado">{filme.sinopse}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );

    };

    return (
        <div className="paginaInfoFilme">
            <div className="containerPaginaInfo">

                <Link to="/" className="botaoVoltarCatalogo">
                    VOLTAR AO CATÁLOGO
                </Link>
                {renderizarConteudo()}
            </div>
        </div>
    );
}

export default InformacoesFilme;