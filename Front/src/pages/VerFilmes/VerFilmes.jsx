import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardFilmes from '../../components/CardFilmes/CardFilmes.jsx';
import { FaSearch } from 'react-icons/fa';
import './VerFilmes.css';

function VerFilmes() {
    const [filmes, setFilmes] = useState([]);

    const [generos, setGeneros] = useState([]);
    const [anos, setAnos] = useState([]);

    const [generoSelecionado, setGeneroSelecionado] = useState('');
    const [anoSelecionado, setAnoSelecionado] = useState('');
    const [termoBusca, setTermoBusca] = useState('');

    const [loadingFilmes, setLoadingFilmes] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const buscarFiltros = async () => {
            try {
                const resGeneros = await fetch('http://localhost:8000/generos');
                if (!resGeneros.ok) throw new Error('Falha ao buscar gêneros');
                const dataGeneros = await resGeneros.json();
                setGeneros(dataGeneros);

                const resAnos = await fetch('http://localhost:8000/anos');
                if (!resAnos.ok) throw new Error('Falha ao buscar anos');
                const dataAnos = await resAnos.json();
                setAnos(dataAnos);

            } catch (err) {
                console.error("Erro ao carregar filtros:", err);
                setError("Erro ao carregar filtros. Tente novamente.");
            }
        };

        buscarFiltros();
    }, []);

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
                    <CardFilmes 
                        key={filme.id} 
                        filme={filme} 
                        onFilmeDeleted={handleFilmeDeleted}
                    />
                ))}
            </div>
        );
    };

    const handleFilmeDeleted = (idFilmeExcluido) => {
        setFilmes(filmesAtuais => 
            filmesAtuais.filter(filme => filme.id !== idFilmeExcluido)
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
                            <option key={genero.id_genero} value={genero.nome}>
                                {genero.nome}
                            </option>
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