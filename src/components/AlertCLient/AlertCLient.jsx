import "./alertCLient.css";
import {IoCall,IoMail, IoLocationOutline, IoLogoWhatsapp, IoMailOutline, IoChatboxEllipsesOutline, IoCloseOutline} from 'react-icons/io5'
import {FaIdCard} from 'react-icons/fa'
import {HiOutlineIdentification} from 'react-icons/hi'
import imobiliária from "../../assets/images/imob1.png";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import Modal from 'react-modal';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function AlertCLient({idProperty, idCompany}) {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const {newContact} = useContext(AuthContext);

    const [isOpenModal, setIsOpenModa] = useState(false);
    const [isOpenModalPhone, setIsOpenModaPhone] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const {data} = useFetch(`/company/unic/${idCompany}`)

    if(!data) {
        return (
            <h6>Carregando...</h6>
        )
    }

    function handleCreateNewAlert() {
        if(user === null) {
            handleOpenModal()
        }
        newContact({
        idProperty: idProperty, idCompany: idCompany, idClient: user.id, name: user.name,
        email: user.email, phone: user.phone, whatsapp: user.whatsapp, type: type, link: `http://www.suachave.com.br/imovel/${idProperty}`})
    }


    function handleOpenModal(e) {
        e.preventDefault();
          setIsOpenModa(true)
        }
      
        function handleCloseModal(e) {
          e.preventDefault();
          setIsOpenModa(false);
        }
  
    Modal.setAppElement('#root');

    return (
        <div className="AlertCLient">
            <button onClick={handleCreateNewAlert}></button>


        </div>
    )
}