import "./favorites.css"
import Navbar2 from "../../components/Nav/Navbar";
import { Favorite } from "../../components/Favorite/Favorite";
import { Footer } from "../../components/Footer/Footer";
import { ToolBarClient } from "../../components/ToolBarClient/ToolBarClient";

export function Favorites() {
    return (
        <div className="Favorites">
            <Navbar2 />

            <div className="main">
                <ToolBarClient />
                <div className="aside">
                <h2>Meus favoritos</h2>
            <Favorite />
                </div>
            </div>


        <div className="viewFooter">
            <Footer />
        </div>
        </div>
    )
}