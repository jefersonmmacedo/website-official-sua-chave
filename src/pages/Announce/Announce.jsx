import "./announce.css"
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";
import {IoLogoWhatsapp, IoQrCodeOutline, IoIdCardOutline, IoPhonePortraitOutline,
        IoLayersOutline, IoChatbubblesOutline, IoCropOutline, IoLaptopOutline, IoPlayOutline, IoCallOutline,
        IoCloseOutline, IoCalendarOutline, IoHomeOutline, IoOptionsOutline, IoChatboxEllipsesOutline,
        IoCheckboxOutline, IoFunnelOutline, IoDesktopOutline} from "react-icons/io5";
import SmartPhone from "../../assets/images/iphone.png";
import Modal from 'react-modal';
import { useState } from "react";
import imgFamily from "../../assets/images/background10.jpg"
import model from "../../assets/images/model.png"
import Mackbook from "../../assets/images/Mockup.png"
import { FaPlay } from "react-icons/fa";
import { MdOutlineImportantDevices } from "react-icons/md";
import { Partners } from "../../components/Partners/Partners";

export function Announce() {
    const [isOpenModal, setIsOpenModa] = useState(false);



    function handleOpenModal(e) {
      e.preventDefault();
        setIsOpenModa(true)
      }
    
      function handleCloseModal(e) {
        e.preventDefault();
        setIsOpenModa(false);
      }

    Modal.setAppElement('#root');

    function HandleOpen(e) {
        e.preventDefault();
      
        window.open("https://wa.me/5521997429585?text=Olá. Gostaria de saber mais detalhes sobre os planos e serviços que a Sua Chave Auto pode me oferecer")
      }

    return (
<div className="Anuncie">
    <Navbar2 />
    <div className="MainAnuncie">
            <div className="blocoAnuncie">
                <div className="imageAnuncie">
                    <div className="imgBlockAnuncie">
                  <img src={imgFamily} alt="" />
                    </div>
                </div>
                <div className="textAnuncie">
                    <h1>A sua <span>imobiliária</span> <br />merece ser 100% <span>digital!</span></h1>
                    <h3>Portal imobiliário + Sistema de gestão completo + Site para imobiliárias e corretores. <br /> Tudo preparado para conectar seus autos a novos clientes.</h3>

                    <div className="buttonsTextAnuncie">
                        <button onClick={HandleOpen}><IoLogoWhatsapp /> Falar com time comercial</button>
                        {/* <a href="/cadastro-profissional" className="btn"><IoCheckboxOutline /> Criar minha conta agora</a> */}
                        <a href="https://adm.suachaveauto.com.br/cadastro/novocadastro" className="btn" target="_Blank"><IoCheckboxOutline /> Criar minha conta agora!</a>
                    </div>
                </div>
        </div>
        <div className="movieAnuncie">
        <div className="textPricing">
        <h2>Um <span>novo conceito </span>de vender e alugar autos</h2>
        <h4>Assista e veja o que temos preparado para você.</h4>
    </div>
            <div className="moviePlayAnuncie">
                <div className="box1"></div>
                <div className="play">
                    <FaPlay onClick={handleOpenModal}/>
                </div>
                <div className="box2"></div>
            </div>
        </div>
        <div className="textPricing">
        <h2>Por que escolher a <span>Sua Chave Auto</span>?</h2>
        <h4>Veja os motivos que faz nossos clientes nos escolherem e o que podemos agregar ao seu negócio.</h4>
    </div>
        <div className="WhyChoose">
            <div className="IconsWhyChoose">
                <div className="IconsWhyChooseUnic">
                    <div className="iconSvg">
                        <IoLayersOutline />
                    </div>
                    <div className="IconsWhyText">
                    <h2>Totalmente funcional</h2>
                    <h4>Design moderno, fácil utilização com foco nas imagens e informações</h4>
                    </div>
                </div>
                <div className="IconsWhyChooseUnic">
                    <div className="iconSvg">
                        <IoChatbubblesOutline />
                    </div>
                    <div className="IconsWhyText">
                    <h2>Chat único por anúncio</h2>
                    <h4>Seu cliente conversa com você em uma aba específica por anúncio</h4>
                    </div>
                </div>
                <div className="IconsWhyChooseUnic">
                    <div className="iconSvg">
                        <IoCropOutline />
                    </div>
                    <div className="IconsWhyText">
                    <h2>Design responsivo</h2>
                    <h4>Você e seu cliente acessam o nosso site de qualquer dispositivo facilmente</h4>
                    </div>
                </div>
            </div>
            <div className="WhyChooseImage">
                <img src={SmartPhone} alt="" />
            </div>
            <div className="IconsWhyChoose">
                <div className="IconsWhyChooseUnic">
                    <div className="iconSvg">
                        <IoDesktopOutline />
                    </div>
                    <div className="IconsWhyText">
                        <h2>Sistema de Gestão</h2>
                        <h4>Controle tudo sobre seu negócio: autos, contratos, clientes e etc...</h4>
                    </div>
                </div>
                <div className="IconsWhyChooseUnic">
                    <div className="iconSvg">
                        <IoLaptopOutline />
                    </div>
                    <div className="IconsWhyText">
                    <h2>Site para o seu negócio</h2>
                    <h4>Tenha o site do seu negócio totalmente integrado ao nosso site</h4>
                    </div>
                </div>
                <div className="IconsWhyChooseUnic">
                    <div className="iconSvg">
                        <IoPhonePortraitOutline />
                    </div>
                    <div className="IconsWhyText">
                    <h2>Aplicativo administrativo</h2>
                    <h4>Controle seu negócio de qualquer lugar a qualquer hora [Em breve...]</h4>
                    </div>
                </div>
            </div>
        </div>



    <div className="howItWorks">
        <h2>Como funciona o Sua Chave Auto ?</h2>
        <h4>Nossos serviços tem como foco conectar os autos de nossos parceiros a clientes interessados.
            <br />
        Utilizando ferramentas de marketing, geolocalização e integrações, trazendo mais objetividade nas ofertas de propriedades.</h4>
        <div className="iconsWorks">
            <div className="iconWork">
                <IoIdCardOutline />
                <h3>Cadastre-se</h3>
                <h4>Realize seu cadastro para imobiliária ou corretor de forma rápida e objetiva.</h4>
            </div>
            <div className="iconWork">
                <IoQrCodeOutline />
                <h3>Escolha seu plano</h3>
                <h4>Escolha o pacote que mais se adequa ao momento atual de seu negócio</h4>
            </div>
            <div className="iconWork">
                <IoHomeOutline />
                <h3>Adicione seus autos</h3>
                <h4>Cadastre seus autos e aproveite nossas ferramentas para alcancar mais clientes </h4>
            </div>
        </div>
    </div>

    <div className="beneficies">
        <div className="imageDashboard">
            <img src={Mackbook} alt="" />
        </div>
        <div className="textDashboardAnuncie">
        <h2>Gerencie sua <span>imobiliária</span>:</h2>
                <div className="itensToHireAnuncie">
                    <div className="ToHireUnicAnuncie">
                    <IoHomeOutline />
                        <h4>Gerencie seus autos</h4>
                    </div>
                    <div className="ToHireUnicAnuncie">
                    <IoCalendarOutline />
                        <h4>Agenda de visitas</h4>
                    </div>
                    <div className="ToHireUnicAnuncie">
                        <IoOptionsOutline />
                        <h4>Controle de alugueis e vendas</h4>
                    </div>
                    <div className="ToHireUnicAnuncie">
                    <IoFunnelOutline />
                        <h4>Geração e captação de leads</h4>
                    </div>
                    <div className="ToHireUnicAnuncie">
                        <IoHomeOutline />
                        <h4>Autos para avaliação</h4>
                    </div>
                    <div className="ToHireUnicAnuncie">
                    <IoChatboxEllipsesOutline />
                        <h4>Chat único por anúncio</h4>
                    </div>

                    {/* <a href="/cadastro-profissional">Quero digitalizar minha imobiliária</a> */}
                    {/* <a href="/cadastro-profissional">Quero digitalizar minha imobiliária</a> */}
                </div>
                <a href="https://adm.suachaveauto.com.br/cadastro/novocadastro" className="linkText" target="_Blank"><IoCheckboxOutline /> Criar minha conta agora!</a>
        </div>
    </div>
    <div className="textPricing">
        <h2>Tenha um <span>site</span> para o <span>seu negócio</span></h2>
        <h4>Site totalmente integrado ao nosso sistema e portal, controle todo o seu site pelo nosso sistema de gestão.</h4>
    </div>
    <div className="imageModel">
        <img src={model} alt="Modelo de sites" />
    </div>
    <div className="buttonsPlainsAnuncie">
        <a href="#"> Clique aqui e saiba mais </a>
    </div>
    <div className="textPricing">
        <h2>Temos as <span>melhores ferramentas</span> para o seu dia a dia</h2>
    </div>

    <Partners />

    <div className="textPricing">
        <h2>Escolha o <span>plano ideal</span> para o seu negócio</h2>
        <h4>Temos um plano cara cada momento do seu negócio. Acesse o link a abaixo e confira:</h4>
    </div>
    <div className="buttonsPlainsAnuncie">
        <a href="/planos"><IoQrCodeOutline /> Conheça nossos planos</a>
    </div>

    </div>
    <Footer />


    <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-slider">
            {/* <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button> */}
            <div className="content-modal-movie">
    <iframe width="100%" height="420" src="https://www.youtube.com/embed/3UPvgq66BRE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            </Modal>
</div>
    )
}