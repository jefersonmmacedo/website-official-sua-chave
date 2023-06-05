import "./company.css";
import Navbar2 from "../../components/Nav/Navbar";
import { IoLocationOutline, IoCallOutline, IoLogoWhatsapp, IoMailOutline, IoGlobeOutline, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube, IoCloseOutline } from "react-icons/io5";
import { Footer } from "../../components/Footer/Footer";
import Modal from 'react-modal';
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { PropertyUnicBlock } from "../../components/PropertyUnicBlock/PropertyUnicBlock";
import { useContext, useState } from "react";
import api from "../../services/api";
import {RiStore2Line} from "react-icons/ri";
import {MdOutlineMapsHomeWork} from "react-icons/md";
import {TbTractor, TbMap2, TbBuildingFactory} from "react-icons/tb";
import { AuthContext } from "../../contexts/Auth";
import {HiOutlineIdentification} from 'react-icons/hi'

export function Company() {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const {newContactCompany} = useContext(AuthContext);

    const {nameSlug} = useParams()
    const {data} = useFetch(`/company/unicSlug/${nameSlug}`);

    const [property, setProperty] = useState([])
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [isOpenModal, setIsOpenModa] = useState(false);
    const [isOpenModalPhone, setIsOpenModaPhone] = useState(false);

    if(!data) {
        return (
            <>Carregando...</>
        )
    }
    
    if(data) {
       async function loadProperties() {
        await api.get(`property/company/${data[0].id}`).then((res) => {
            setProperty(res.data)
        }).catch((error) => {
            console.log(error)
        })
       }

       loadProperties()
    }

    function handleSetType(data) {
        setType(data)
        console.log(data)
    }
    function handleSetStatus(data) {
        setStatus(data)
        console.log(data)
    }
    function handleSelectType(e) {
        setType(e.target.value)
    }
    function handleSelectStatus(e) {
        setStatus(e.target.value)
    }


    function handlenewContactCompanyButton(typeButton) {
        newContactCompany({
        idProperty: "Contato direto", nameCompany: data[0]?.fantasyName, idCompany: data[0]?.id, idClient: user.id, name: user.name, whatsappCompany: data[0]?.whatsapp, phoneCompany: data[0]?.phone,
        email: user.email, phone: user.phone, whatsapp: user.whatsapp, type: typeButton})
    }

    function handlenewContactCompanyModal(typeButton) {
        newContactCompany({
        idProperty: "Contato direto", nameCompany:data[0]?.fantasyName, idCompany: data[0]?.id, idClient: "User Sem cadastro", name: name, whatsappCompany: data[0]?.whatsapp, phoneCompany: data[0]?.phone,
        email: email, phone: phone, whatsapp: phone, type: typeButton})

        if(typeButton === "WhatsApp") {
            setIsOpenModa(false)
        } else {
            setIsOpenModaPhone(false)
        }
    }



    const typeFilter = property?.filter((property) => property.type === type);
    const statusFilter = property?.filter((property) => property.status === status);
    const typeFilterStatus = property?.filter((property) => property.type === type && property.status === status);
    
    const filterData = type !== "" && status === "" ? typeFilter
                        : type === ""  && status !== "" ? statusFilter
                        : type !== ""  && status !== "" ? typeFilterStatus
                        : property



    function handleOpenModal(e) {
        e.preventDefault();
          setIsOpenModa(true)
        }
      
        function handleCloseModal(e) {
          e.preventDefault();
          setIsOpenModa(false);
        }
  
    function handleOpenModalPhone(e) {
        e.preventDefault();
          setIsOpenModaPhone(true)
        }
      
        function handleCloseModalPhone(e) {
          e.preventDefault();
          setIsOpenModaPhone(false);
        }
  

    Modal.setAppElement('#root');

    return (
       <div className="Company">
        <Navbar2 />
        <div className="mainCompany">
          <div className="CompanyUnic">
                    <div className="title">
                        <div className="image">
                            <img src={data[0].logo} alt="" />
                        </div>
                        <div className="textTitle">
                    <h2>{data[0].fantasyName}</h2>
                    <h5><HiOutlineIdentification /> CRECI: {data[0].creci}</h5>
                    {data[0].viewAddress === false ? "" :
                    <h5><IoLocationOutline /> {data[0].road}, Nº {data[0].number} - {data[0].district} - {data[0].city} - {data[0].uf}</h5>
                    }
                    <div className="iconsCompany">
                        <div className="iconCompanyUnic">
                            <div className="simbol">
                                <IoCallOutline />
                                <p>{data[0].phone}</p>
                            </div>
                        </div>
                        <div className="iconCompanyUnic">
                            <div className="simbol">
                                <IoLogoWhatsapp />
                                <p>{data[0].whatsapp}</p>
                            </div>
                        </div>
                        <div className="iconCompanyUnic">
                            <div className="simbol">
                                <IoMailOutline />
                                <p>{data[0].email}</p>
                            </div>
                        </div>   
                        {data[0].website === "" ? "" :                     
                        <div className="iconCompanyUnic">
                            <div className="simbol">
                                <IoGlobeOutline />
                                <p>{data[0].website}</p>
                            </div>
                        </div> 
                        }                       
                    </div>
                    <div className="network">
                        {data[0].facebook === "" ? "" :
                        <a href={data[0].facebook} target="_blank" rel="noreferrer">
                                <button className="networkButton"><IoLogoFacebook/></button>
                        </a>
                        }
                        {data[0].instagram === "" ? "" :
                        <a href={data[0].instagram} target="_blank" rel="noreferrer">
                                <button className="networkButton"><IoLogoInstagram/></button>
                        </a>
                         }
                         {data[0].linkedin === "" ? "" :
                        <a href={data[0].linkedin} target="_blank" rel="noreferrer">
                                <button className="networkButton"><IoLogoLinkedin/></button>
                        </a>
                         }
                         {data[0].youtube === "" ? "" :
                        <a href={data[0].youtube} target="_blank" rel="noreferrer">
                                <button className="networkButton"><IoLogoYoutube/></button>
                        </a>
                        }
                            </div>
                    <div className="buttonsContactCompany">
                        <button  onClick={user == null ? handleOpenModal : () => handlenewContactCompanyButton("Whatsapp")} className="btnWhats"><IoLogoWhatsapp />Whatsapp</button>
                        <button onClick={user == null ? handleOpenModalPhone : () => handlenewContactCompanyButton("Ligação") } className="btnPhone"><IoCallOutline />Ligar</button>
                    </div>
                        </div>
                    </div>
                    {/* <BrokerList /> */}
                </div>

                <div className="textProperties">
                     <h3>Veja os imoveis de {data[0].fantasyName}</h3>
                </div>
                <div className="buttonsProperties">
                <button className={type === "" ? "select" : ""}  onClick={() => handleSetType("")}>Todos</button>
                <button className={type === "Residencial" ? "select" : ""}  onClick={() => handleSetType("Residencial")}><MdOutlineMapsHomeWork />Residencial</button>
                <button className={type === "Comercial" ? "select" : ""}  onClick={() => handleSetType("Comercial")}><RiStore2Line />Comercial</button>
                <button className={type === "Industrial" ? "select" : ""}  onClick={() => handleSetType("Industrial")}><TbTractor />Industrial</button>
                <button className={type === "Rural" ? "select" : ""}  onClick={() => handleSetType("Rural")}><TbBuildingFactory />Rural</button>
                <button className={type === "Terrenos e Lotes" ? "select" : ""}  onClick={() => handleSetType("Terrenos e Lotes")}><TbMap2 />Terrenos e Lotes</button>
                </div>
                <div className="buttonsProperties">
                <button className={status === "" ? "select" : ""}  onClick={() => handleSetStatus("")}>Aluguel/Venda</button>
                <button className={status === "Venda" ? "select" : ""}  onClick={() => handleSetStatus("Venda")}>Venda</button>
                <button className={status === "Aluguel" ? "select" : ""}  onClick={() => handleSetStatus("Aluguel")}>Aluguel</button>
                </div>
                <div className="buttonsProperties">
                    <select value={type} onChange={handleSelectType}>
                        <option value="">Todos</option>
                        <option value="Residencial"><MdOutlineMapsHomeWork />Residencial</option>
                        <option value="Comercial"><RiStore2Line />Comercial</option>
                        <option value="Industrial"><TbTractor />Industrial</option>
                        <option value="Rural"><TbBuildingFactory />Rural</option>
                        <option value="Terrenos e Lotes"><TbMap2 />Terrenos e Lotes</option>
                    </select>
                    <select value={status} onChange={handleSelectStatus}>
                        <option value="">Aluguel/Venda</option>
                        <option value="Venda">Venda</option>
                        <option value="Aluguel">Aluguel</option>
                    </select>
                </div>
                {filterData?.length > 0 ?
         <div className="itens">
            {filterData?.map((properties) => {
                return (
                    properties.availability !== "Disponível" ? "" :
                        <PropertyUnicBlock id={properties.id} key={properties.id}/>
                    )
                })}
            </div> 
            :
                <div className="MainAbout">
                    <h4>Nenhum imóvel localizado</h4>
                </div>
        }
                {/* <button className="btnCompany">Carregar mais imóveis</button> */}
        </div>
        <Footer />



        
        <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Message">
            <div className="itensModalMessage">
                    <h2>Fale conosco! </h2>

                    <form action="">
                        <span>Nome</span>
                        <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}/>
                        <span>Whatsapp</span>
                        <input type="text" placeholder="(XX)XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <span>Email</span>
                        <input type="text" placeholder="seuemail@provedor.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </form>

                    <button onClick={() => handlenewContactCompanyModal("Whatsapp")}>Ir para Whatsapp</button>

            </div>
            </div>
            </Modal>
                <Modal isOpen={isOpenModalPhone} onRequestClose={handleCloseModalPhone}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalPhone}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Message">
            <div className="itensModalMessage">
                    <h2>Fale conosco! </h2>

                    <form action="">
                        <span>Nome</span>
                        <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}/>
                        <span>Telefone</span>
                        <input type="text" placeholder="(XX)XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <span>Email</span>
                        <input type="text" placeholder="seuemail@provedor.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </form>

                    <button onClick={() => handlenewContactCompanyModal("Ligação")}>Ir para Ligação</button>

            </div>
            </div>
            </Modal>

       </div>
      )
}