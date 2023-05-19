import { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { TbBone, TbSofa } from "react-icons/tb";
import { useFetch } from "../../hooks/useFetch";
import "./filterPropertiesList.css"
import { useEffect } from "react";
import api from "../../services/api";

export function FilterPropertiesList({status, typeProperty, subTypeProperty, district, city, uf, quarto, banheiro, suítes, garagem}) {
    console.log({status, district, city, uf, quarto, banheiro, suítes, garagem})
    const [filter, setFilter] = useState(false);
    const [data, setData] = useState([]);
    const [type, setType] = useState(typeProperty === "" ? "" : typeProperty);
    const [subType, setSubType] = useState(subTypeProperty === "" ? "" : subTypeProperty);
    const [bedroom, setBedroom] = useState(quarto === "0" ? "0" : quarto);
    const [garage, setGarage] = useState(garagem === "0" ? "0" : garagem);
    const [suite, setSuite] = useState(suítes === "0" ? "0" : suítes);
    const [restroom, setRestroom] = useState(banheiro === "0" ? "0" : banheiro);
    const [statusProperty, setStatusProperty] = useState(status);

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();

    const statusSelected = statusProperty === "" ? status : statusProperty;
    console.log({city, uf, district});
    const [AdressSelected, setAdressSelected] = useState(city !== null && district === null ? `${city} - ${uf}` : city !== null && district !== null ? `${district} - ${city} - ${uf}` :  "");
    const dataAdress = AdressSelected.split(" - ");
  //  console.log(dataAdress);
    const districtNew = dataAdress.length === 3 ? dataAdress[0] : ""
    const cityNew = dataAdress.length === 3 ? dataAdress[1] : dataAdress[0]
    const ufNew = dataAdress.length === 3 ? dataAdress[2] : dataAdress.length !== 3 ? dataAdress[1] : ""

   // console.log({districtNew, cityNew, ufNew})

    const availability = "Disponível";
    useEffect(() => {
        async function loadProperty() {
            await api.get(`/property/AllProperties/${availability}`).then((res) => {
                setData(res.data);
            }).catch((error) => {
                console.log(error)
            })
        }

        loadProperty()
    }, [])


    var districtList = [];
    var subTypeList = [];

    data?.forEach((item) => {
        var duplicated  = districtList.findIndex(redItem => {
            return item.district === redItem.district && item.city === redItem.city;
        }) > -1;
    
        if(!duplicated) {
            districtList.push(item);
        }
    });

    data?.forEach((item) => {
        var duplicated  = subTypeList.findIndex(redItem => {
            return item.type === redItem.type && item.subType === redItem.subType;
        }) > -1;
    
        if(!duplicated) {
            subTypeList.push(item);
        }
    });

    if(districtList) {
        districtList.sort(function(a,b) {
            if(a.uf < b.uf ) {
                return -1
            } else {
                return true
            }
        })
        }

        if(subTypeList) {
            subTypeList.sort(function(a,b) {
                if(a.uf < b.uf ) {
                    return -1
                } else {
                    return true
                }
            })
            }


            const searchFilter = districtList?.filter((address) => address.district.toLowerCase().includes(searchLower)
                                                                || address.city.toLowerCase().includes(searchLower)
                                                                || address.uf.toLowerCase().includes(searchLower))

        function handleSelectAddress(data) {
            setAdressSelected(data)
            console.log(data)    
          }
    
    function handleFiltro(e) {
        e.preventDefault();

        setFilter(!filter)
        console.log(!filter)
    }

    function handleNewSearchProperty(e) {
        e.preventDefault();
        window.open(`/imoveis/${statusProperty}?uf=${ufNew === undefined ? "" : ufNew}&city=${cityNew}&district=${districtNew}&tipo=${type}&subtipo=${subType}&quartos=${bedroom}&suites=${suite}&banheiros=${restroom}&garagem=${garage}`,"_self");
      //  window.open(`/imoveis/${statusProperty}?uf=${ufNew === undefined ? "" : ufNew}&city=${cityNew}&district=${districtNew}&tipo=${type}&subtipo=${subType}&quartos=${bedroom}&suites=${suite}&banheiros=${restroom}&garagem=${garage}&pets=${pets}&furnished=${furnished}`,"_self");
    }

    
    function handleNewStatus(data) {
        setStatusProperty(data)
        console.log(data)
    }
    // function handleNewPets(e) {
    //     e.preventDefault();
    //     if(pets === "não") {
    //         setPets("sim")
    //     } else {
    //         setPets("não")
    //     }
    // }

    // function handleNewFurnished(e) {
    //     e.preventDefault();
    //     if(furnished === "não") {
    //         setFurnished("sim")
    //     } else {
    //         setFurnished("não")
    //     }
    // }
    function handleType(e) {
        setType(e.target.value)
        setSubType("")
        console.log(e.target.value)
    }
    function handleSubType(e) {
        setSubType(e.target.value)
        console.log(e.target.value)
    }
    function handleBedroom(e) {
        setBedroom(e.target.value)
        console.log(e.target.value)
    }
    function handleRestroom(e) {
        setRestroom(e.target.value)
        console.log(e.target.value)
    }
    function handleSuite(e) {
        setSuite(e.target.value)
        console.log(e.target.value)
    }
    function handleGarage(e) {
        setGarage(e.target.value)
        console.log(e.target.value)
    }

    function handleClearItens(e) {
        e.preventDefault();
        setStatusProperty(status)
        setType("")
        setSubType("")
        setBedroom("0")
        setSuite("0")
        setRestroom("0")
        setGarage("0")
    }

    function handleClearAdress() {
        setAdressSelected("")
        setSearch("")
      }
    


    return (
        <div className="FilterPropertiesList">
  <button onClick={handleFiltro}>Filtro +</button>
        <div className={filter === true ? "searchItens" : "searchItensNone"}>
        <div className="buttons">
        <button onClick={handleFiltro}>X</button>
        </div>
        <div className="searchOptions">
            <div className="dataSearchOptions">
            
            <div className="dataSelectsButtons">
             <button className={statusSelected === "Aluguel" ? "" : "btn"} onClick={() => handleNewStatus("Aluguel")}>Para Alugar</button>
             <button className={statusSelected === "Venda" ? "" : "btn"} onClick={() => handleNewStatus("Venda")}>À venda</button>
             </div>
             
            
             <div className="dataSelects2">
                <div className="search">
             <input type="text" placeholder="Digite bairro, cidade ou estado" value={AdressSelected === "" ? search : AdressSelected} onChange={e => setSearch(e.target.value)} />
                    {AdressSelected === "" ? "" :
                    <button onClick={handleClearAdress} className="btnClear"><IoClose /></button>
                    }
                </div>

                    {search === "" || searchFilter.length === 0 || AdressSelected !== "" ? "" :
                        <div className="search3">
                            <div className="listAdress">
                                {searchFilter.map((adress) => {
                                    return (
                                        <h6 key={adress.id} onClick={() => handleSelectAddress(`${adress.district} - ${adress.city} - ${adress.uf}`)}>{adress.district} - {adress.city} - {adress.uf}</h6>
                                    )
                                })}      
                            </div>
                        </div>
                    }
            </div>
             
             <div className="dataSelects">
             <h4>Tipo:</h4>
            <select value={type} onChange={handleType} className={type === "" ? "" : "select"}>
                <option value="">Tipo</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Rural">Rural</option>
                <option value="Terrenos e Lotes">Terrenos e Lotes</option>
            </select>
            </div>
             
             <div className="dataSelects">
             <h4>Subtipo:</h4>
             <select value={subType} onChange={handleSubType} className={subType === "" ? "" : "select"}>
                       {type === "" ?
                       <option value="">Escolha o tipo de imóvel</option>
                       :
                       <>
                        <option value="">Selecione</option>
                        {subTypeList.map((list) => {
                            return (
                                list.type !== type ? "" :
                                <option value={list.subType}>{list.subType}</option>
                            )
                        })}
                       </>
                        }
                    </select>
            </div>
            
            <div className="dataSelects">
                <h4>Quartos: </h4>
            <select value={bedroom} onChange={handleBedroom} className={bedroom === "0" ? "" : "select"}>
                <option value="0">Quartos</option>
                <option value="1">1 ou + Quartos</option>
                <option value="2">2 ou + Quartos</option>
                <option value="3">3 ou + Quartos</option>
                <option value="4">4 ou + Quartos</option>
                <option value="5">5 ou + Quartos</option>
                <option value="6">6 ou + Quartos</option>
                <option value="7">7 ou + Quartos</option>
                <option value="8">8 ou + Quartos</option>
                <option value="9">9 ou + Quartos</option>
                <option value="10">10 ou + Quartos</option>
            </select>
            </div>

            <div className="dataSelects">
            <h4>Suítes: </h4>
            <select value={suite} onChange={handleSuite} className={suite === "0" ? "" : "select"}>
                <option value="0">Suítes</option>
                <option value="1">1 ou + Suítes</option>
                <option value="2">2 ou + Suítes</option>
                <option value="3">3 ou + Suítes</option>
                <option value="4">4 ou + Suítes</option>
                <option value="5">5 ou + Suítes</option>
                <option value="6">6 ou + Suítes</option>
                <option value="7">7 ou + Suítes</option>
                <option value="8">8 ou + Suítes</option>
                <option value="9">9 ou + Suítes</option>
                <option value="10">10 ou + Suítes</option>
            </select>
            </div>
            
            <div className="dataSelects">
            <h4>Banheiros: </h4>
            <select value={restroom} onChange={handleRestroom} className={restroom === "0" ? "" : "select"}>
                <option value="0">Banheiros</option>
                <option value="1">1 ou + Banheiros</option>
                <option value="2">2 ou + Banheiros</option>
                <option value="3">3 ou + Banheiros</option>
                <option value="4">4 ou + Banheiros</option>
                <option value="5">5 ou + Banheiros</option>
                <option value="6">6 ou + Banheiros</option>
                <option value="7">7 ou + Banheiros</option>
                <option value="8">8 ou + Banheiros</option>
                <option value="9">9 ou + Banheiros</option>
                <option value="10">10 ou + Banheiros</option>
            </select>
            </div>
                               
            <div className="dataSelects">
            <h4>Garagem: </h4>
            <select value={garage} onChange={handleGarage} className={garage === "0" ? "" : "select"}>
                <option value="0">Vagas de garagem</option>
                <option value="1">1 ou + Vagas de garagem</option>
                <option value="2">2 ou + Vagas de garagem</option>
                <option value="3">3 ou + Vagas de garagem</option>
                <option value="4">4 ou + Vagas de garagem</option>
                <option value="5">5 ou + Vagas de garagem</option>
                <option value="6">6 ou + Vagas de garagem</option>
                <option value="7">7 ou + Vagas de garagem</option>
                <option value="8">8 ou + Vagas de garagem</option>
                <option value="9">9 ou + Vagas de garagem</option>
                <option value="10">10 ou + Vagas de garagem</option>
            </select>
            </div>
            
    
            {/* <div className="dataSelectsButtons">
             <button className={pets === "sim" ? "" : "btn"} onClick={handleNewPets}><TbBone />Aceita Pets</button>
             <button className={furnished === "sim" ? "" : "btn"} onClick={handleNewFurnished}><TbSofa />Mobilhado</button>
             </div> */}

            <div className="dataSelectsButtonsAction">
                <button  onClick={handleNewSearchProperty}><IoSearchOutline /> Buscar</button>
                <button className="btn" onClick={handleClearItens}><IoClose /> Limpar</button>
        </div>
            </div>
        </div>
    </div>
        </div>
    )
}