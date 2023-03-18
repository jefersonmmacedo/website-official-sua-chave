import "./sliderHome.css";
import {IoCrop, IoArrowBack, IoArrowForward, IoLocationOutline, IoBedOutline, IoCarSportOutline} from 'react-icons/io5';
import {TfiRulerAlt2} from 'react-icons/tfi';
import {MdOutlineShower} from 'react-icons/md';
import {TbBath, TbBone, TbSofa} from 'react-icons/tb';
import imageBack from "../../assets/images/background15.jpg"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useFetch } from "../../hooks/useFetch";

function SliderHome() {
    const availability = "Disponível";

    const {data} = useFetch(`/property/all/${availability}`);

    if(data) {
        console.log(data);
    }

    if(!data) {
        return (
            <div className="each-slide-effectLoading">
            <div className="imageTopLoading">
            <div className="imageLoading">
                 <a href="">
                    <img src={imageBack} alt="" />
                </a>
            </div>
            <div className="blockSliderLoading">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            </div>
            </div>
        )
    }

const buttonStyle = {
  padding: '10px',
  borderRadius: '50%',
  background: 'rgba(128,128,128, 0.5)',
  color: '#fff',
  border: '0px',
  margin: '10px'
};

const properties = {
  prevArrow: <button style={{ ...buttonStyle }}><IoArrowBack/></button>,
  nextArrow: <button style={{ ...buttonStyle }}><IoArrowForward/></button>
}
   
    return (
      <Slide {...properties}>
          {data?.map((property) => {
            return (
                <div className="each-slide-effect" key={property.id}>
          <div className="imageTop">
            <div className="image">
                 <a href={`/imovel/${property.id}`}>
                    <img src={property.featuredImage} alt="" />
                </a>
            </div>
                <div className="blockSlider">
                {new Date(property?.created_at).getDate() === new Date().getDate() &&
                    new Date(property?.created_at).getMonth() === new Date().getMonth() &&
                    new Date(property?.created_at).getFullYear() === new Date().getFullYear()
                    ?
                    <div className="featured">
                        <p>Novo</p>
                    </div>
                    : ""
                    } 
                     <a href={`/imovel/${property.id}`}>
                    <h3>{property.title}</h3>
                    </a>
                    <h5><IoLocationOutline /> {property.road} - {property.district} - {property.city} - {property.uf}</h5>
                    <div className="icons">
                    {property.bedroom === "" ? "" :
                        <div className="iconUnic">
                                <IoBedOutline />
                            <div className="simbol">
                            <p>{property.bedroom} Quartos</p>
                            </div>
                        </div>
                    }
                        {property.suite === "" ? "" :
                        <div className="iconUnic">
                                <TbBath />
                            <div className="simbol">
                            <p>{property.suite} Suítes</p>
                            </div>
                        </div>
                        }
                        {property.restroom === "" ? "" :
                        <div className="iconUnic">
                                <MdOutlineShower />
                            <div className="simbol">
                            <p>{property.restroom} Banheiro</p>
                            </div>
                        </div>
                        }
                        {property.garage === "" ? "" :
                        <div className="iconUnic">
                                <IoCarSportOutline />
                            <div className="simbol">
                                <p>{property.garage} Vagas</p>
                            </div>
                        </div>
                        }
                          {property?.pet === "não" ? "" :
                        <div className="iconUnic">
                                <TbBone />
                            <div className="simbol">
                            <p>{property?.pet} Aceita pets</p>
                            </div>
                        </div>
                        }
                         {property?.furnished === "não" ? "" :
                        <div className="iconUnic">
                                <TbSofa />
                            <div className="simbol">
                                <p>Mobilhado</p>
                            </div>
                        </div>
                        }
                        {/* {property.totalArea === "" ? "" :
                        <div className="iconUnic">
                                <TfiRulerAlt2 />
                            <div className="simbol">
                                <p>{property.totalArea} M<sup>2</sup></p>
                            </div>
                        </div>
                            }
                        {property.buildingArea === "" ? "" :
                        <div className="iconUnic">
                                <IoCrop />
                            <div className="simbol">
                                <p>{property.buildingArea} M<sup>2</sup></p>
                            </div>
                        </div>
                        } */}
                    </div>
                    <div className="pricing">
                        <h5>{property.status} {property.textRent !==  "" ? "/" : "" }<span> {property.textRent}</span></h5>
                        <h2>R$ <span>{property.status === "Venda" ? property.priceSale : property.priceRent}</span></h2>
                    </div>
                </div>
            </div>
          </div>
            )
          })
          }
      </Slide>
  );
};
  

  export { SliderHome }