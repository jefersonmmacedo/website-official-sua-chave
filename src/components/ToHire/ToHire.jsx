import ImageContract from "../../assets/images/background8.jpg";
import {IoCalendarOutline, IoChatboxEllipsesOutline, IoDesktopOutline, IoFunnelOutline, IoHomeOutline, IoOptionsOutline} from "react-icons/io5"
import {SlScreenDesktop} from "react-icons/sl"
import "./toHire.css";
export function ToHire() {
    return (
        <div className="ToHire">
            <div className="imageToHire">
                <div className="imgToHireIn">
                <img src={ImageContract} alt="" />
                </div>
            </div>
            <div className="textToHire">
                <h2>Veja o que podemos fazer pela sua <span>imobiliária:</span> </h2>
                <div className="itensToHire">
                    <div className="ToHireUnic">
                    <IoHomeOutline />
                        <h5>Anúncios ilimitados</h5>
                    </div>
                    <div className="ToHireUnic">
                    <IoCalendarOutline />
                        <h5>Agenda de visitas</h5>
                    </div>
                    <div className="ToHireUnic">
                    <IoChatboxEllipsesOutline />
                        <h5>Chat único por anúncio</h5>
                    </div>
                    <div className="ToHireUnic">
                        <IoFunnelOutline />
                        <h5>Leads qualificados</h5>
                    </div>
                    <div className="ToHireUnic">
                        <SlScreenDesktop />
                        <h5>Site responsivo</h5>
                    </div>
                   
                </div>
                <a href="/anunciar">Quero anunciar</a>
            </div>
        </div>
    )
}