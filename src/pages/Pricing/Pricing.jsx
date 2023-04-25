import "./pricing.css";
import Navbar2 from "../../components/Nav/Navbar";
import { Plains } from "../../components/Plains/Plains";
import { Footer } from "../../components/Footer/Footer";
import {MdAlarm} from "react-icons/md"
import integracoes from '../../assets/images/integracoes.png'

export function Pricing() {
    return (
        <div className="Pricing">
            <Navbar2 />
            <h2>Escolha o <span>plano ideal</span> para o seu negócio</h2>
            <h4>Cada plano atende a uma necessidade, de acordo com as ferramentas oferecidas. <br/>Você poderá alterar a qualquer momento.</h4>

            <Plains />
            {/* <a href="https://wa.me/5521997429585?text=Olá. Gostaria de saber mais detalhes sobre os planos e serviços que a Sua Chave pode me oferecer" target="_Blank">
                <img className="image" src={integracoes} alt="Propaganda de integrações" />
            </a> */}

            <div className="future">
                <h4>Serviços disponíveis <span>em breve</span>:</h4>
                {/* <h5><MdAlarm /> Integração com portais</h5>
                <h5><MdAlarm /> Assinatura digital de contratos</h5>
                <h5><MdAlarm /> Tour virtual para os imóveis (360º)</h5> */}
                <h5><MdAlarm /> Sistema de controle aluguel (Pagamentos e suporte)</h5>
                <h5><MdAlarm /> Google analytcs</h5>
                <h5><MdAlarm /> Processo de compra e aluguel de imóvel online</h5>
                <h5><MdAlarm /> Aplicativo para gerenciamento de sua imobiliária</h5>
                <h5><MdAlarm /> Marketing digital especializado</h5>
                <h5><MdAlarm /> Contas de email personalizadas</h5>
                <h5><MdAlarm /> Disparo de e-mail automático personalizável</h5> 
            </div>

            <Footer />
        </div>
    )
}