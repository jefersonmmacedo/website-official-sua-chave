import "./confirmedSend.css"
import Logo from "../../assets/images/Logo.png";
import Send from "../../assets/images/svg/send.svg";
import { IoAlarmOutline } from "react-icons/io5";

export function ConfirmedSend() {
    return(
        <div className="ConfirmedSend">
            <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
            
            <h2>Imóvel enviado com sucesso!</h2>
            <h4>Em breve a imobiliária entrará em contato</h4>

            <img src={Send} alt="Notebook" />
            <div className="coming">
                <h4><IoAlarmOutline />O que deseja fazer a seguir?</h4>

                <div className="buttons">
                    <a href="/">Ir para a home</a>
                    <a href="/minhaconta">Ir para a minha conta</a>
                </div>
            </div>
            

                
        </div>
    )
}