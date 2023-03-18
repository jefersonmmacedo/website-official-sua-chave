import "./finance.css";
import {FaHandshake, FaRegHandshake} from "react-icons/fa"
import {IoDesktopOutline, IoHomeOutline} from "react-icons/io5"
import { RiExchangeDollarLine } from "react-icons/ri";

export function Finance() {
    return (
        <div className="Finance">
            <div className="simulation">
            <div className="simulationBox">
                <div className="iconFinance">
            <RiExchangeDollarLine />
                </div>
            <h2>Quer financiar?</h2>
            <h4> Simule um valor de entrada e descubra quanto vão custar as parcelas do seu próximo imóvel.</h4>
            <a href="/financiamento">Faça uma simulação</a>
            </div>
            </div>
            <div className="simulation">
                <div className="simulationBox">
                <div className="iconFinance">
                <FaHandshake />
                </div>

            <h2>Quer vender?</h2>
            <h4> Cadastre seu imóvel, escolha uma de nossas imobiliárias para uma avaliação profissional!</h4>
            <a href="/avaliacao">Avaliar meu imóvel</a>
                </div>
            </div>
        </div>
    )
}