import "./companyInfo.css";
import {IoCall,IoMail, IoLocationOutline, IoLogoWhatsapp, IoMailOutline, IoChatboxEllipsesOutline, IoCloseOutline, IoInformationOutline, IoAlertCircle} from 'react-icons/io5'
import {FaIdCard} from 'react-icons/fa'
import {HiOutlineIdentification} from 'react-icons/hi'
import imobiliária from "../../assets/images/imob1.png";
import { useState } from "react";
import Modal from 'react-modal';
import { useFetch } from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useEffect } from "react";
import ReactTooltip from 'react-tooltip';

export function CompanyInfo({idProperty, idCompany}) {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const {newContact} = useContext(AuthContext);

    const profile = "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?b=1&s=170667a&w=0&k=20&c=7WCqA9IZcIhn6UQbi6Kx1EtdnhEgVOOHwLi0rTMtbCo="

    const [isOpenModal, setIsOpenModa] = useState(false);
    const [isOpenModalPhone, setIsOpenModaPhone] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }
  
        function success(position) {
            const lat1  = position.coords.latitude;
            const long1 = position.coords.longitude;
        
            setLatitude(lat1);
            setLongitude(long1);
            
          }

      function error() {
        console.log('Unable to retrieve your location');
      }

      getLocation()
  
    },[])

    const {data} = useFetch(`/company/unic/${idCompany}`)

    if(!data) {
        return (
            <h6>Carregando...</h6>
        )
    }

    function handleNewContactButton(type) {
        newContact({
        idProperty: idProperty, idCompany: idCompany, idClient: user.id, name: user.name, whatsappCompany: data[0]?.whatsapp, phoneCompany: data[0]?.phone,
        email: user.email, phone: user.phone, whatsapp: user.whatsapp, type: type, origin: "Portal", latitude, longitude,
        link: `http://www.suachave.com.br/imovel/${idProperty}`})
    }

    function handleNewContactModal(type) {
        newContact({
        idProperty: idProperty, idCompany: idCompany, idClient: "User Sem cadastro", name: name, whatsappCompany: data[0]?.whatsapp, phoneCompany: data[0]?.phone,
        email: email, phone: phone, whatsapp: phone, type: type, origin: "Portal", latitude, longitude,
        link: `http://www.suachave.com.br/imovel/${idProperty}`})

        if(type === "WhatsApp") {
            setIsOpenModa(false)
        } else {
            setIsOpenModaPhone(false)
        }
    }


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
        <div className="CompanyInfo">
            {data.length === 0 ?
                        <div className="Head">
                        <div className="image">
                            <img src={profile} alt="" />
                        </div>
                        <div className="textHead">
                        <h4 >Empresa não localizada</h4>
                        <h5><IoLocationOutline />Endereço não localizado</h5>
                        <h5><HiOutlineIdentification />CRECI: Não localizado</h5>
                        </div>
                        </div>
            :
            <div className="Head">
            <div className="image">
            <a href={`/imobiliaria/${data[0]?.nameSlug}`}>
                <img src={data[0]?.logo} alt="" />
                </a>
            </div>
            <div className="textHead">
            {/* <h4 >{data[0]?.fantasyName}</h4> */}
            {data[0]?.viewAddress === false ? "" :
            <h5><IoLocationOutline />{data[0]?.road}, {data[0]?.number} - {data[0]?.district} - {data[0]?.city} - {data[0]?.uf}</h5>
            }
            <h5><HiOutlineIdentification />CRECI: <span> {data[0]?.creci}</span></h5>
            </div>
            </div>
            }
             {data.length === 0 ?
            <div className="contact">
                <h5>Essa empresa pode não estar mais em nossa base de dados.</h5>
                <a href={`https://wa.me/5521997429585?text=Olá. o Imóvel de ID: ${idProperty}. Encontra-se sem informações de contato.`} target="_blank" rel="noreferrer">Informar erro</a>
            </div>
            :
                <div className="buttonsContact">
                    <button className="btn-whats" onClick={user == null ? handleOpenModal : () => handleNewContactButton("Whatsapp")}><IoLogoWhatsapp /> Whatsapp</button>
                    <button onClick={user == null ? handleOpenModalPhone : () => handleNewContactButton("Ligação") }><IoCall /> Ligar </button>
                </div>
    }



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

                    <p>Porque pedimos essas informações? <IoAlertCircle data-tip data-for='Novo Cliente' size={22}/></p>
                    <ReactTooltip id='Novo Cliente' place="bottom" type="dark" effect="solid">
                      <span>Passar essas informações permite que a imobiliária ou corretor  consiga  <br /> retomar o contato em caso de um eventual problema de comunicação</span>
                    </ReactTooltip>

                    <button onClick={() => handleNewContactModal("Whatsapp")}>Ir para Whatsapp</button>

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

                    <p>Porque pedimos essas informações? <IoAlertCircle data-tip data-for='Novo Cliente' size={22}/></p>
                    <ReactTooltip id='Novo Cliente' place="bottom" type="dark" effect="solid">
                      <span>Passar essas informações permite que a imobiliária ou corretor  consiga  <br /> retomar o contato em caso de um eventual problema de comunicação</span>
                    </ReactTooltip>

                    <button onClick={() => handleNewContactModal("Ligação")}>Ir para Ligação</button>


            </div>
            </div>
            </Modal>
        </div>
    )
}