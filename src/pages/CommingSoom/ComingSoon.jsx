import "./comingSoon.css"
import Logo from "../../assets/images/Logo.png";
import Notebook from "../../assets/images/svg/comming2.svg";
import { IoAlarmOutline } from "react-icons/io5";
import { WaitingList } from "../../components/WaitingList/WaitingList";

export function ComingSoon() {
    return(
        <div className="ComingSoon">
            <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
            
            <h2>Encontre imóveis, imobiliárias e <br />corretores em poucos cliques!</h2>

            <img src={Notebook} alt="Notebook" />
            <div className="coming">
                <h4><IoAlarmOutline />Estamos quase prontos...</h4>

                <WaitingList />
            </div>
            

                
        </div>
    )
}