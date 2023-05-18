import "./newSearchClient.css"
import { useState } from "react";
import Modal from 'react-modal';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { IoCloseOutline } from "react-icons/io5";
import WomanSmartphone from "../../assets/images/background19.jpg"
import buscaDistrito from "../../services/api-buscaDistrito";
import { toast } from 'react-toastify';


export function NewSearchClient() {
  const Local = localStorage.getItem("suachave");
  const user = JSON.parse(Local);

  const { handleNewSearchClient } = useContext(AuthContext);

  const [isOpenModal, setIsOpenModa] = useState(false);

  const [name, setName] = useState(user === null ? "" : user.name);
  const [phone, setPhone] = useState(user === null ? "" : user.whatsapp);
  const [email, setEmail] = useState(user === null ? "" : user.email);
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [suite, setSuite] = useState("");
  const [restroom, setRestroom] = useState("");
  const [garage, setGarage] = useState("");
  const [pets, setPets] = useState("");
  const [furnished, setFurnished] = useState("");

  const [districtAll, setDistrictAll] = useState([]);


  const newName =  name?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
  const newDistrict =  district?.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());


  function handleClickClient() {
      setIsOpenModa(true)

  }
  
  function handleNewSearch() {

    handleNewSearchClient({name: newName, email, whatsapp: phone, status, district: newDistrict, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished})
    setIsOpenModa(false);
  }
  
    function handleCloseModal(e) {
      e.preventDefault();
      setIsOpenModa(false);
    }

    function handleStatus(e) {
      setStatus(e.target.value)
      console.log(e.target.value)
  }
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

  function handlePets(e) {
      setPets(e.target.value)
      console.log(e.target.value)
  }

  function handleFurnished(e) {
      setFurnished(e.target.value)
      console.log(e.target.value)
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
  }


Modal.setAppElement('#root');
    return (
      <div className="NewSearchClient">
  <div className="imageClient">
    <img src={WomanSmartphone} alt="Imagem de mulher tomando café da manhã segurando um smartphone" />
  </div>

  <div className="txtSearch">
    <h1>Não encontrou o imóvel que deseja?</h1>
      <h4>Cadastre as características imóvel que procura, e em caso de match uma imobiliária ou corretor entrará em contato.</h4>
      
      <button onClick={handleClickClient}>Cadastre o imóvel que procura</button>
  
  </div>


      
      <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Searching">
            <div className="itensModalSearching">
                    <h2>Preencha seus dados do imóvel que deseja encontrar! </h2>

                    <div className="form">
                  {user !== null ? "" :
                      <div className="dataItem">
                        <div className="dataItemSearch">
                        <h6>Nome</h6>
                        <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="dataItemSearch">
                        <h6>Whatsapp</h6>
                        <input type="text" placeholder="(XX)XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)}/>
                        </div>
                        <div className="dataItemSearch">
                        <h6>Email</h6>
                        <input type="text" placeholder="seuemail@provedor.com" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                      </div>
                  }

                      <div className="dataItem">
                        <div className="dataItemSearch">
                        <h6>Status</h6>
                        <select value={status} onChange={handleStatus} className={status === "" ? "" : "select"}>
                          <option value="">Selecione</option>
                          <option value="Venda">Venda</option>
                          <option value="Aluguel">Aluguel</option>
                          <option value="Temporada">Temporada</option>
                        </select>
                        </div>
                        <div className="dataItemSearch">
                        <h6>Tipo</h6>
                        <select value={type} onChange={handleType} className={type === "" ? "" : "select"}>
                          <option value="">Selecione</option>
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Rural">Rural</option>
                        <option value="Terrenos e Lotes">Terrenos e Lotes</option>
                        </select>
                        </div>
                        <div className="dataItemSearch">
                        <h6>Subtipo</h6>
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
                        :  <option value="">Subtipo</option>
                        }
                    </select>
                        </div>
                      </div>
                      
                      <div className="dataItem">
                      <div className="dataItemSearch">
                        <h6>Estado</h6>
                        
                        <select value={uf} onChange={handleSetectUf} className={uf === "" ? "" : "select"}> 
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
                        </div>
 
                        <div className="dataItemSearch">
                        <h6>Cidade</h6>
                        <select value={city} onChange={handleSetectCity} className={city === "" ? "" : "select"}> 
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
                        <div className="dataItemSearch">
                        <h6>Bairro</h6>
                        <input type="text" placeholder="Digite" value={district} onChange={e => setDistrict(e.target.value)} className={district === "" ? "" : "select"}/>
                        </div>

                      </div>

                      <div className="dataItem">
                        <div className="dataItemSearch">
                        <h6>Quartos</h6>
                        <select value={bedroom} onChange={handleBedroom} className={bedroom === "" ? "" : "select"}>
                        <option value="">Selecione</option>
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
                        </div>
                        <div className="dataItemSearch">
                        <h6>Suites</h6>
                        <select value={suite} onChange={handleSuite} className={suite === "" ? "" : "select"}>
                        <option value="">Selecione</option>
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
                        </div>
                        <div className="dataItemSearch">
                        <h6>Banheiro</h6>
                        <select value={restroom} onChange={handleRestroom} className={restroom === "" ? "" : "select"}>
                        <option value="">Selecione</option>
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
                        </div>
                      </div>

                      <div className="dataItem">
                        <div className="dataItemSearch">
                        <h6>Garagem</h6>
                        <select value={garage} onChange={handleGarage} className={garage === "" ? "" : "select"}>
                        <option value="">Selecione</option>
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
                        </div>
                        <div className="dataItemSearch">
                        <h6>Aceita Pets</h6>
                        <select value={pets} onChange={handlePets} className={pets === "" ? "" : "select"}>
                          <option value="">Selecione</option>
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </select>
                        </div>
                        <div className="dataItemSearch">
                        <h6>Com mobilha</h6>
                        <select value={furnished} onChange={handleFurnished} className={furnished === "" ? "" : "select"}>
                          <option value="">Selecione</option>
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                        </select>
                        </div>
                      </div>
                     
                    </div>

                    <button onClick={handleNewSearch}>Cadastrar solicitação</button>
                    <h6>Caso uma imobiliária ou corretor cadastrado em nossa plataforma tenha um imóvel dentro dos padrões que enviou. <br /> Eles entrarão em contato para apresentar a você.</h6>

            </div>
            </div>
            </Modal>
      </div>
    )
}
