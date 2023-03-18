import "./downloadApp.css";
import {IoLogoGooglePlaystore, IoLogoApple} from 'react-icons/io5';
import auto1 from '../../assets/images/auto1.png'
import auto2 from '../../assets/images/auto2.png'

export function DownloadApp() {
    return (
        <div className="DownloadApp">
            {/* <div className="back">
            <div className="textSession">
                <h1>As melhores ofertas de imóveis na palma da sua mão!</h1>
                <h4>Em breve nas melhores lojas de aplicativos.</h4>
                <div className="Apps">
                <div className="buttonsApps">
                    <div className="iconApp">
                        <IoLogoGooglePlaystore />
                    </div>
                    <div className="TextApp">
                        <h6>Em breve na</h6>
                        <h4>Play Store</h4>
                    </div>
                </div>
                <div className="buttonsApps">
                    <div className="iconApp">
                        <IoLogoApple />
                    </div>
                    <div className="TextApp">
                        <h6>Em breve na</h6>
                        <h4>Apple Store</h4>
                    </div>
                </div>
                </div>
            </div>
            <div className="imageApp">
                <img src={iphone2} alt="iPhone" />
            </div>
            </div> */}
            <div className="imageAuto1">
                <img src={auto1} alt="" />
            </div>
            <div className="imageAuto2">
                <img src={auto2} alt="" />
            </div>
        </div>
    )
}