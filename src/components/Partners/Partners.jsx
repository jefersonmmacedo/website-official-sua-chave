import "./partners.css";
import {GiProtectionGlasses} from "react-icons/gi"
import { IoExtensionPuzzle } from "react-icons/io5";
import {TbAugmentedReality} from "react-icons/tb"

export function Partners() {
    return (
        <div className="Partners">
            <div className="simulation">
            <div className="simulationBox">
                <div className="iconPartners">
            <TbAugmentedReality />
                </div>
            <h2>Tour Virtual de imóveis</h2>
            <h4> Crie experiências incríveis utilizando nossa plataforma apresentando seus imóveis de uma forma inovadora!</h4>
            {/* <a href="/financiamento">Saber mais sobre o Tour Virual</a> */}
            </div>
            </div>
            <div className="simulation">
                <div className="simulationBox">
                <div className="iconPartners">
                <IoExtensionPuzzle />
                </div>

            <h2>Integração com Portais</h2>
            <h4> Anuncie com a gente e tenha todos os seus imóveis nos maiores e principais portais e mídias do Brasil!</h4>
            {/* <a href="/avaliacao">Saber mais sobre Integrações</a> */}
                </div>
            </div>
        </div>
    )
}