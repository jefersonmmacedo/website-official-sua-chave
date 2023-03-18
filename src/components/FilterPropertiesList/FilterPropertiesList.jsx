import { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { TbBone, TbSofa } from "react-icons/tb";
import { useFetch } from "../../hooks/useFetch";
import "./filterPropertiesList.css"

export function FilterPropertiesList({status, typeProperty, subTypeProperty, district, city, uf, quarto, banheiro, suítes, garagem}) {
    console.log({status, district, city, uf, quarto, banheiro, suítes, garagem})
    const [filter, setFilter] = useState(false);
    const [type, setType] = useState(typeProperty === "" ? "" : typeProperty);
    const [subType, setSubType] = useState(subTypeProperty === "" ? "" : subTypeProperty);
    const [bedroom, setBedroom] = useState(quarto === "0" ? "0" : quarto);
    const [garage, setGarage] = useState(garagem === "0" ? "0" : garagem);
    const [suite, setSuite] = useState(suítes === "0" ? "0" : suítes);
    const [restroom, setRestroom] = useState(banheiro === "0" ? "0" : banheiro);
    const [statusProperty, setStatusProperty] = useState(status);
    // const [pets, setPets] = useState(petsProperty);
    // const [furnished, setFurnished] = useState(furnishedProperty);

    console.log(restroom);

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
    const {data} = useFetch(`/property/all/${availability}`);

    var districtList = [];
    var cityList = [];

    data?.forEach((item) => {
        var duplicated  = districtList.findIndex(redItem => {
            return item.district === redItem.district;
        }) > -1;
    
        if(!duplicated) {
            districtList.push(item);
        }
    });
    data?.forEach((item) => {
        var duplicated  = cityList.findIndex(redItem => {
            return item.city === redItem.city;
        }) > -1;
    
        if(!duplicated) {
            cityList.push(item);
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
    if(cityList) {
        cityList.sort(function(a,b) {
            if(a.uf < b.uf ) {
                return -1
            } else {
                return true
            }
        })
        }

        function handleSelectAddress(e) {
            setAdressSelected(e.target.value)
            console.log(e.target.value)    
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
             
            
             <div className="dataSelects">
             <input type="text" placeholder="Digite a cidade" list="brow" value={AdressSelected} onChange={handleSelectAddress} />
             <datalist id="brow" >
                    {districtList?.map((district) => {
                            return (
                                <>
                                <option autocomplete="off" key={district.id} value={`${district.district} - ${district.city} - ${district.uf}`}></option>
                                </>
                            )
                        })}
                    {cityList?.map((district) => {
                            return (
                                <>
                                <option autocomplete="off" key={district.id} value={`${district.city} - ${district.uf}`}></option>
                                </>
                            )
                        })}
                    </datalist>
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
                {type === "Residencial" ?
                <>
                <option value="">Subtipo</option>
                <option value="Casa">Casa</option>
                <option value="Casa geminada">Casa geminada</option>
                <option value="Sobrado">Sobrado</option>
                <option value="Bangalô">Bangalô</option>
                <option value="Edícula">Edícula</option>
                <option value="Flat">Flat</option>
                <option value="Casa de vila">Casa de vila</option>
                <option value="Condomínio fechado">Condomínio fechado</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Apartamento duplex">Apartamento duplex</option>
                <option value="Cobertura">Cobertura</option>
                <option value="Cobertura duplex">Cobertura duplex</option>
                <option value="Loft">Loft</option>
                <option value="Kitnet">Kitnet</option>
                <option value="Mansão">Mansão</option>
                <option value="Stúdio">Stúdio</option>
                </>
                : type === "Comercial" ?
                <>
                <option value="">Subtipo</option>
                <option value="Loja">Loja</option>
                <option value="Conjunto comercial">Conjunto comercial</option>
                <option value="Ponto comercial">Ponto comercial</option>
                <option value="Sala Comercial">Sala Comercial</option>
                <option value="Prédio">Prédio</option>
                <option value="Hotel">Hotel</option>
                <option value="Stúdio">Stúdio</option>
                </>
                : type === "Industrial" ?
                <>
                <option value="">Subtipo</option>
                <option value="Galpão">Galpão</option>
                <option value="Área industrial">Área industrial</option>
                </>
                : type === "Rural" ?
                <>
                <option value="">Subtipo</option>
                <option value="Chácara">Chácara</option>
                <option value="Fazenda">Fazenda</option>
                <option value="Sítio">Sítio</option>
                </>
                : type === "Terrenos e Lotes" ?
                <>
                <option value="">Subtipo</option>
                <option value="Área">Área</option>
                <option value="Terreno/Lote">Terreno/Lote</option>
                </>
                :  <option value="">{subType === "" ? "Selecione o tipo" : subType}</option>
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