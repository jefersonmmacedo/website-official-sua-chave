import "./companyList.css";
import {IoArrowForwardOutline, IoHomeOutline, IoLocationOutline} from 'react-icons/io5'
import buscaDistrito from "../../services/api-buscaDistrito";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import api from "../../services/api";
import { useState } from "react";
import comming from "../../assets/images/svg/comming.svg";
import { CounterPropertiesCompany } from "../CounterPropertiesCompany/CounterPropertiesCompany";
import { useFetch } from "../../hooks/useFetch";

export function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [districtAll, setDistrictAll] = useState([]);
    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();
    const type = "Imobiliária";

    // useEffect(() => {
    //     async function companiesLoad() {
    //         await api.get(`/company/all`).then((res) => {
    //             console.log(res.data);
    //             setCompanies(res.data);
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    //     }

    //     companiesLoad()
    // },[])

    const { data } = useFetch(`/company/all`)
    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }
    
    function handleClearAddress(e) {
        e.preventDefault();
        
        setCity("")
        setUf("")
    }

    function handleClearSearch(e) {
        setSearch("")
    }

    
    async function handleSearchDistrict(ufSelect) {
        console.log(ufSelect)
        try {
          const res = await buscaDistrito.get(`${ufSelect}/distritos`) 
            console.log(res.data)
            setDistrictAll(res.data)
            console.log(res.data[0].municipio.nome);
            return;
          }catch{
            console.log("error")
            toast.error("Escolha um estado e clica em buscar cidades")
        }
        return
    }

    if(districtAll) {
        districtAll.sort(function(a,b) {
            if(a.nome < b.nome ) {
                return -1
            } else {
                return true
            }
        })
        }
 
    function handleSetectCity(e) {
        console.log(e.target.value)
        setCity(e.target.value)
      }
      function handleSetectUf(e) {
          console.log(e.target.value)
          handleSearchDistrict(e.target.value)
          setUf(e.target.value)
          handleClearSearch()
      }

    const locationFilter = data?.filter((companies) => companies.city === city && companies.uf === uf)
    const searchFilter = data?.filter((companies) => companies.fantasyName.toLowerCase().includes(searchLower))

    const filterData = search !== "" ? searchFilter
                    : city !== "" && uf !== "" ? locationFilter
                    : data

    return (
        <div className="CompanyList">
            <div className="searchCompanies">
            <input type="text" placeholder="Busque pelo nome" value={search} onChange={e => setSearch(e.target.value)} onClick={handleClearAddress}/>   
               <select value={uf} onChange={handleSetectUf}> 
                           <option value="">Escolha seu estado</option>
                           <option value="AC">Acre</option>
                           <option value="AL">Alagoas</option>
                           <option value="AP">Amapá</option>
                           <option value="AM">Amazonas</option>
                           <option value="BA">Bahia</option>
                           <option value="CE">Ceará</option>
                           <option value="DF">Distrito Federal</option>
                           <option value="ES">Espírito Santo</option>
                           <option value="GO">Goiás</option>
                           <option value="MA">Maranhão</option>
                           <option value="MT">Mato Grosso</option>
                           <option value="MS">Mato Grosso do Sul</option>
                           <option value="MG">Minas Gerais</option>
                           <option value="PA">Pará</option>
                           <option value="PB">Paraíba</option>
                           <option value="PR">Paraná</option>
                           <option value="PE">Pernambuco</option>
                           <option value="PI">Piauí</option>
                           <option value="RJ">Rio de Janeiro</option>
                           <option value="RN">Rio Grande do Norte</option>
                           <option value="RS">Rio Grande do Sul</option>
                           <option value="RO">Rondônia</option>
                           <option value="RR">Roraima</option>
                           <option value="SC">Santa Catarina</option>
                           <option value="SP">São Paulo</option>
                           <option value="SE">Sergipe</option>
                           <option value="TO">Tocantins</option>
                           <option value="EX">Estrangeiro</option>     
                   </select>
                   <select value={city} onChange={handleSetectCity}> 
                   {districtAll.length === 0 ?
                   <option value={city}>{city}</option>
                   :
                   <>
                   <option value="">Escolha sua cidade</option>
                   {districtAll?.map((district) => {
                           return (
                               <option autocomplete="off" key={district.id} value={district.nome}>{district.nome}</option>
                           )
                       })}
                   </>
                   }     
                   </select>
            </div>
            <div className="listProperties">
            {

            filterData.length > 0 ?
            
            filterData.map((company) => {
                return (
                    company.verified !== true ? "" :
            <div className="propertyUnicFavorite" key={company.id}>
                    <div className="image">
                        <a href={`/imobiliaria/${company.nameSlug}`}>
                    <img src={company.logo} alt="" />
                        </a>
                    </div>
                    <div className="text">
                    <a href={`/imobiliaria/${company.nameSlug}`}>
                    <h4>{company.fantasyName}</h4>
                    </a>
                    {company.viewAddress === false ? "" :
                    <h6><IoLocationOutline/>{company.road} - {company.number} - {company.district} - {company.city} - {company.uf}</h6>
                    }
                    <h6><IoHomeOutline /><CounterPropertiesCompany id={company.id}/> Anúncios</h6>
                    <a className="LinkCompany" href={`/imobiliaria/${company.nameSlug}`}>
                       <IoArrowForwardOutline/> Ver empresa
                    </a>
                    </div>
                </div> 
                )
            })
        :
            <div className="empyt">
                <img src={comming} alt="Imagem correpondente a busca sem resposta" />

                <h4>Nenhuma imobiliária encontrada. Indique-nos</h4>
            </div>
            }
                </div>        
        </div>
    )
}