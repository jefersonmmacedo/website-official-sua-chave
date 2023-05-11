import "./plains.css"
import {IoArrowBackOutline, IoArrowForwardOutline, IoCheckmarkOutline} from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


export function Plains() {

    const { data } = useFetch("/plains");


    if(!data) {
        return (
            <div className="loader">
           carregando...
            </div>
        )
    }

    const buttonStyle = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'var(--PrimaryHover)',
        border: '2px solid var(--White)',
        color: 'var(--White)',
        borderRadius: '100px',
        padding: '7px',
        width: '35px',
        height: '35px',
    };
    
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><IoArrowBackOutline /></button>,
        nextArrow: <button style={{ ...buttonStyle }}><IoArrowForwardOutline /></button>
    }

    const responsiveSettings = [
        {
            breakpoint: 1210,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 930,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 630,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 250,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

    const plainsFilter = data.filter((plains) => plains.status !== "Inativo" )

    return (
        <div className="Plains">
            <Slide slidesToScroll={1} slidesToShow={1} indicators={true} autoplay={false} {...properties} responsive={responsiveSettings}>
            {plainsFilter?.map((plain) => {
                return (
                    <div className={plain?.name === "Lite" ? "plain2" : "plain"} key={plain?.id}>
  
                    <h3>{plain?.name}</h3>
                    {plain?.valueNew === "" ?
                    <>
                        <div className="title">
                        <h1>R$ {plain?.value}</h1>
                        <h4>/mês</h4>
                        </div>
                    </>
                    :
                    <>
                        <div className="title2">
                        <h1>R$ {plain?.value}</h1>
                        <h6>/mês</h6>
                        </div>
                        <div className="title">
                        <h1>R$ {plain?.valueNew}</h1>
                        <h4>/mês</h4>
                        </div>
                    </>

                    }
                    {/* <div className="title">
                    <h3>Entre em contato</h3>
                    </div> */}
                    <div className="text">
                    {plain?.infos.map((info) => {
                        return (
                            <p><IoCheckmarkOutline /> {info.info}</p>
                        )
                    })}
                    </div>
                    <div className="aditionalUser">
                        {/* <h5>Acesso: <span>3 Usuários</span></h5> */}
                        {/* <h5>Usuários adicionais: <span>R$ 29,90</span></h5> */}
                        {/* <h5>Usuários adicionais: <span>Em Breve</span></h5> */}
                    </div>
                    {/* {myPlain?.idPlain === plain?.id ?
                    <a href="http://adm.suachave.com.br/planos" target="_blank">Seu plano atual</a>
                    :
                    <a href={user !== null && user?.type === "Imobiliária" || user !== null && user?.type === "Corretor" ? `/plano/${plain?.id}` : "/cadastro-profissional"}>Contratar plano</a>
                } */}

                <a href={`https://wa.me/5521997429585?text=Olá. Gostaria de saber mais detalhes sobre o plano ${plain?.name} e os serviços que a Sua Chave pode me oferecer`}>Falar com time comercial</a>
                {/* <a href={`https://adm.suachave.com.br/cadastro/novocadastro`} target="_blank" rel="noreferrer">Teste por 7 dias grátis</a> */}
                {/* <a href={`http://adm.suachave.com.br/cadastrar/${plain?.id}`} target="_blank" rel="noreferrer">Contratar</a> */}

                    <p>{plain?.note}</p>
                    {plain?.name === "Lite" ? 
                        <div className="featured">
                            <h5>Mais Procurado</h5>
                        </div>
                         : ""}
                </div>
                )
            })}
            </Slide>

        </div>
    )
}