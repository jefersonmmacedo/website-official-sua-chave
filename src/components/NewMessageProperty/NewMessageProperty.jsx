import "./newMessageProperty.css"
import { IoAlertCircleOutline, IoChatboxEllipses, IoCloseOutline, IoHeart, IoPerson } from "react-icons/io5";
import { useState } from "react";
import Modal from 'react-modal';
import {v4 as uuidv4} from "uuid";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function NewMessageProperty({idProperty, idCompany, imageProperty}) {
  const Local = localStorage.getItem("suachave");
  const user = JSON.parse(Local);

  const [isOpenModal, setIsOpenModa] = useState(false);
  const [isOpenModalLogin, setIsOpenModaLogin] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {loginSessionFast, loading} = useContext(AuthContext);


  const {data} = useFetch(`/rooms/${idProperty}/${idCompany}/${user?.id}`);

  if(data) {
    console.log(data);
  }

  function handleNewChatMessage() {
      if(data?.length > 0) {
        window.open(`/chat/${data[0]?.room}/${idProperty}/${idCompany}/${user?.id}`, "_self");
        return
      }

      handleCreateNewChatmenssage()
  }

  async function handleCreateNewChatmenssage() {
    const newRoom = {
      id: uuidv4().substring(0,8),
      idClient: user?.id,
      idCompany,
      idProperty,
      imageProperty
    }
    await api.post("/rooms", newRoom).then((res) => {
      window.open(`/chat/${newRoom.id}/${newRoom.idProperty}/${newRoom.idCompany}/${newRoom.idClient}`, "_self");
    }).catch((err) => {
      console(err);
    });
  }

  

    function handleOpenModal(e) {
        e.preventDefault();
          setIsOpenModa(true)
        }
      
        function handleCloseModal(e) {
          e.preventDefault();
          setIsOpenModa(false);
        }

    function handleOpenModalLogin(e) {
        e.preventDefault();
        setIsOpenModaLogin(true);
        setIsOpenModa(false);
        }

        function handleOpenModalLogin3(e) {
          window.open("/cadastrar", "_self")
          }
      
        function handleCloseModalLogin(e) {
          e.preventDefault();
          setIsOpenModaLogin(false);
        }

        function handleLogin(e) {
          e.preventDefault();
          loginSessionFast({email: login, password:password})
          console.log({email: login, password:password})
      }
  
  

    Modal.setAppElement('#root');

    return (
        <>
        <button className="buttonFavorite" onClick={user === null ? handleOpenModal : handleNewChatMessage}><IoChatboxEllipses/> Mensagem</button>

        <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Favorite">
            <div className="itensModalFavorite">
                    <IoChatboxEllipses />

                    <h1>Oba! <br />
                    Vamos conversar.</h1>

                    <h4>Entre em sua conta ou cadastre-se para para poder mandar mensagens e ter mais detalhes sobre os anúncios.</h4>

                   
                    <div className="buttons">
                    <button className="button2" onClick={handleOpenModalLogin}>Fazer login</button>
                    <button className="button1" onClick={handleOpenModalLogin3}>Criar conta</button>
                </div>

            </div>
            </div>
            </Modal>


            <Modal isOpen={isOpenModalLogin} onRequestClose={handleCloseModalLogin}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalLogin}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Favorite">
            <div className="itensModalFavorite">
                    <IoPerson />

                    <h1>Faça login</h1>

                   <div className="form">
                   <input type="text" placeholder="Email ou ID" value={login} onChange={(e) => setLogin(e.target.value)}/>
                   <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>

                        {loading === true ? "" :
                         <div className="message">
                         <h5><IoAlertCircleOutline /> Email/Id ou senha incorretos.</h5>
                         <h5> Caso sua conta seja empresarial, clique no botão Imobiliária acima.</h5>
                       </div>
                        }

                <div className="buttons">
                <button className="button2" onClick={handleLogin}>Entrar</button>
                    <button className="button1" onClick={handleCloseModalLogin}>Sair</button>
                </div>

                
                   </div>

                    

            </div>
            </div>
            </Modal>
        </>
    )
}
