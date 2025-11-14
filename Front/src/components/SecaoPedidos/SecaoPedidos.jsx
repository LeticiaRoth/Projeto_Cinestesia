import CardFilmes from "../CardFilmes/CardFilmes.jsx";
import ".SecaoPedidos.css";

function SecaoFilmes({ titulo, filmes }) {
  // Mostra apenas os 5 primeiros filmes
  const filmesExibidos = filmes.slice(0, 5);

  return (
    <>
    <h2 className="tituloSecao">{titulo}</h2>
    <section className="secaoFilmes">
      
      <ul className="listaFilmes">
        {filmesExibidos.map((filme) => (
          <li key={filme.id} className="itemFilme">
            <CardPedidos filme={filme} />
          </li>
        ))}
      </ul>
    </section>
    </>
  );
}

export default SecaoFilmes;
