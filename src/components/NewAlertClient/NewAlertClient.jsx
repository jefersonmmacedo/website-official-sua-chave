import "./newAlertClient.css"
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useState } from "react";
import Modal from 'react-modal';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { IoAlertCircleOutline, IoCloseOutline } from "react-icons/io5";

export function NewAlertClient({status, district, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished, idProperty}) {
  const Local = localStorage.getItem("suachave");
  const user = JSON.parse(Local);

  console.log({status, district, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished, idProperty});

  const { handleNewAlertClient } = useContext(AuthContext);

  const [isOpenModal, setIsOpenModa] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");


  function handleClickClient() {
    setIsOpenModa(true)
  //   if(user === null) {
  //     return;
  // }
    // handleNewAlert()
  }
  
  function handleNewAlert() {
    const nameUser = user === null ? name : user.name;
    const emailUser = user === null ? email : user.email;
    const whatsappUser = user === null ? phone : user.whatsapp;

    handleNewAlertClient({idProperty, name: nameUser, email: emailUser, whatsapp: whatsappUser, status, district, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished})
    setIsOpenModa(false);
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
      <>
      <button className="NewAlertClient" onClick={handleClickClient}>
      <HiOutlineBellAlert /> Quero receber alerta de imóveis similares
      </button>


      
      <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Message">
            <div className="itensModalMessage">
              {user !== null ? 
              <>
              <IoAlertCircleOutline/>
               <h2>Ao clicar em criar alerta você receberá alertas de novos imóveis similares a este! </h2>
               <br />
              </>
                :
              ""}
              {user !== null  ? "" :
              <>
                    <IoAlertCircleOutline/>
                    <h2>Preencha seus dados para receber alertas de novos imóveis similares a este! </h2>

                    <form action="">
                        <span style={{marginLeft: 10}}>Nome</span>
                        <input type="text" placeholder="Nome completo" style={{borderRadius: 25}} value={name} onChange={e => setName(e.target.value)}/>
                        <span style={{marginLeft: 10}}>Whatsapp</span>
                        <input type="text" placeholder="(XX)XXXXX-XXXX" style={{borderRadius: 25}} value={phone} onChange={e => setPhone(e.target.value)}/>
                        <span style={{marginLeft: 10}}>Email</span>
                        <input type="text" placeholder="seuemail@provedor.com" style={{borderRadius: 25}} value={email} onChange={e => setEmail(e.target.value)}/>
                    </form>
              </>
               }

                    <button className="btnCLient" onClick={handleNewAlert} style={{borderRadius: 25}}>Criar Alerta</button>

                    <h6>Ao criar um alerta você está concordando que imobiliárias e corretores com imóveis similares entrem em contato com você para oferta-los.</h6>

            </div>
            </div>
            </Modal>
      </>
    )
}
