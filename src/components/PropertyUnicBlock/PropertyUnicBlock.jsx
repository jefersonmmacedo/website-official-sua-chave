import "./propertyUnicBlock.css";
import { IoBedOutline, IoCarSportOutline, IoChevronForwardOutline, IoCrop, IoHome, IoHomeOutline, IoLocationOutline, IoPawOutline } from "react-icons/io5";
import { MdOutlineShower } from "react-icons/md";
import slugify from 'react-slugify';
import imageDefault from "../../assets/images/default.png"


import { NewFavorite } from "../NewFavorite/NewFavorite";
import { SliderBox } from "../SliderBox/SliderBox";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { NewShareBox } from "../NewShareBox/NewShareBox";
import { TbBath, TbBone, TbSofa } from "react-icons/tb";
import { GiHomeGarage } from "react-icons/gi";
import { TfiRulerAlt2 } from "react-icons/tfi";


export function PropertyUnicBlock({id, style}) {
    const [property, setProperty] = useState([])
    useEffect(() => {
        async function loadproperties() {
            await api.get(`/property/${id}`).then((res) => {
                setProperty(res.data[0])
            }).catch((error) => {
                console.log(error)
            })
        }

        loadproperties()
    },[id])

    const titleProperty = `${property?.title}`
    const company = `${property?.nameCompany}`
    const nameSlug = slugify(property?.nameCompany);
    const bedroom =  property?.bedroom === "" || property?.bedroom === "0"? "" : property?.bedroom === "1" ? `- ${property?.bedroom} quarto` : property?.bedroom !== "1" || property?.bedroom !== ""  || property?.bedroom !== "0"? `- ${property?.bedroom} quartos` : ""
    const StatusProperty = `${property?.subType} ${property?.status === "Venda" ? "à venda" : property?.status === "Aluguel" ? "para aluguel" : "para aluguel e venda"}`
    return (
        <div className={style === "Emphasis" ? "PropertyUnicEmphasis": "PropertyUnicBlock"}>
                    <div className={style === "Emphasis" ? "imageSliderEmphasis": "imageSlider"}>
                    <a href={`/imovel/${property?.id}`}>
                    {/* <SliderBox images={property?.images} idProperty={property?.id} imageDestaque={property?.featuredImage}/> */}

                    <img 
                        src={property?.featuredImage}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/suachave-4bcbe.appspot.com/o/default.png?alt=media&token=6b8adb0b-f3ac-40ef-a0fb-7e5408245b03";
                        }}
                        alt={property?.title === "" ? "Imagem propriedade" : property?.title}
                        />

                    {/* <img src={imageDefault} alt={property?.title} /> */}
                </a>
                    </div>
                        
                    {new Date(property?.created_at).getDate() === new Date().getDate() &&
                    new Date(property?.created_at).getMonth() === new Date().getMonth() &&
                    new Date(property?.created_at).getFullYear() === new Date().getFullYear()
                    ?
                    <div className="featured">
                        <p>Novo</p>
                    </div>
                    : ""
                    } 
                    <div className="infosPropertyButtons">
                        <div className="status">
                        <a href={`/imobiliaria/${nameSlug}`}>
                            <div className="image">
                                <img src={property?.avatarCompany} alt={property?.nameCompany} />
                            </div>
                            </a>
                            <a href={`/imobiliaria/${nameSlug}`}>
                            <p>{company !== undefined ? company.slice(0,23) : company}</p>
                            </a>
                        </div>
                    <div className="infosButtons">
                  
                    {/* <div className="share">
                    <NewShareBox idProperty={property?.id} title={property?.title}/>
                    </div> */}
                    <div className="heart2">
                    <NewFavorite idProperty={property?.id} idCompany={property?.idCompany} page={"not"}/>
                    </div>
                    </div>
                    </div>
                    <div className="text">
                    <div className="textInfos">
                    <a href={`/imovel/${property?.id}`}>
                    <h6>{property?.subType}</h6>
                    {/* <h4>{StatusProperty !== undefined ? StatusProperty.slice(0,28) : StatusProperty}</h4> */}
                        </a>
                    <h4>{property?.district === "" && property?.city === "" && property?.uf === ""?
                    <>
                     
                    Solicite a localização
                    </>
                    :
                    <>
                          {property?.district} - {property?.city} - {property?.uf}
                    </>
                    }
                   </h4>
                    {/* <h5>{StatusProperty}</h5> */}
                    {/* <h6><IoHomeOutline/>{titleProperty?.slice(0,39)}</h6> */}
                    

                    {/* <h6>{property?.district === "" && property?.city === "" && property?.uf === ""?
                    <>
                    <IoLocationOutline /> 
                    Solicite a localização
                    </>
                    :
                    <>
                          <IoLocationOutline />{property?.district} - {property?.city} - {property?.uf}
                    </>
                    }
                   </h6> */}


                    </div>

                    {
                    property?.type === "Terrenos e Lotes" ?
                     <div className="iconsBox">                  
                        {property?.totalArea === "" ? "" :
                        <div className="iconUnicBox">
                                <TfiRulerAlt2 />
                            <div className="simbolBox">
                                <p>{property?.totalArea} M<sup>2</sup></p>
                            </div>
                        </div>
                            }
                        {property?.buildingArea === "" ? "" :
                        <div className="iconUnicBox">
                                <IoCrop />
                            <div className="simbolBox">
                                <p>{property?.buildingArea} M<sup>2</sup></p>
                            </div>
                        </div>
                        }

                     </div>
                     :
                    property?.type === "Rural" ?
                     <div className="iconsBox">  
                      {property?.bedroom === "" || property?.bedroom === "0"? "" :
                        <div className="iconUnicBox">
                                <IoBedOutline />
                            <div className="simbolBox">
                                <p>{property?.bedroom} {property?.bedroom === "1" ? " Quarto" : " Quartos"}</p>
                            </div>
                        </div>
                        }                
                        {property?.totalArea === "" ? "" :
                        <div className="iconUnicBox">
                                <TfiRulerAlt2 />
                            <div className="simbolBox">
                                <p>{property?.totalArea} M<sup>2</sup></p>
                            </div>
                        </div>
                            }
                        {property?.buildingArea === "" ? "" :
                        <div className="iconUnicBox">
                                <IoCrop />
                            <div className="simbolBox">
                                <p>{property?.buildingArea} M<sup>2</sup></p>
                            </div>
                        </div>
                        }

                     </div>
                     :
                    property?.type === "Comercial" || property?.type === "Industrial" ?
                     <div className="iconsBox">  
                      {property?.restroom === "" || property?.restroom === "0"? "" :
                        <div className="iconUnicBox">
                                <MdOutlineShower />
                            <div className="simbolBox">
                                <p>{property?.restroom} {property?.restroom === "1"  ? " Banheiro" : " Banheiros"}</p>
                            </div>
                        </div>
                        }               
                        {property?.totalArea === "" ? "" :
                        <div className="iconUnicBox">
                                <TfiRulerAlt2 />
                            <div className="simbolBox">
                                <p>{property?.totalArea} M<sup>2</sup></p>
                            </div>
                        </div>
                            }
                        {property?.buildingArea === "" ? "" :
                        <div className="iconUnicBox">
                                <IoCrop />
                            <div className="simbolBox">
                                <p>{property?.buildingArea} M<sup>2</sup></p>
                            </div>
                        </div>
                        }

                     </div>
                     :
                    <div className="iconsBox">
                    {property?.bedroom === "" || property?.bedroom === "0"? "" :
                        <div className="iconUnicBox">
                                <IoBedOutline />
                            <div className="simbolBox">
                                <p>{property?.bedroom} {property?.bedroom === "1" ? " Quarto" : " Quartos"}</p>
                            </div>
                        </div>
                        }
                        {property?.restroom === "" || property?.restroom === "0"? "" :
                        <div className="iconUnicBox">
                                <MdOutlineShower />
                            <div className="simbolBox">
                                <p>{property?.restroom} {property?.restroom === "1" ? " Banheiro" : " Banheiros"}</p>
                            </div>
                        </div>
                        }
                        {/* {property?.suite === "" || property?.suite === "0" ? "" :
                        <div className="iconUnicBox">
                                <TbBath />
                            <div className="simbolBox">
                                <p>{property?.suite} Suítes</p>
                            </div>
                        </div>
                        } */}
                         {property?.garage === "" || property?.garage === "0" ? "" :
                        <div className="iconUnicBox">
                                <GiHomeGarage />
                            <div className="simbolBox">
                                <p>{property?.garage} {property?.garage === "1" ? " Vaga" : " Vagas"}</p>
                            </div>
                        </div>
                        }
                        {/* {property?.pets === "Não" || property?.pets === "" ? "" :
                        <div className="iconUnicBox">
                                <TbBone />
                            <div className="simbolBox">
                            <p>Aceita pets</p>
                            </div>
                        </div>
                        }
                         {property?.furnished === "Não" || property?.furnished === ""? "" :
                        <div className="iconUnicBox">
                                <TbSofa />
                            <div className="simbolBox">
                                <p>Mobilhado</p>
                            </div>
                        </div>
                        } */}



                    </div>
                    }
                    <div className="pricing">
                        <h6>{property?.status}</h6>
                        {property?.priceSale === "" && property?.priceRent === ""  ?
                        <h4><span>Consultar valor</span></h4>
                        :
                        property?.status === "Venda" ?
                        <h4>R$ <span>{property?.priceSale}</span></h4>
                        : property?.status === "Aluguel" ?
                        <h4>R$ <span>{property?.priceRent}</span></h4>
                        :  <h4>{property?.priceRent === "" ? "Consultar" : "R$"} <span>{property?.priceRent === "" ? "Consultar" : property?.priceRent}</span> /
                        {property?.priceSale === "" ? " Consultar" : " R$"} <span>{property?.priceSale === "" ? "Consultar" : property?.priceSale}</span></h4>
                        }
                    </div>
                    </div>
                </div>
    )
}