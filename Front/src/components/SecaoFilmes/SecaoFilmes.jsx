import CardFilmes from "../CardFilmes/CardFilmes.jsx";
import "../SecaoFilmes/SecaoFilmes.css";

function SecaoFilmes({ titulo, filmes }) {
    const filmesExibidos = filmes.slice(0, 5);

    return (
        <>
            <h2 className="tituloSecao">{titulo}</h2>
            <section className="secaoFilmes">
                <ul className="listaFilmes">
                    {filmesExibidos.map((filme) => (
                        <li key={filme.id} className="itemFilme">
                            <CardFilmes filme={filme} />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default SecaoFilmes;