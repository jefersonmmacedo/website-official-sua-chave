import "./viewClientChat.css"
import { useState } from "react";
import { IoCallOutline, IoCellularOutline, IoHomeOutline, IoLocationOutline, IoLogoWhatsapp, IoMailOutline, IoPerson, IoPhonePortraitOutline } from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";

export function ViewClientChat({id, mobile}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [filter, setFilter] = useState(false);

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
            console.log(!filter)
        }

        const {data} = useFetch(`/company/unic/${id}`)

        if(!data) {
            return (
                <h5>Carregando...</h5>
            )
        }

        function handleOpenWhatsapp() {
            window.open(`https://wa.me/55${data[0]?.whatsapp}?text=Olá. Somos da imobiliária ${user.fantasyName}, vamos continar seu atendimento por aqui. tudo bem?`)
        }

        function handleOpenCall() {
            window.open(`tel:+55${data[0]?.phone}`, "_self")
        }

    return (
        <div className="ViewClientChat">
                        {mobile === true ? 
  <button className="btnProperty2" onClick={handleFiltro}><IoPerson /> Ver Empresa</button>
            :
            <button className="btnProperty" onClick={handleFiltro}><IoPerson /> Ver Empresa</button>
            }

        <div className={filter === true ? "searchItensFilter" : "searchItensFilterNone"}>
        <div className="buttonsFilter">
        <button className="btnFilter" onClick={handleFiltro}>X</button>
        </div>
        <div className="searchOptionsFilter">
            <div className="form">
                <div className="imageClient">
                    <img src={data[0]?.logo} alt="Imagem logo da Empresa" />
                </div>
                  <h3>{data[0]?.fantasyName}</h3>
                  <h5><IoMailOutline/>{data[0]?.email}</h5>
                  <h5><IoCallOutline />{data[0]?.phone}</h5>
                  <h5><IoLogoWhatsapp /> {data[0]?.whatsapp}</h5>
                  <h6><IoLocationOutline />{data[0]?.road}, {data[0]?.number}, {data[0]?.district} - {data[0]?.city} - {data[0]?.uf}</h6>

                  <div className="buttonsContact">
                    <button onClick={handleOpenWhatsapp}><IoLogoWhatsapp /> Whatsapp</button>
                    <button onClick={handleOpenCall}><IoCallOutline /> Ligação</button>
                  </div>
            </div>
        </div>
    </div>
        </div>
    )
}