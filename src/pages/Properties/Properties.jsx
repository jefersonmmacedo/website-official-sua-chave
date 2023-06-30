import "./properties.css";
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { FiArrowUpCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import notFoundImage from "../../assets/images/svg/404property.svg";
import loader from "../../assets/images/gif/loader.gif";
import { PropertyUnicBlockLoader } from "../../components/PropertyUnicBlockLoader/PropertyUnicBlockLoader";
import { useFetch } from "../../hooks/useFetch";
import { PropertyUnicBlock } from "../../components/PropertyUnicBlock/PropertyUnicBlock";
import { FilterPropertiesList } from "../../components/FilterPropertiesList/FilterPropertiesList";
import { useEffect, useState } from "react";
import api from "../../services/api";


export function Properties(){
    const {status} = useParams();
    const query = useQuery();

    const availability = "Disponível";
    const type = query.get("tipo") === null ? "" : query.get("tipo")
    const subType = query.get("subtipo") === null ? "" : query.get("subtipo")
    const bedroom = query.get("quartos") === null ? "0" : query.get("quartos")
    const garage = query.get("garagem") === null ? "0" : query.get("garagem")
    const suite = query.get("suites") === null ? "0" : query.get("suites")
    const restroom = query.get("banheiros") === null ? "0" : query.get("banheiros")

    const district = query.get("district") === null ? "" : query.get("district");
    const city = query.get("city") ;
    const uf = query.get("uf") ;

    const [propertyNotFound, setPropertyNotFound] = useState(false);

    const [properties, setProperties] = useState([]);
    const [enphasisProperties, setEnphasisProperties] = useState([]);
    const [ currentPage, setCurrentPage] = useState(0);
    const perPage = 12;
    const perPageEmphasis = 150;

    useEffect(() => {
        async function loadproperties() {
            await api.get(
                status !== undefined && subType !== "" && district !== "" && city !== "" && uf !== "" ?
                `/property/listsadressfull/${availability}/${status}?type=${type}&subType=${subType}&district=${district}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : type !== "" && status !== undefined  && district !== "" && city !== "" && uf !== "" ?
              `/property/listsadresscityuf/${availability}/${status}?type=${type}&district=${district}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : status !== undefined && subType !== "" && city !== "" && uf !== "" ?
                `property/listsadress/${availability}/${status}?type=${type}&subType=${subType}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                :type !== "" && status !== undefined  && city !== "" && uf !== "" ?
                `/property/listsadresstype/${availability}/${status}?type=${type}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : status !== undefined &&  district !== "" && city !== "" && uf !== "" ?
                `/property/listsadressstatuscomplete/${availability}/${status}?district=${district}&city=${city}&uf=${uf}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : status !== undefined  && city !== "" && uf !== "" ?
                `/property/listsadressstatus/${availability}/${status}?city=${city}&uf=${uf}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : status !== undefined && subType !== "" ?
                `/property/listtypesubstatus/${availability}/${status}?type=${type}&subType=${subType}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : subType !== "" ?
                `/property/listtypesubtype/${availability}?type=${type}&subType=${subType}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : status !== undefined && type !== "" ?
                `/property/listtypestatus/${availability}/${status}?type=${type}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : type !== "" ?
                `property/listtype/${availability}?type=${type}&emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : status !== undefined ?
                `/property/lists/${availability}/${status}?emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                : status === undefined ?
                `/property/all/${availability}?emphasis=true&page=${currentPage}&limit=${perPageEmphasis}`
                :"").then((res) => {
                setEnphasisProperties(res.data)
            }).catch((error) => {
                console.error(error);
            });
        }

        loadproperties()
    },[])

    const {data} = useFetch(
        status !== undefined && subType !== "" && district !== "" && city !== "" && uf !== "" ?
        `/property/listsadressfull/${availability}/${status}?type=${type}&subType=${subType}&district=${district}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : type !== "" && status !== undefined  && district !== "" && city !== "" && uf !== "" ?
      `/property/listsadresscityuf/${availability}/${status}?type=${type}&district=${district}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : status !== undefined && subType !== "" && city !== "" && uf !== "" ?
        `property/listsadress/${availability}/${status}?type=${type}&subType=${subType}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=false&page=${currentPage}&limit=${perPage}`
        :type !== "" && status !== undefined  && city !== "" && uf !== "" ?
        `/property/listsadresstype/${availability}/${status}?type=${type}&city=${city}&uf=${uf}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : status !== undefined &&  district !== "" && city !== "" && uf !== "" ?
        `/property/listsadressstatuscomplete/${availability}/${status}?district=${district}&city=${city}&uf=${uf}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : status !== undefined  && city !== "" && uf !== "" ?
        `/property/listsadressstatus/${availability}/${status}?city=${city}&uf=${uf}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : status !== undefined && subType !== "" ?
        `/property/listtypesubstatus/${availability}/${status}?type=${type}&subType=${subType}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : subType !== "" ?
        `/property/listtypesubtype/${availability}?type=${type}&subType=${subType}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : status !== undefined && type !== "" ?
        `/property/listtypestatus/${availability}/${status}?type=${type}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : type !== "" ?
        `property/listtype/${availability}?type=${type}&emphasis=false&page=${currentPage}&limit=${perPage}`
        : status !== undefined ?
        `/property/lists/${availability}/${status}?emphasis=false&page=${currentPage}&limit=${perPage}`
        : status === undefined ?
        `/property/all/${availability}?emphasis=false&page=${currentPage}&limit=${perPage}`
        :"");

    if(data) {
        console.log(data)
    }

    setTimeout(() => {
        if(data?.length === 0) {
            console.log("Nada aqui!")
            setPropertyNotFound(true)
        }
    }, "3000")

        useEffect(() => {
            if(data) {
                 setProperties(oldProperties => [...oldProperties, ...data])
            }
      }, [data]);
  
    
      useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            console.log('Sentinela appears!', currentPage + 1)
            setCurrentPage((currentValue) => currentValue + 1);
          }
        })
        intersectionObserver.observe(document.querySelector('#sentinela'));
        return () => intersectionObserver.disconnect();
      }, []);
  
      if(!properties) {
        return (
            <div className="loader">
            <PropertyUnicBlockLoader />
            <PropertyUnicBlockLoader />
            <PropertyUnicBlockLoader />
            <PropertyUnicBlockLoader />
            </div>
        )
    }

    function handleTop(e) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="Properties">
        <Navbar2 />
        <div className="listPage">
        {/* <DownloadApp2 /> */}
        <div className="ListProperty">
            <div className="topList">
                <div className="textItens">
                {properties?.length === 0 ?
                  ""                   
                : properties?.length === 1 ?
                <h3>{status === "Venda" ? `Imóvel à ${status}` : `Imóvel para ${status}`} {city !== "" && district !== "" ? `em ${district}, ${city} - ${uf}` : city !== "" && district === "" ? `em ${city} - ${uf}` : ""}</h3>
                : status === undefined ?
                <h3>Imóveis disponíveis</h3>
                :
                <h3>{status === "Venda" ? `Imóveis à ${status}` : `Imóveis para ${status}`} {city !== "" && district !== "" ? `em ${district}, ${city} - ${uf}` : city !== "" && district === "" ? `em ${city} - ${uf}` : ""}</h3>
                }
                </div>
                <FilterPropertiesList status={status} typeProperty={type} subTypeProperty={subType} district={district} city={city} uf={uf} quarto={bedroom} banheiro={restroom} suítes={suite} garagem={garage}/>
            </div>

        {properties?.length > 0 ?
         <div className="itens">
            {enphasisProperties?.map((property) => {
                    return (
                        <PropertyUnicBlock id={property.id} key={property.id} style="Emphasis"/>
                    )
                })}
            {properties?.map((property) => {
                    return (
                        <PropertyUnicBlock id={property.id} key={property.id}/>
                    )
                })}
                          
            </div> 
            :
                <div className="MainAbout">
                    {propertyNotFound === false ? "" :
                    <>
                    <img src={notFoundImage} alt="" />
                    <h3>Nenhum imóvel localizado</h3>
                    </>
                    }
                </div>
        }

                    {data?.length < 12 || data?.length === 0 ? "":
                <div className="sentinela" id="sentinela"> 
                         <div className="itens">          
                         <PropertyUnicBlockLoader />
                         <PropertyUnicBlockLoader />
                         <PropertyUnicBlockLoader />
                         <PropertyUnicBlockLoader />
                        </div>  
                        <img src={loader} alt="Gif LOader more posts" width={20}/>
                </div>   
                }
              
        </div>
            <button className="topScroll" onClick={handleTop}><FiArrowUpCircle /></button>
        </div>
        <Footer />
        </div>
    )
}