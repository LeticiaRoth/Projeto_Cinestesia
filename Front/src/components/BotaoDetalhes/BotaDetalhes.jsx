import React from 'react';
import { Link } from 'react-router-dom';
import './BotaoDetalhes.css';

function BotaoDetalhes({ idFilme }) {
  return (
    <Link to={`/filme/${idFilme}`} className="botaoVerDetalhes">
      VER DETALHES
    </Link>
  );
}

export default BotaoDetalhes;