import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import BotoesAprovacao from '../../components/BotoesAprovacao/BotoesAprovacao.jsx';
import './AdminHome.css';

const DADOS_CARROSSEL = [
    { id: 1, url: 'https://wallpapers.com/images/featured/avengers-endgame-mghdp4gaqzu4q4us.jpg', alt: 'Banner Vingadores' },
    { id: 2, url: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2070&auto=format&fit=crop', alt: 'Banner Filmes 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2070&auto=format&fit=crop', alt: 'Banner Filmes 3' },
    { id: 4, url: 'https://images.unsplash.com/photo-1627843563095-f6e9467c6c28?q=80&w=1974&auto=format&fit=crop', alt: 'Banner Filmes 4' },
];

function CardPedido({ filme, token, onFilmeProcessado }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAprovar = async () => {
        if (!window.confirm(`Aprovar o filme: "${filme.titulo}"?`)) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8000/filmes/approve/${filme.id_filme}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Falha ao aprovar o filme.');
            alert('Filme aprovado com sucesso!');
            onFilmeProcessado(filme.id_filme);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRecusar = async () => {
        if (!window.confirm(`RECUSAR e DELETAR o filme: "${filme.titulo}"? Esta ação é permanente.`)) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8000/filmes/${filme.id_filme}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Falha ao recusar/deletar o filme.');
            alert('Filme recusado e deletado com sucesso.');
            onFilmeProcessado(filme.id_filme);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cardPedidoItem">
            <h4>{filme.titulo} ({filme.ano})</h4>
            <p>Status: <strong>{filme.status_aprovacao}</strong></p>
            {error && <p className="mensagemErro">{error}</p>}
            <BotoesAprovacao
                onAceitar={handleAprovar}
                onRecusar={handleRecusar}
                isDisabled={loading}
            />
        </div>
    );
}

/* Página Inicial do Administrador */
function AdminHome() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const [slideAtual, setSlideAtual] = useState(0);

    useEffect(() => {
        if (user.token) {
            const buscarPedidos = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch('http://localhost:8000/filmes/pending', {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    });
                    if (response.status === 403) throw new Error('Acesso negado.');
                    if (!response.ok) throw new Error('Falha ao buscar pedidos pendentes.');

                    const data = await response.json();
                    setPedidos(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            buscarPedidos();
        }
    }, [user.token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const proximoSlide = (slideAtual + 1) % DADOS_CARROSSEL.length;
            setSlideAtual(proximoSlide);
        }, 5000);
        return () => clearTimeout(timer);
    }, [slideAtual]);

    const irParaSlide = (index) => setSlideAtual(index);

    const handleFilmeProcessado = (idFilmeProcessado) => {
        setPedidos(pedidosAtuais =>
            pedidosAtuais.filter(filme => filme.id_filme !== idFilmeProcessado)
        );
    };

    const renderizarPedidos = () => {
        if (loading) return <p className="mensagemCarregando">Carregando pedidos...</p>;
        if (error) return <p className="mensagemErro">{error}</p>;
        if (pedidos.length === 0) {
            return <p>Nenhum filme pendente de aprovação. Ótimo trabalho!</p>;
        }
        return (
            <div className="listaPedidos">
                {pedidos.map(filme => (
                    <CardPedido
                        key={filme.id_filme}
                        filme={filme}
                        token={user.token}
                        onFilmeProcessado={handleFilmeProcessado}
                    />
                ))}
            </div>
        );
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

            <section className="secaoPedidosAdmin">
                <h2>Filmes Pendentes de Aprovação</h2>
                {renderizarPedidos()}
            </section>
        </div>
    );
}

export default AdminHome;