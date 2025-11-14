import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BotaoFormulario from '../../components/BotaoFormulario/BotaoFormulario';
import { useAuth } from '../../context/AuthContext';
import './EdicaoAdmin.css';

function EdicaoAdmin() {
    const [formData, setFormData] = useState({
        titulo: '',
        ano: '',
        sinopse: '',
        poster: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        const fetchFilme = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/filmes/${id}`);
                if (!response.ok) throw new Error('Filme não encontrado.');
                const data = await response.json();
                
                setFormData({
                    titulo: data.titulo || '',
                    ano: data.ano || '',
                    sinopse: data.sinopse || '',
                    poster: data.poster || '',
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFilme();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => navigate('/verFilmes');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!user || !user.token) {
            setError('Você precisa estar logado.');
            setLoading(false);
            return;
        }

        const dadosParaEnviar = {
            titulo: formData.titulo,
            ano: parseInt(formData.ano) || null,
            sinopse: formData.sinopse,
            poster: formData.poster,
        };

        try {
            const response = await fetch(`http://localhost:8000/filmes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (!response.ok) throw new Error('Falha ao atualizar o filme.');
            const data = await response.json();

            if (data.status === 'Pendente_Edicao') {
                alert('Filme atualizado! Suas mudanças aguardam aprovação de um administrador.');
            } else {
                alert('Filme atualizado com sucesso!');
            }

            navigate('/verFilmes');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.titulo) {
        return <p className="carregandoFilme">Carregando dados do filme...</p>;
    }

    return (
        <div className="paginaAdicionarFilme">
            <div className="containerFormulario">
                <header className="headerFormulario">
                    <h1>EDIÇÃO DE FILME</h1>
                    <p>Atualize as informações do filme: {formData.titulo}</p>
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
                        <label htmlFor="sinopse" className="sr-only">Sinopse (255 caracteres)</label>
                        <input type="text" id="sinopse" name="sinopse" placeholder="SINOPSE (255 CARACTERES)" value={formData.sinopse} onChange={handleChange} className="inputCampo" maxLength="255" />
                    </div>
                    
                    {error && <div role="alert" className="mensagemErroForm">{error}</div>}
                    
                    <div className="containerBotoes">
                        <BotaoFormulario text="CANCELAR" variant="cancelar" onClick={handleCancel} />
                        <BotaoFormulario text={loading ? 'SALVANDO...' : 'SALVAR'} variant="salvar" type="submit" disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EdicaoAdmin;