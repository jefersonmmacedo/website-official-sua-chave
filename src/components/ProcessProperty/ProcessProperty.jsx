import "./processProperty.css"
import {IoSearchOutline, IoCalendarOutline, IoIdCardOutline, IoQrCodeOutline, IoHomeOutline} from "react-icons/io5";
import {BsPatchCheck} from "react-icons/bs";
 export function ProcessProperty() {
    return (
        <div className="ProcessProperty">
            <div className="processUnicText">
                <h3>Veja como anúnciar seu imóvel</h3>
                <h6>Veja os 3 passos</h6>
            </div>
            <div className="processUnic">
                <IoIdCardOutline />
                <h5>Faça seu cadastro</h5>
            </div>
            <div className="processUnic">
                <IoQrCodeOutline />
            <h5>Escolha o plano ideal</h5>
            </div>
            <div className="processUnic">
                <IoHomeOutline />
            <h5>Cadastre seus imóveis</h5>
            </div>
        </div>
    )
}


