import "./topHeadHome.css"
import { SearchPropertyHomeTop } from "../SearchPropertyHomeTop/SearchPropertyHomeTop";
import image1 from "../../assets/images/background13.jpg";
import image2 from "../../assets/images/background11.jpg";
import image3 from "../../assets/images/background18.jpg";

export function TopHeadHome() {
    return (
        <div className="TopHeadHome">
            <div className="blockTop">
            <div className="SearchText">
                <div className="TextTopSearch">
                <h1>Seu <span>novo imóvel</span>, <br /> você encontra aqui!</h1>
                <h4>As melhores ofertas de imóveis na sua cidade!</h4>
                </div>

                <SearchPropertyHomeTop />
            </div>

            <div className="ImagesTop">
                <div className="imagesLeft">
                    <div className="image">
                        <img src={image1} alt="" />
                    </div>
                    <div className="image">
                        <img src={image2} alt="" />
                    </div>
                </div>
                <div className="imagesRigth">
                    <div className="image">
                        <img src={image3} alt="" />
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}