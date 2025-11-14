import { Link } from 'react-router-dom';
import './FooterAdmin.css';

function Footer() {
    return (
        <footer className="footerPrincipal">
            <div className="linhaDivisoriaSuperior"></div>

            <div className="containerFooter">
                <div className="conteudoFooter">
                    <div className="colunaFooter" id="footerLinks">
                        <h4>Links</h4>
                        <ul className="listaLinks">
                            <li><Link to="/admin/catalogo">Página Catálogo Filmes</Link></li>
                            <li><Link to="/admin/adicionar">Página Adicionar Filmes</Link></li>
                            <li><Link to="/admin">Página Início</Link></li>
                        </ul>
                    </div>

                    <div className="colunaFooter" id="footerSobre">
                        <h4>Sobre nós</h4>
                        <p>Uma plataforma que visa te deixar ligado do que há de mais novo no mundo do cinema.</p>
                    </div>

                    <div className="colunaFooter" id="footerContato">
                        <h4>Contato</h4>
                        <p>@cinestesia@gmail.com</p>
                        <p>(19) 7902-9862</p>
                    </div>
                </div>

                <hr className="linhaDivisoriaInferior" />
            </div>
        </footer>
    );
}

export default Footer;