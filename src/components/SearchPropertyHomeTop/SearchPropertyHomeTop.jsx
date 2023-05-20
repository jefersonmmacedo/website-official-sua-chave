import "./searchPropertyHomeTop.css";
import { useState } from "react";
import {IoSearch, IoAddOutline, IoRemoveOutline, IoClose} from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { TbBone, TbSofa } from "react-icons/tb";
import { useEffect } from "react";
import api from "../../services/api";

export function SearchPropertyHomeTop() {
    const [isCheckedPets, setIsCheckedPets] = useState(false);
    const [isCheckedFurnished, setIsCheckedFurnished] = useState(false);

    const [data, setData] = useState([]);
    const [codeImob, setCodeImob] = useState("imob-");
    const [pets, setPets] = useState("não");
    const [furnished, setFurnished] = useState("não");
    const [code, setCode] = useState(false);
    const [status, setStatus] = useState("Venda");
    const [subType, setSubType] = useState("");
    const [type, setType] = useState("");
    const [bedroom, setBedroom] = useState("0");
    const [suite, setSuite] = useState("0");
    const [garage, setGarage] = useState("0");
    const [restroom, setRestroom] = useState("0");
    const [viewFilter, setViewFilter] = useState(true);
    const [filter, setFilter] = useState(false);

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();

    const [AdressSelected, setAdressSelected] = useState("");

    const dataAdress = AdressSelected.split(" - ");
    console.log(dataAdress)

    const districtNew = dataAdress.length === 3 ? dataAdress[0] : ""
    const cityNew = dataAdress.length === 3 ? dataAdress[1] : dataAdress[0]
    const ufNew = dataAdress.length === 3 ? dataAdress[2] : dataAdress[1]


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

        function handleType(e) {
            setType(e.target.value)
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
        function handleSuite(e) {
            setSuite(e.target.value)
            console.log(e.target.value)
        }
        function handleRestroom(e) {
            setRestroom(e.target.value)
            console.log(e.target.value)
        }
    
        function handleGarage(e) {
            setGarage(e.target.value)
            console.log(e.target.value)
        }

      function handleActiveCode(data, status, filter) {
        setCode(data)
        setStatus(status)
        setViewFilter(filter)
      }

      function handleSelectAddress(data) {
        setAdressSelected(data)
        console.log(data)    
      }


      function handleFilter(e) {
        e.preventDefault()
        setFilter(!filter)
      }

      function handleSelectPets(e) {
        e.preventDefault();
        setIsCheckedPets(!isCheckedPets);
        if(pets === "não") {
            setPets("sim");
        } else {
            setPets("não");
        }
        console.log(pets)
      };

      function handleSelectFurnished(e) {
        e.preventDefault();
        setIsCheckedFurnished(!isCheckedFurnished);
        if(furnished === "não") {
            setFurnished("sim");
        } else {
            setFurnished("não");
        }
        console.log(furnished)
      };

      function handleClearAdress() {
        setAdressSelected("")
        setSearch("")
      }
    
      function handleLinkSearchProperty(e) {
        if(code === true) {

            window.open(`/imovel/${codeImob}`,"_self")
            return;
        }
        if(status === ""){
            toast.error("Venda ou aluguel?");
            return
        }
        if(cityNew === "" || ufNew === "") {
            toast.error("Selecione o local desejado");
            return
        }
        e.preventDefault();
       window.open(`/imoveis/${status}?district=${districtNew}&city=${cityNew}&uf=${ufNew}&tipo=${type}&subtipo=${subType}&quartos=${bedroom}&suites=${suite}&banheiros=${restroom}&garagem=${garage}`,"_self")
      // window.open(`/imoveis/${status}?uf=${ufNew}&city=${cityNew}&district=${districtNew}&tipo=${type}&subtipo=${subType}&quartos=${bedroom}&suites=${suite}&banheiros=${restroom}&garagem=${garage}&pets=${pets}&mobilha=${furnished}`,"_self")
    }

    return (
        <div className="SearchPropertyHomeTop">
            <div className="selectButtonsHomeTop">
            <button className={status === "Venda" ? "btn" : "btn1"} onClick={() => handleActiveCode(false, "Venda", true)}>Venda</button>
            <button className={status === "Aluguel" ? "btn2" : ""} onClick={() => handleActiveCode(false, "Aluguel", true)}>Aluguel</button>
            {/* <button className={status === "Temporada" ? "btn2" : ""} onClick={() => handleActiveCode(false, "Temporada", true)}>Temporada</button> */}
            <button className={status === "Codigo" ? "btn3" : "btn4"} onClick={() => handleActiveCode(true, "Codigo", false)}>Código</button>
                </div>   
            <div className="search">
                {code === false ?
                <>
            <select className="primary" value={type} onChange={handleType}>
                        <option value="">Tipo</option>
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Rural">Rural</option>
                        <option value="Terrenos e Lotes">Terrenos e Lotes</option>
                    </select>
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

     
                    <input type="text" placeholder="Digite bairro, cidade ou estado" value={AdressSelected === "" ? search : AdressSelected} onChange={e => setSearch(e.target.value)} />
                    {AdressSelected === "" ? "" :
                    <button onClick={handleClearAdress} className="btnClear"><IoClose /></button>
                    }

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
                </>
                    :
                    <>
                    <input type="text" className="inputCode" placeholder="Digite o código" value={codeImob} onChange={e => setCodeImob(e.target.value)}/>
                    </>
                }
                    {viewFilter === true ?
                     filter ===  true ?
                     <button className="filter" onClick={handleFilter}><IoRemoveOutline/> filtros </button>
                     :
                     <button className="filter" onClick={handleFilter}><IoAddOutline/> filtros </button>
                    
                    :
                    ""}
                     {filter ===  true ? "" :
                     <button className="btnSearch" onClick={handleLinkSearchProperty}><IoSearch /></button>
                    }
                    <button className="mobile" onClick={handleLinkSearchProperty}><IoSearch /></button>
            </div>
            {search === "" || searchFilter.length === 0 || AdressSelected !== "" ? "" :
            <div className="search2">
                <div className="listAdress">
                    {searchFilter.map((adress) => {
                        return (
                            <h6 key={adress.id} onClick={() => handleSelectAddress(`${adress.district} - ${adress.city} - ${adress.uf}`)}>{adress.district} - {adress.city} - {adress.uf}</h6>
                        )
                    })}      
                </div>
            </div>
             }

            {filter === true ? 
            <div className="viewFilter">
                            <div className="search">
                                 <select value={bedroom} onChange={handleBedroom} className={bedroom === "" ? "" : "select"}>
                                    <option value="">Quartos</option>
                                    <option value="1">1 Quarto</option>
                                    <option value="2">2 Quartos</option>
                                    <option value="3">3 Quartos</option>
                                    <option value="4">4 Quartos</option>
                                    <option value="5">5 Quartos</option>
                                    <option value="6">6 Quartos</option>
                                    <option value="7">7 Quartos</option>
                                    <option value="8">8 Quartos</option>
                                    <option value="9">9 Quartos</option>
                                    <option value="10">10 Quartos</option>
                                </select>
                                 <select value={suite} onChange={handleSuite} className={suite === "" ? "" : "select"}>
                                    <option value="">Suites</option>
                                    <option value="1">1 Suite</option>
                                    <option value="2">2 Suites</option>
                                    <option value="3">3 Suites</option>
                                    <option value="4">4 Suites</option>
                                    <option value="5">5 Suites</option>
                                    <option value="6">6 Suites</option>
                                    <option value="7">7 Suites</option>
                                    <option value="8">8 Suites</option>
                                    <option value="9">9 Suites</option>
                                    <option value="10">10 Suites</option>
                                </select>
            
                                <select value={restroom} onChange={handleRestroom} className={restroom === "" ? "" : "select"}>
                                    <option value="">Banheiros</option>
                                    <option value="1">1 Banheiro</option>
                                    <option value="2">2 Banheiros</option>
                                    <option value="3">3 Banheiros</option>
                                    <option value="4">4 Banheiros</option>
                                    <option value="5">5 Banheiros</option>
                                    <option value="6">6 Banheiros</option>
                                    <option value="7">7 Banheiros</option>
                                    <option value="8">8 Banheiros</option>
                                    <option value="9">9 Banheiros</option>
                                    <option value="10">10 Banheiros</option>
                                </select>
            
                                <select value={garage} onChange={handleGarage} className={garage === "" ? "" : "select"}>
                                    <option value="">Garagem</option>
                                    <option value="1">1 Vaga</option>
                                    <option value="2">2 Vagas</option>
                                    <option value="3">3 Vagas</option>
                                    <option value="4">4 Vagas</option>
                                    <option value="5">5 Vagas</option>
                                    <option value="6">6 Vagas</option>
                                    <option value="7">7 Vagas</option>
                                    <option value="8">8 Vagas</option>
                                    <option value="9">9 Vagas</option>
                                    <option value="10">10 Vagas</option>
                                </select>
            

                                 <button className="btnSearch" onClick={handleLinkSearchProperty}><IoSearch /></button>
                        </div>
            </div>
            :
            ""}
{/* 
            <div className="textLocation">
                <div className="checkDiv">
                    <input type="checkbox" value={pets} onChange={handleSelectPets} checked={isCheckedPets}/>
                    <h5><TbBone />Aceita pets</h5>
                </div>
                <div className="checkDiv">
                    <input type="checkbox" value={furnished} onChange={handleSelectFurnished} checked={isCheckedFurnished}/>
                    <h5><TbSofa />Com mobilha</h5>
                </div>
            </div> */}

            
      

        </div>
    )
}
