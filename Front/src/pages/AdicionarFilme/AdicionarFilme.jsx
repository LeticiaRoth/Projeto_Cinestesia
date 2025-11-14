import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BotaoFormulario from '../../components/BotaoFormulario/BotaoFormulario';
import { useAuth } from '../../context/AuthContext';
import './AdicionarFilme.css';

function AdicionarFilme() {
    const [formData, setFormData] = useState({
        titulo: '',
        ano: '',
        diretor: '',
        ator: '',
        produtora: '',
        sinopse: '',
        poster: '',
        generoId: ''
    });
    const [generosList, setGenerosList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const response = await fetch('http://localhost:8000/generos');
                if (!response.ok) {
                    throw new Error('Falha ao buscar gêneros');
                }
                const data = await response.json();
                setGenerosList(data);
            } catch (err) {
                console.error(err);
                setGenerosList([{ id_genero: 1, nome: 'Ação' }, { id_genero: 2, nome: 'Comédia' }]);
            }
        };
        fetchGeneros();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = () => {
        navigate('/verFilmes');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!user || !user.token) {
            setError('Você precisa estar logado para adicionar um filme.');
            setLoading(false);
            return;
        }

        const dadosParaEnviar = {
            titulo: formData.titulo,
            ano: parseInt(formData.ano) || null,
            sinopse: formData.sinopse,
            poster: formData.poster,
            produtora_nome: formData.produtora,
            diretor_nome: formData.diretor,
            ator_nome: formData.ator,
            generos: formData.generoId ? [parseInt(formData.generoId)] : []
        };

        try {
            const response = await fetch('http://localhost:8000/filmes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (!response.ok) {
                const resErr = await response.json();
                throw new Error(resErr.error || 'Falha ao cadastrar o filme.');
            }

            alert('Filme cadastrado com sucesso! Ele ficará pendente de aprovação.');
            navigate('/verFilmes');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="paginaAdicionarFilme">
            <div className="containerFormulario">
                <header className="headerFormulario">
                    <h1>CADASTRO DE FILMES</h1>
                    <p>CADASTRE UM NOVO FILME NO NOSSO CATÁLOGO</p>
                </header>

                <form className="formAdicionar" onSubmit={handleSubmit}>

                    <div className="formInputContainer">
                        <div className="numeroInput">1</div>
                        <label htmlFor="titulo" className="sr-only">Nome do filme</label>
                        <input type="text" id="titulo" name="titulo" placeholder="NOME DO FILME" value={formData.titulo} onChange={handleChange} className="inputCampo" required />
                    </div>

                    <div className="formInputContainer">
                        <div className="numeroInput">2</div>
                        <label htmlFor="ano" className="sr-only">Ano de lançamento</label>
                        <input type="number" id="ano" name="ano" placeholder="ANO DE LANÇAMENTO" value={formData.ano} onChange={handleChange} className="inputCampo" />
                    </div>

                    <div className="formInputContainer">
                        <div className="numeroInput">3</div>
                        <label htmlFor="poster" className="sr-only">Link do Poster</label>
                        <input type="text" id="poster" name="poster" placeholder="LINK (URL) DO POSTER DO FILME" value={formData.poster} onChange={handleChange} className="inputCampo" required />
                    </div>

                    <div className="formInputContainer">
                        <div className="numeroInput">4</div>
                        <label htmlFor="generoId" className="sr-only">Gênero</label>
                        <select
                            id="generoId"
                            name="generoId"
                            value={formData.generoId}
                            onChange={handleChange}
                            className="inputCampo"
                            required
                        >
                            <option value="">SELECIONE UM GÊNERO</option>
                            {generosList.map(genero => (
                                <option key={genero.id_genero} value={genero.id_genero}>
                                    {genero.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="formInputContainer">
                        <div className="numeroInput">5</div>
                        <label htmlFor="diretor" className="sr-only">Diretor principal</label>
                        <input type="text" id="diretor" name="diretor" placeholder="DIRETOR PRINCIPAL DO FILME" value={formData.diretor} onChange={handleChange} className="inputCampo" />
                    </div>

                    <div className="formInputContainer">
                        <div className="numeroInput">6</div>
                        <label htmlFor="ator" className="sr-only">Ator principal</label>
                        <input type="text" id="ator" name="ator" placeholder="ATOR PRINCIPAL" value={formData.ator} onChange={handleChange} className="inputCampo" />
                    </div>

                    <div className="formInputContainer">
                        <div className="numeroInput">7</div>
                        <label htmlFor="produtora" className="sr-only">Produtora do filme</label>
                        <input type="text" id="produtora" name="produtora" placeholder="PRODUTORA DO FILME" value={formData.produtora} onChange={handleChange} className="inputCampo" />
                    </div>

                    <div className="formInputContainer">
                        <div className="numeroInput">8</div>
                        <label htmlFor="sinopse" className="sr-only">Sinopse (255 caracteres)</label>
                        <input type="text" id="sinopse" name="sinopse" placeholder="SINOPSE (255 CARACTERES)" value={formData.sinopse} onChange={handleChange} className="inputCampo" maxLength="255" />
                    </div>

                    {error && <div role="alert" className="mensagemErroForm">{error}</div>}

                    <div className="containerBotoes">
                        <BotaoFormulario text="CANCELAR" variant="cancelar" onClick={handleCancel} />
                        <BotaoFormulario text="SALVAR" variant="salvar" type="submit" disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdicionarFilme;