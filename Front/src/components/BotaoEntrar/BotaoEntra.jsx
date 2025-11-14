import React from 'react';
import './BotaoEntrar.css';

function BotaoEntrar({ text, type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      className="botaoEntrar"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default BotaoEntrar;