import './BotaoFormulario.css';

function BotaoFormulario({ onClick, text, type = 'button', variant = 'salvar', disabled = false }) {
    return (
        <button type={type} className={`botaoFormulario ${variant}`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default BotaoFormulario;