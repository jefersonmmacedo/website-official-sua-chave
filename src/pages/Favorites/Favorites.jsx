import "./favorites.css"
import Navbar2 from "../../components/Nav/Navbar";
import { Favorite } from "../../components/Favorite/Favorite";
import { Footer } from "../../components/Footer/Footer";
import { ToolBarClient } from "../../components/ToolBarClient/ToolBarClient";
import { IoRefreshOutline } from "react-icons/io5";

export function Favorites() {

    function realoadPage() {
        window.location.reload(false);
    }
    return (
        <div className="Favorites">
            <Navbar2 />

            <div className="main">
                <ToolBarClient />
                <div className="aside">
                <div className="textTop">
                <h3>Meus favoritos</h3>
                <button onClick={realoadPage}><IoRefreshOutline /> Atualizar</button>
                </div>
            <Favorite />
                </div>
            </div>


        <div className="viewFooter">
            <Footer />
        </div>
        </div>
    )
}