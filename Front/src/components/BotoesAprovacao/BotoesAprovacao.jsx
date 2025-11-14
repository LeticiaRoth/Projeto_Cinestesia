import './BotoesAprovacao.css';

/**
 * 
 * @param {object} props
 * @param {function} props.onAceitar 
 * @param {function} props.onRecusar  
 * @param {boolean} props.isDisabled 
 */

function BotoesAprovacao({ onAceitar, onRecusar, isDisabled }) {
    return (
        <div className="botoesContainer">
            <button className="botao aprovacao aceitar" onClick={onAceitar} disabled={isDisabled}>
                {isDisabled ? 'Processando...' : 'ACEITAR'}
            </button>
            <button className="botao aprovacao recusar" onClick={onRecusar} disabled={isDisabled}>
                RECUSAR
            </button>
        </div>
    );
}

export default BotoesAprovacao;