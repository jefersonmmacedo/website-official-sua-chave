import "./footer.css";
import logo from '../../assets/images/Logo.png';
import { IoLogoWhatsapp, IoMailOutline, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube} from 'react-icons/io5';

export function Footer() {
    const date = new Date().getFullYear();
    return (
        <div className="Footer">
                <div className="sections">
                        <div className="sectionUnic">
                        <a href="/"><img src={logo} alt="" /></a>
                            <h5> <b>Encontre imóveis, imobiliárias e corretores em poucos cliques!</b> </h5>
                            <br />
                            <div className="network">
                                <a href="https://www.facebook.com/suachave.br" target="_blank" rel="noreferrer" className="networkButton"><IoLogoFacebook/></a>
                                <a href="https://www.instagram.com/suachave.br/" target="_blank" rel="noreferrer" className="networkButton"><IoLogoInstagram/></a>
                                <a href="https://www.linkedin.com/company/sua-chave/" target="_blank" rel="noreferrer" className="networkButton"><IoLogoLinkedin/></a>
                                <a href="https://www.youtube.com/@suachave" target="_blank" rel="noreferrer" className="networkButton"><IoLogoYoutube/></a>
                            </div>
                        </div>
                        <div className="sectionUnic">
                            <h3>SUA CHAVE</h3>
                                <h5><a href="/sobre">Sobre nós</a></h5>
                                <h5><a href="/planos">Planos</a></h5>
                                <h5><a href="/anunciar">Para imobiliárias</a></h5>
                                <h5><a href="#">Integração com portais</a></h5>
                                <h5><a href="#">Site para seu negócio</a></h5>
                                <h5><a href="#">Tour Virtual [Em breve]</a></h5>
                        </div>
                        <div className="sectionUnic">
                            <h3>CENTRAL DE AJUDA</h3>
                            <h5><a href="/faq">Faq</a></h5>
                            <h5><a href="/termos">Termos de uso</a></h5>
                            <h5><a href="/privacidade">Política de privacidade</a></h5>
                            <h5><a href="/lgpd">LGPD</a></h5>
                            <h5><a href="/faleconosco">Fale conosco</a></h5>
                        </div>
                        <div className="sectionUnic">
                        <h3>ATENDIMENTO</h3>
                            <h5><IoLogoWhatsapp />(21) 99742-9585</h5>
                            <h5><IoMailOutline />contato@suachave.com.br</h5>
                            <div className="network">
                            </div>
                        </div>
                </div>
                <div className="copy">
                    <h5>© Sua Chave {date}. Todos os direitos reservados</h5>
                    <h5><a href="/anunciar">Anunciar imóvel</a></h5>
                </div>
        </div>
    )
}

 {/* <h3>BAIXE AGORA:</h3>
                            <div className="apps">
                                <div className="app">
                                <h5>Clientes</h5>
                                <div className="logos">
                                <a href="/"><img src={google} alt="" /></a>       
                                <a href="/"><img src={apple} alt="" /></a>       
                                </div>
                                </div>
                                <div className="app">
                                <h5>Imobiliária</h5>
                                <div className="logos">
                                <a href="/"><img src={google} alt="" /></a>       
                                <a href="/"><img src={apple} alt="" /></a>         
                                </div>
                                </div>
                            </div> */}