﻿import "./newScheduling.css"
import { IoCalendar, IoCloseOutline, IoLocationOutline, IoBusinessOutline, IoHome, IoVideocam, IoPerson, IoAlertCircleOutline } from "react-icons/io5";
import Modal from 'react-modal';
import { useEffect, useState, useContext } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from "../../services/api";
import { AuthContext } from "../../contexts/Auth";
import {IoArrowBackOutline, IoArrowForwardOutline} from "react-icons/io5";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export function NewScheduling({idProperty, idCompany, title, image, type, subType}) {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const [view, setView] = useState("")

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const {newScheduling, loginSessionFast, loading} = useContext(AuthContext)

    const [isOpenModal, setIsOpenModa] = useState(false);
    const [isOpenModalLogin, setIsOpenModaLogin] = useState(false);
    const [isOpenModalLogin2, setIsOpenModaLogin2] = useState(false);


    const [dateSelected, setDateSelected] = useState();
    const [shift, setShift] = useState();
    const [hour, setHour] = useState();
    const [ownACar, setOwnACar] = useState();
    const [similarProperties, setSimilarProperties] = useState();
    const [amountOfPeople, setAmountOfPeople] = useState();
    const [meet, setMeet] = useState();

    const [property, setProperty] = useState();
    const [company, setCompany] = useState();
  
    const [nameNew, setNameNew] = useState("");
    const [whatsappNew, setWhatsappNew] = useState("");

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    const [days, setDays] = useState([]);

    useEffect(() => {
        function dateToString(d) {
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(d => d > 9 ? d : '0' + d).join('-');
          }
          
          var hoje = new Date();
          var ano = hoje.getFullYear();
          var mes = hoje.getMonth();
          var dia = hoje.getDate();
          for (var i = 0; i < 30; i++) {
            var outroDia = new Date(ano, mes, dia + i);
           console.log(dateToString(outroDia));

            const data = [{
              dataCompleta: outroDia,
                diaSemana: new Date(outroDia).getDay() === 0 ? "Domingo"
                : new Date(outroDia).getDay() === 1 ? "Segunda-Feira"
                : new Date(outroDia).getDay() === 2 ? "Terça-Feira"
                : new Date(outroDia).getDay() === 3 ? "Quarta-Feira"
                : new Date(outroDia).getDay() === 4 ? "Quinta-Feira"
                : new Date(outroDia).getDay() === 5 ? "Sexta-Feira"
                : new Date(outroDia).getDay() === 6 ? "Sábado"
                : "",
                dia: new Date(outroDia).getDate(),
                mes: new Date(outroDia).getMonth() + 1 === 1 ? "Janeiro"
                : new Date(outroDia).getMonth() + 1 === 2 ? "Fevereiro"
                : new Date(outroDia).getMonth() + 1 === 3 ? "Março"
                : new Date(outroDia).getMonth() + 1 === 4 ? "Abril"
                : new Date(outroDia).getMonth() + 1 === 5 ? "Maio"
                : new Date(outroDia).getMonth() + 1 === 6 ? "Junho"
                : new Date(outroDia).getMonth() + 1 === 7 ? "Julho"
                : new Date(outroDia).getMonth() + 1 === 8 ? "Agosto"
                : new Date(outroDia).getMonth() + 1 === 9 ? "Setembro"
                : new Date(outroDia).getMonth() + 1 === 10 ? "Outubro"
                : new Date(outroDia).getMonth() + 1 === 11 ? "Novembro"
                : new Date(outroDia).getMonth() + 1 === 12 ? "Dezembro"
                : "",
                ano: new Date(outroDia).getFullYear(),
            }]
            setDays(oldDays => [...oldDays, ...data])
          }
    }, [])

    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }
  
        function success(position) {
            const lat1  = position.coords.latitude;
            const long1 = position.coords.longitude;

            console.log(lat1, long1);
        
            setLatitude(lat1);
            setLongitude(long1);
            
          }

      function error() {
        console.log('Unable to retrieve your location');
      }

      getLocation()
  
    },[])


    useEffect(() => {
      async function loadProperty() {
        await api.get(`/property/${idProperty}`).then((res) => {
          setProperty(res.data[0])
        })
      }

      loadProperty()

      async function loadCompany() {
        await api.get(`/company/unic/${idCompany}`).then((res) => {
          setCompany(res.data[0])
        })
      }

      loadCompany()
    },[])

    
  useEffect(() => {
    async function newView() {
      const data = {
        idProperty,
        idCompany,
        idClient: user === null ? "00000000" : user.id,
        latitude,
        longitude,
        origin: "Portal",
        type,
        subType,
    }
    console.log(data)
    await api.post("/viewproperty", data).then((res) => {
      return
    }).catch((err) => {
        console.log(err)
    });
    
    }

    newView()
  },[])

    function handleNewScheduling() {
        const status = "Pendente"
        newScheduling({
            idClient: user.id, idProperty, idCompany, titleProperty: title, imageProperty: image, email: user.email, phone: user.phone,
            whatsapp: user.whatsapp, status, meet,
            day: new Date(dateSelected).getDate(), month: new Date(dateSelected).getMonth()+1, year: new Date(dateSelected).getFullYear(),
            shift, hour, ownACar, location: meet === "Imobiliária" ? company.fantasyName : "No local do imóvel",
            address: meet === "Imobiliária" ? `${company.road} - Nº ${company.number} - ${company.district} - ${company.city} - ${company.uf}` : `${property.road} - ${property.district} - ${property.city} - ${property.uf}`,
            amountOfPeople,
            similarProperties, dateCompleted: new Date(dateSelected)
        })
    }

      function selectDate(date) {
        setDateSelected(date)
      }

    function handleOpenModal(e) {
      e.preventDefault();
        setIsOpenModa(true)
      }
    
      function handleCloseModal(e) {
        e.preventDefault();
        setIsOpenModa(false);
        setView("")
      }
    function handleOpenModalLogin(e) {
      e.preventDefault();
        setIsOpenModaLogin(true)
      }
    
      function handleCloseModalLogin(e) {
        e.preventDefault();
        setIsOpenModaLogin(false);
      }

      function handleOpenModalLogin2(e) {
        e.preventDefault();
        setIsOpenModaLogin2(true);
        setIsOpenModaLogin(false);
        }
      
        function handleCloseModalLogin2(e) {
          e.preventDefault();
          setIsOpenModaLogin2(false);
        }

        function handleLogin(e) {
          e.preventDefault();
          loginSessionFast({email: login, password:password})
          console.log({email: login, password:password})
      }
  

      function handleShift(e) {
        setShift(e.target.value);
      }
      function handleHour(e) {
        setHour(e.target.value);
      }
      function handleAmountOfPeople(e) {
        setAmountOfPeople(e.target.value);
      }
      function handleOwnACar(e) {
        setOwnACar(e.target.value);
      }
      function handleSimilarProperties(e) {
        setSimilarProperties(e.target.value);
      }
      function handleMeet(e) {
        setMeet(e.target.value);
      }
      function handleTypeScheduling(data) {
        setView(data);
      }


      const buttonStyle = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'var(--BorderInput)',
        color: 'var(--Primary)',
        borderRadius: '100px',
        padding: '7px',
        width: '25px',
        height: '25px',
        border: '1px solid var(--Primary)',

        svg:{
          margin: '0px'
        }
    };
    
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><IoArrowBackOutline /></button>,
        nextArrow: <button style={{ ...buttonStyle }}><IoArrowForwardOutline /></button>
    }

    const responsiveSettings = [
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 250,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 150,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

    Modal.setAppElement('#root');
    return (
        <>
        <button className="buttonScheduling" onClick={user === null ? handleOpenModalLogin : handleOpenModal}><IoCalendar/> Agendar visita</button>

        <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-scheduling">
              {view === "visita" ?
            <div className="itensModal-scheduling">
               <div className="textTitle">
              <h2 className="title">  Novo agendamento</h2>
              </div>
                {/* <Calendar onChange={onChange} value={value} /> */}


                <div className="listDays">
                  <Slide slidesToScroll={2} slidesToShow={2} autoplay={false} infinite={false} {...properties} responsive={responsiveSettings}>
                    {days?.map((date) => {
                        return (
                            <div className={date.dataCompleta === dateSelected ? "CardDaySelected": "CardDay" } onClick={() => selectDate(date.dataCompleta)}>
                                <h4>{date.diaSemana}</h4>
                                <h2>{date.dia}</h2>
                                <h5>{date.mes} - {date.ano}</h5>
                            </div>
                        )
                    })}
                  </Slide>
                </div>

                <div className="form">
                <div className="data">
                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Turno</p>
                    </div>
                     <select style={{borderRadius: 25}}  value={shift} onChange={handleShift}>
                    <option value="Escolha">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                </select>
                    </div>
                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Escolha um horário</p>
                    </div>
                     <select style={{borderRadius: 25}}  value={hour} onChange={handleHour}>
                     {shift === "Manhã" ?
                        <>
                         <option value="Escolha">Escolha</option>
                        <option value="08h - 09h">08h - 09h</option>
                        <option value="09h - 10h">09h - 10h</option>
                        <option value="10h - 11h">10h - 11h</option>
                        <option value="11h - 12h">11h - 12h</option>
                        </>
                        : shift === "Tarde" ?
                        <>
                        <option value="Escolha">Escolha</option>
                        <option value="13h - 14h">13h - 14h</option>
                        <option value="14h - 15h">14h - 15h</option>
                        <option value="15h - 16h">15h - 16h</option>
                        <option value="16h - 17h">16h - 17h</option>
                        </>
                        : <option value="Escolha">Escolha Turno</option>}
                  

                </select>
                    </div>

                </div>
                <div className="data">

                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Possúi carro?</p>
                    </div>
                 <select style={{borderRadius: 25}}  value={ownACar} onChange={handleOwnACar}>
                    <option value="Escolha">Escolha</option>
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                </select>
                    </div>

                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Quantidade de pessoas</p>
                    </div>
                     <select style={{borderRadius: 25}}  value={amountOfPeople} onChange={handleAmountOfPeople}>
                        {ownACar === "Sim" ?
                        <>
                        <option value="Escolha">Escolha</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option></>
                        :
                        <>
                        <option value="Escolha">Escolha</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        </>}
                </select>
                    </div>

                </div>


                    <div className="data">
                    <div className="infosData">
                  <div className="textModal-scheduling">
                      <p>Local de encontro</p>
                  </div>
                  <select style={{borderRadius: 25}}  value={meet} onChange={handleMeet}>
                      <option value="Escolha">Local de encontro</option>
                      <option value="Imobiliária">Imobiliária</option>
                      <option value="Endereço do imóvel">Endereço do imóvel</option>
                  </select>
                  </div>
                  <div className="infosData">
                  <div className="textModal-scheduling">
                        <p>Deseja ver imóveis similares da imobiliária?</p>
                    </div>
                 <select style={{borderRadius: 25}}  value={similarProperties} onChange={handleSimilarProperties}>
                    <option>Escolha</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </select>

</div>



</div>
<div className="textModal-scheduling">
                        <p>Endereço de encontro</p>
                    </div>
                  {meet === "Imobiliária" ?
                <div className="address">
                    <p><IoBusinessOutline />{company?.fantasyName}</p>
                    <p><IoLocationOutline />{company?.road} - Nº {company?.number} - {company?.district} - {company?.city} - {company?.uf}</p>
                </div>
                : meet === "Endereço do imóvel" ?
                <div className="address">
                    <p><IoLocationOutline />{property.road} - {property.district} - {property.city} - {property.uf}</p>
                </div>
                : ""
                  }

                <button style={{borderRadius: 25}}  className="btnSubmit" onClick={handleNewScheduling}>Enviar solicitação de agendamento</button>
               
                <div className="buttonsType">
                    <button className="btnType" onClick={() => handleTypeScheduling("Video")}><IoVideocam /> Vídeo chamada</button>
                    <button className="btnType" onClick={handleCloseModal}><IoCloseOutline /> Fechar</button>
                     </div>

                </div>
            </div>
            : view === "Video" ?
            <div className="itensModal-scheduling">
              <div className="textTitle">
              <h2 className="title">  Nova video chamada</h2>
              </div>
              <div className="listDays">
                  <Slide slidesToScroll={2} slidesToShow={2} autoplay={false} infinite={false} {...properties} responsive={responsiveSettings}>
                    {days?.map((date) => {
                        return (
                          <div className={date.dataCompleta === dateSelected ? "CardDaySelected": "CardDay" } onClick={() => selectDate(date.dataCompleta)}>
                                <h4>{date.diaSemana}</h4>
                                <h2>{date.dia}</h2>
                                <h5>{date.mes} - {date.ano}</h5>
                            </div>
                        )
                    })}
                  </Slide>
                </div>
                <div className="form">
                <div className="data">
                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Turno</p>
                    </div>
                     <select style={{borderRadius: 25}}  value={shift} onChange={handleShift}>
                    <option value="Escolha">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                </select>
                    </div>
                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Escolha um horário</p>
                    </div>
                     <select style={{borderRadius: 25}}  value={hour} onChange={handleHour}>
                     {shift === "Manhã" ?
                        <>
                         <option value="Escolha">Escolha</option>
                        <option value="08h - 09h">08h - 09h</option>
                        <option value="09h - 10h">09h - 10h</option>
                        <option value="10h - 11h">10h - 11h</option>
                        <option value="11h - 12h">11h - 12h</option>
                        </>
                        : shift === "Tarde" ?
                        <>
                        <option value="Escolha">Escolha</option>
                        <option value="13h - 14h">13h - 14h</option>
                        <option value="14h - 15h">14h - 15h</option>
                        <option value="15h - 16h">15h - 16h</option>
                        <option value="16h - 17h">16h - 17h</option>
                        </>
                        : <option value="Escolha">Escolha Turno</option>}
                  

                </select>
                    </div>

                </div>
                <div className="data">
                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Mensagem de confirmação?</p>
                    </div>
                 <select style={{borderRadius: 25}}  value={ownACar} onChange={handleOwnACar}>
                    <option value="Escolha">Escolha</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </select>
                    </div>

                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Quando?</p>
                    </div>
                     <select style={{borderRadius: 25}}  value={amountOfPeople} onChange={handleAmountOfPeople}>
                        {ownACar === "Sim" ?
                        <>
                        <option value="Escolha">Escolha</option>
                        <option value="10 Minutos antes">10 Minutos antes</option>
                        <option value="20 Minutos antes">20 Minutos antes</option>
                        <option value="30 Minutos antes">30 Minutos antes</option>
                        <option value="1 Hora antes">1 Hora antes</option>
                        </>
                        : ownACar === "Não" ?
                        <>
                        <option value="Sem mensagem de confirmação">Sem mensagem de confirmação</option>
                        </>
                        :
                        <option value=""></option>
                        }
                </select>
                    </div>

                </div>


                    <div className="data">
                    <div className="infosData">
                  <div className="textModal-scheduling">
                      <p>Nome</p>
                  </div>
                  <input type="text" value={nameNew === "" ? user.name : nameNew} onChange={e => setNameNew(e.target.value)}/>
                  </div>
                  <div className="infosData">
                  <div className="textModal-scheduling">
                        <p>Whatsapp</p>
                    </div>
                    <input type="text" value={whatsappNew === "" ? user.whatsapp : whatsappNew } onChange={e => setWhatsappNew(e.target.value)}/>
                            </div>
                </div>

                <div className="data">
                    <div className="textModal-scheduling">
                        <p>* Agende a vídeo chamada com 3 horas de antecedência</p>
                    </div>
                </div>

                <button style={{borderRadius: 25}}  className="btnSubmit" onClick={handleNewScheduling}>Enviar solicitação de agendamento</button>
                <div className="buttonsType">
                    <button className="btnType" onClick={() => handleTypeScheduling("visita")}><IoHome /> Visita no imóvel</button>
                    <button className="btnType" onClick={handleCloseModal}><IoCloseOutline /> Fechar</button>
                     </div>
                </div>
            </div>
                 :
            <div className="itensModal-scheduling">
                    <div className="form">
                    <div className="buttonsType">
                    <button className="btnType" onClick={() => handleTypeScheduling("visita")}><IoHome /> Visita no imóvel</button>
                    <button className="btnType" onClick={() => handleTypeScheduling("Video")}><IoVideocam /> Vídeo chamada</button>
                     </div>
                    </div>
                </div>
                 }
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
                    <IoCalendar />

                    <h1>Legal! <br />
                    Venha nos visitar.</h1>

                    <h4>Entre em sua conta ou cadastre-se para para poder agendar visitas, conhecer os anúncios e ver cada detalhe.</h4>

                    <button onClick={handleOpenModalLogin2}>Fazer login</button>

            </div>
            </div>
            </Modal>


            <Modal isOpen={isOpenModalLogin2} onRequestClose={handleCloseModalLogin2}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalLogin2}>
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
                    <button className="button1" onClick={handleCloseModalLogin2}>Sair</button>
                </div>

                
                   </div>

                    

            </div>
            </div>
            </Modal>
        </>
    )
}
