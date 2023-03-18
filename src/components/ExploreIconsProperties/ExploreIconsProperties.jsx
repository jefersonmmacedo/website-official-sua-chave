import "./exploreIconsProperties.css";
import { IoArrowForward} from "react-icons/io5";
import {RiStore2Line} from "react-icons/ri";
import {MdOutlineMapsHomeWork} from "react-icons/md";
import {TbTractor, TbMap2, TbBuildingFactory} from "react-icons/tb";
import { useFetch } from "../../hooks/useFetch";


export function ExploreIconsProperties({filter}) {

    return (
        <div className="ExploreIconsProperties">
            <div className={filter === true ? "FilterActived" : "FilterInactive"}></div>
            <div className="mainExplorer">
            <div className="textExplore">
                <h2>Explore mais imóveis</h2>
                <h4>Veja os tipos de imóveis mais procurados</h4>

                <a href="/imoveis">Ver todos os imóveis <IoArrowForward /> </a>
            </div>

            <div className="iconsExplore">
            <a href="/imoveis?tipo=Residencial">
                <div className="IconUnicExplore">
                    <MdOutlineMapsHomeWork />
                    <h5>Residenciais</h5>
                </div>
            </a>
            <a href="/imoveis?tipo=Comercial">
                <div className="IconUnicExplore">
                    <RiStore2Line />
                    <h5>Comerciais</h5>
                </div>
                </a>
                <a href="/imoveis?tipo=Rural">
                <div className="IconUnicExplore">
                    <TbTractor />
                    <h5>Rurais</h5>
                </div>
                </a>
                <a href="/imoveis?tipo=Industrial">
                <div className="IconUnicExplore">
                    <TbBuildingFactory />
                    <h5>Industriais</h5>
                </div>
                </a>
                <a href="/imoveis?tipo=Terrenos e Lotes">
                <div className="IconUnicExplore">
                    <TbMap2 />
                    <h5>Terrenos</h5>
                </div>
                </a>
            </div>
            </div>

        </div>
    )
}