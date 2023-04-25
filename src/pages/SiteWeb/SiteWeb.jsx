import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";

export function SiteWeb() {
    return (
        <div className="SiteWeb">
            <Navbar2 />

            <div className="boxTop">
                <div className="textTop">
                        <h1>Um site único para seu negócio</h1>
                        <h3>Toralmente integrado ao nosso sistema</h3>
                        <div className="buttons">
                            <button> Falar com time comercial</button>
                            <button> Criar minha conta agora</button>
                        </div>
                </div>
                <div className="imageTop">

                </div>
            </div>
            <div className="infos">
                <div className="infosIcons">
                </div>
                <div className="infosIcons">
                </div>
                <div className="infosIcons">
                </div>
                <div className="infosIcons">
                </div>
                <div className="TextInfo">

                </div>
            </div>
            <div className="video">

            </div>

            <div className="models">
                <div className="model">    
                </div>
                <div className="model">    
                </div>
                <div className="model">    
                </div>
            </div>

            <div className="contact">

            </div>

            <Footer />
        </div>
    )
}