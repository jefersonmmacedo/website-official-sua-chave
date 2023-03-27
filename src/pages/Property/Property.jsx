import "./property.css"
import { SliderImages } from '../../components/SliderImages/SliderImages';
import Navbar2 from "../../components/Nav/Navbar";
import {IoCrop, IoLocationOutline, IoBedOutline, IoCarSportOutline, IoCheckmarkSharp, IoHomeOutline} from 'react-icons/io5';
import {TfiRulerAlt2} from 'react-icons/tfi';
import {MdOutlineShower} from 'react-icons/md';
import {TbBath, TbBone, TbSofa} from 'react-icons/tb';
import {HiOutlineBellAlert} from 'react-icons/hi2';
import { Footer } from "../../components/Footer/Footer";
import { CompanyInfo } from "../../components/CompanyInfo/CompanyInfo";
import { NewScheduling } from "../../components/NewScheduling/NewScheduling";
import { NewMessageProperty } from "../../components/NewMessageProperty/NewMessageProperty";
import { NewFavorite } from "../../components/NewFavorite/NewFavorite";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { NewShare } from "../../components/NewShare/NewShare";
import api from "../../services/api";
import { NewAlertClient } from "../../components/NewAlertClient/NewAlertClient";


export function Property() {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const {id} = useParams()
    const {data} = useFetch(`/property/${id}`)

    if(!data) {
        return (
            <></>
        )
    }
    console.log(data[0]?.status, data[0]?.district, data[0]?.city, data[0]?.uf, data[0]?.type, data[0]?.subType, data[0]?.bedroom, data[0]?.suite, data[0]?.restroom, data[0]?.garage, data[0]?.pets, data[0]?.furnished, data[0]?.idProperty)

              const valueRent = parseInt(data[0]?.priceRent?.replace(/[^0-9]/gi, ""));
              const valueText = valueRent.toString()
              const valueTextFormat = valueText?.replace("00", "");


              const valueconcominium = parseInt(data[0]?.condominium?.replace(/[^0-9]/gi, ""));
              const valueTextconcominium = valueconcominium.toString()
              const valueTextconcominiumFormat = valueTextconcominium?.replace("00", "")
      
              const valueIptu = parseInt(data[0]?.iptu?.replace(/[^0-9]/gi, ""));
              const valueTextIptu = valueIptu.toString()
              const valueTextIptuFormat = valueTextIptu?.replace("00", "")
      
              const valueOtherPrices = parseInt(data[0]?.otherPrices?.replace(/[^0-9]/gi, ""));
              const valueTextOtherPrices = valueOtherPrices.toString()
              const valueTextOtherPricesFormat = valueTextOtherPrices?.replace("00", "")
            


    const valuesRent =[
        {
        id: "rent",
        value: data[0]?.priceRent === "" ? "0,00" : parseInt(valueTextFormat)
        },
        {
            id: "condominium",
            value: data[0]?.condominium === "" ? "0,00" : valueTextconcominiumFormat
            },
            {
            id: "iptu",
            value: data[0]?.iptu === "" ? "0,00" : valueTextIptuFormat
            },
            {
            id: "otherPrices",
            value: data[0]?.otherPrices === "" ? "0,00" : valueTextOtherPricesFormat
            }
]
    const valuesCharges =[
        {
        id: "condominium",
        value: data[0]?.condominium === "" ? "0,00" : valueTextconcominiumFormat
        },
        {
        id: "iptu",
        value: data[0]?.iptu === "" ? "0,00" : valueTextIptuFormat
        },
        {
        id: "otherPrices",
        value: data[0]?.otherPrices === "" ? "0,00" : valueTextOtherPricesFormat
        }
]

    const valuesTotalRent = valuesRent?.reduce(function (acumulador, objetoAtual){
        return acumulador + parseFloat(objetoAtual.value);
      }, 0);
    const valuesTotalCharges = valuesCharges?.reduce(function (acumulador, objetoAtual){
        return acumulador + parseFloat(objetoAtual.value);
      }, 0);

      var ResultBRL = valuesTotalRent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      var ResultBRLCharges = valuesTotalCharges.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

      const dataProperty = {
        idPropery: data[0]?.id,
        adress: `${data[0]?.road} - ${data[0]?.district} - ${data[0]?.city} - ${data[0]?.uf}`,
        status: data[0]?.status,
        priceRent: data[0]?.priceRent,
        priceSale: data[0]?.priceSale,
        titleProperty: data[0]?.title
      }

    return (
       <div className="Property">
        <Navbar2 />
        <div className="main">
          <SliderImages images={data[0]?.images} id={data[0]?.id} />
          <div className="data">
          <div className="propertyUnic">
          {data[0]?.availability === "Disponível" ?
            <div className="targets">

                {new Date(data[0]?.created_at).getDate() === new Date().getDate() &&
                new Date(data[0]?.created_at).getMonth() === new Date().getMonth() &&
                new Date(data[0]?.created_at).getFullYear() === new Date().getFullYear()
                ? 
            <div className="featured">
                        <p>Novo</p>
                    </div>
                    : ""
             }

                    <NewMessageProperty idProperty={data[0]?.id} idCompany={data[0]?.idCompany} imageProperty={data[0]?.featuredImage}/>
                    <NewScheduling idProperty={data[0]?.id} idCompany={data[0]?.idCompany} title={data[0]?.title} image={data[0]?.featuredImage}/>
                    <NewShare idProperty={data[0]?.id} title={`${data[0]?.title} (${data[0]?.city} / ${data[0]?.uf})`}/>
                    <NewFavorite idProperty={data[0]?.id} idCompany={data[0]?.idCompany} page={"yes"}/>

            </div>
            : ""}
            {data[0]?.availability !== "Disponível" ?
                    <div className={
                        data[0]?.availability === "Vendido" ? "availability1" : 
                        data[0]?.availability === "Alugado" ? "availability2" : 
                        data[0]?.availability === "Indisponível" ? "availability3" : 
                        "availability3"
                    }>
                        <p>Imóvel {data[0]?.availability}</p>
                    </div>
                    : ""}

                <div className="text">
                    <h2>{data[0]?.title}</h2>
                    <h5><IoHomeOutline />{data[0]?.status} - {data[0]?.type} - {data[0]?.subType}</h5>
                    <h5><IoLocationOutline />{data[0]?.road}{data[0]?.road !== "" ? ", " : ""} {data[0]?.number} {data[0]?.complement} {data[0]?.number !== "" ? " - " : ""} {data[0]?.district} - {data[0]?.city} - {data[0]?.uf} {data[0]?.reference !== "" ? " - " : ""} {data[0]?.reference}</h5>
                    <h4>ID: {data[0]?.id}</h4>
                    {data[0]?.financing === "Sim" && data[0]?.availability === "Disponível"?
                    <div className="status">
                        <p>Aceita financiamento</p>
                    </div>
                    : ""}
                   
                    <h4 className="description">{data[0]?.description}</h4>

                    <div className="iconsBox">
                    {data[0]?.bedroom === "0" ? "" :
                        <div className="iconUnicBox">
                                <IoBedOutline />
                            <div className="simbolBox">
                            <p>{data[0]?.bedroom} Quartos</p>
                            </div>
                        </div>
                    }
                        {data[0]?.suite === "0" ? "" :
                        <div className="iconUnicBox">
                                <TbBath />
                            <div className="simbolBox">
                            <p>{data[0]?.suite} Suítes</p>
                            </div>
                        </div>
                        }
                        {data[0]?.restroom === "0" ? "" :
                        <div className="iconUnicBox">
                                <MdOutlineShower />
                            <div className="simbolBox">
                            <p>{data[0]?.restroom} Banheiro</p>
                            </div>
                        </div>
                        }
                        {data[0]?.garage === "0" ? "" :
                        <div className="iconUnicBox">
                                <IoCarSportOutline />
                            <div className="simbolBox">
                                <p>{data[0]?.garage} Vagas</p>
                            </div>
                        </div>
                        }
                          {data[0]?.pets === "Não" || data[0]?.pets === "" ? "" :
                        <div className="iconUnicBox">
                                <TbBone />
                            <div className="simbolBox">
                            <p>Aceita pets</p>
                            </div>
                        </div>
                        }
                         {data[0]?.furnished === "Não" || data[0]?.furnished === ""? "" :
                        <div className="iconUnicBox">
                                <TbSofa />
                            <div className="simbolBox">
                                <p>Mobilhado</p>
                            </div>
                        </div>
                        }
                        {data[0]?.totalArea === "" ? "" :
                        <div className="iconUnicBox">
                                <TfiRulerAlt2 />
                            <div className="simbolBox">
                                <p>{data[0]?.totalArea} M<sup>2</sup></p>
                            </div>
                        </div>
                            }
                        {data[0]?.buildingArea === "" ? "" :
                        <div className="iconUnicBox">
                                <IoCrop />
                            <div className="simbolBox">
                                <p>{data[0]?.buildingArea} M<sup>2</sup></p>
                            </div>
                        </div>
                        }
                    </div>


                    <div className="characteristics">
                        {data[0]?.characteristcs.map((item) => {
                            return (
                        <div className="item" key={item.id}>
                            <IoCheckmarkSharp /> <p>{item.item}</p> 
                        </div>
                            )
                        })}
                    </div>
                    <div className="infosCompanyMobile">
                    {data[0]?.status === "Aluguel" ?
                    <>
                     {data[0]?.priceRent === "" ? "Consultar valor" :
                    <div className="pricing">
                        <h5>{data[0]?.status} / <span> {data[0]?.textRent}</span></h5>
                        <h2>R$ <span>{data[0]?.priceRent}</span></h2>
                    </div>
                    }
                     {data[0]?.condominium === "" || data[0]?.condominium === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Condomínio</h5>
                        <h5>R$ {data[0]?.condominium}</h5>
                    </div>
                        }
                     {data[0]?.iptu === "" || data[0]?.iptu === "0,00" ? "" :
                    <div className="otherPrincings">
                        <h5>IPTU</h5>
                        <h5>R$ {data[0]?.iptu}</h5>
                    </div>
                     }
                     {data[0]?.otherPrices === "" || data[0]?.otherPrices === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Outros encargos</h5>
                        <h5>R$ {data[0]?.otherPrices}</h5>
                    </div>
                     }
                      {ResultBRL === "" || ResultBRL === "R$ 0,00" ? "" :
                    <div className="pricingTotal">
                        <h4>Total</h4>
                         <h4>{ResultBRL}</h4>
                     </div>
                    }
                     {data[0]?.priceSale === "" ? "" :
                     <div className="pricing">
                         <h5>Venda</h5>
                         <h2>R$ <span>{data[0]?.priceSale}</span></h2>
                     </div>
                     }
                    </>
                    :
                    <>
                    {data[0]?.priceSale === "" ? "Consultar valor" :
                    <div className="pricing">
                        <h5>Venda</h5>
                        <h2>R$ <span>{data[0]?.priceSale}</span></h2>
                    </div>
                    }
                    {data[0]?.condominium === "" || data[0]?.condominium === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Condomínio</h5>
                        <h5>R$ {data[0]?.condominium}</h5>
                    </div>
                        }
                     {data[0]?.iptu === "" || data[0]?.iptu === "0,00" ? "" :
                    <div className="otherPrincings">
                        <h5>IPTU</h5>
                        <h5>R$ {data[0]?.iptu}</h5>
                    </div>
                     }
                     {data[0]?.otherPrices === "" || data[0]?.otherPrices === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Outros encargos</h5>
                        <h5>R$ {data[0]?.otherPrices}</h5>
                    </div>
                     }
                     {ResultBRLCharges === "" || ResultBRLCharges === "R$ 0,00" ? "" :
                   <div className="pricingTotal">
                       <h4>Total encargos</h4>
                        <h4>{ResultBRLCharges}</h4>
                    </div>
                   }
                  
                   </>
                    }
                    <CompanyInfo idProperty={data[0]?.id} idCompany={data[0]?.idCompany} />
                    </div>

                    {data[0]?.video === "" ? "" :
                    <div className="video">
                    <iframe width="100%" height="300" src={data[0]?.video} title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    }

                        <div className="map">
                            <iframe
                            width="100%" height="300"
                            frameBorder="0" style={{border:"0px", borderRadius: "6px"}} 
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCZllXD0czNd_oeF0u_o9LUVJ2bCd1K4p8&q=${data[0]?.district}, ${data[0]?.city} - ${data[0]?.uf}, ${data[0]?.cep}`}
                            allowFullScreen>
                            </iframe>
                           <h6> * Endereço aproximado</h6>
                        </div> 

                        <NewAlertClient
                        status={data[0]?.status} district={data[0]?.district} city={data[0]?.city} uf={data[0]?.uf} type={data[0]?.type}
                        subType={data[0]?.subType} bedroom={data[0]?.bedroom} suite={data[0]?.suite} restroom={data[0]?.restroom}
                        garage={data[0]?.garage} pets={data[0]?.pets} furnished={data[0]?.furnished} idProperty={data[0]?.id}
                        />
                    </div>
                </div>

                <div className="infosCompany">
                {data[0]?.status === "Aluguel" ?
                    <>
                     {data[0]?.priceRent === "" ? "Consultar valor" :
                    <div className="pricing">
                        <h5>{data[0]?.status} / <span> {data[0]?.textRent}</span></h5>
                        <h2>R$ <span>{data[0]?.priceRent}</span></h2>
                    </div>
                    }
                    {data[0]?.condominium === "" || data[0]?.condominium === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Condomínio</h5>
                        <h5>R$ {data[0]?.condominium}</h5>
                    </div>
                        }
                     {data[0]?.iptu === "" || data[0]?.iptu === "0,00" ? "" :
                    <div className="otherPrincings">
                        <h5>IPTU</h5>
                        <h5>R$ {data[0]?.iptu}</h5>
                    </div>
                     }
                     {data[0]?.otherPrices === "" || data[0]?.otherPrices === "0,00" ? ""  :
                    <div className="otherPrincings">
                        <h5>Outros encargos</h5>
                        <h5>R$ {data[0]?.otherPrices}</h5>
                    </div>
                     }
                      {ResultBRL === "" || ResultBRL === "R$ 0,00" ? "" :
                    <div className="pricingTotal">
                        <h4>Total</h4>
                         <h4>{ResultBRL}</h4>
                     </div>
                    }
                     {data[0]?.priceSale === "" ? "" :
                     <div className="pricing">
                         <h5>Venda</h5>
                         <h2>R$ <span>{data[0]?.priceSale}</span></h2>
                     </div>
                     }
                    </>
                    :
                    <>
                    {data[0]?.priceSale === "" ? "Consultar valor" :
                    <div className="pricing">
                        <h5>Venda</h5>
                        <h2>R$ <span>{data[0]?.priceSale}</span></h2>
                    </div>
                    }
                   {data[0]?.condominium === "" || data[0]?.condominium === "0,00" ? ""  :
                   <div className="otherPrincings">
                       <h5>Condomínio</h5>
                       <h5>R$ {data[0]?.condominium}</h5>
                   </div>
                       }
                    {data[0]?.iptu === "" || data[0]?.iptu === "0,00" ? ""  :
                   <div className="otherPrincings">
                       <h5>IPTU</h5>
                       <h5>R$ {data[0]?.iptu}</h5>
                   </div>
                    }
                    {data[0]?.otherPrices === "" || data[0]?.otherPrices === "0,00" ? ""  :
                   <div className="otherPrincings">
                       <h5>Outros encargos</h5>
                       <h5>R$ {data[0]?.otherPrices}</h5>
                   </div>
                    }
                     {ResultBRLCharges === "" || ResultBRLCharges === "R$ 0,00" ? "" :
                   <div className="pricingTotal">
                       <h4>Total encargos</h4>
                        <h4>{ResultBRLCharges}</h4>
                    </div>
                   }
                  
                   </>
                    }
                <CompanyInfo idProperty={data[0]?.id} idCompany={data[0]?.idCompany} />
                </div>
                </div>
        </div>
        <Footer />


       </div>
      )
}