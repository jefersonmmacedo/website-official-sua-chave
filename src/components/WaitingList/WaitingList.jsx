import "./waitingList.css"
import { useContext, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import buscaCep from "../../services/api-buscaCep";
import { mask as masker, unMask } from "remask";
import { AuthContext } from "../../contexts/Auth";

export function WaitingList() {
    const {newWaitingList} = useContext(AuthContext);
    const [filter, setFilter] = useState(false);
    const [type, setType] = useState("");
    const [nameFantasy, setNameFantasy] = useState();
    const [email, setEmail] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [cep, setCep] = useState();
    const [city, setCity] = useState();
    const [uf, setUf] = useState();

    function handleFiltro(e) {
        e.preventDefault();
        setFilter(!filter)
        console.log(!filter)
    }

    function handleNewType(e) {
        setType(e.target.value);
    }

    async function handleSearchCep(e) {
        e.preventDefault();
        try {
          const res = await buscaCep.get(`${cep}/json`) 
            setCity(res.data.localidade);
            setUf(res.data.uf);
            return;
          }catch{
            console.log("error")
        }
        return
    }

    function ChangeMaskWhatsapp(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsapp(maskedValue)
      }

    function handleNewWaitingList(e) {
        e.preventDefault();
        console.log({type, nameFantasy, whatsapp, email, cep, city, uf});
        newWaitingList({type, nameFantasy, whatsapp, email, cep, city, uf});
    }

   
    return (
        <div className="WaitingList">
  <button onClick={handleFiltro}><HiOutlineBellAlert /> Entrar na lista de espera</button>
        <div className={filter === true ? "ListItens" : "ListItensNone"}>
        <div className="buttons">
        <button onClick={handleFiltro}>X</button>
        </div>
        <div className="ListOptions">
                <h3>Cadastre-se na lista de espera</h3>
                <h5>Seja avisado quando estivermos prontos para atendê-lo!</h5>
            <div className="data">
                <h5>Eu sou</h5>
                <select value={type} onChange={handleNewType}>
                    <option value="">Escolha</option>
                    <option value="client">Cliente. Procuro imóveis!</option>
                    <option value="company">Imobiliária / Corretor</option>
                </select>
            </div>
            {type === "client" ?
            <div className="data">
                <h5>Nome completo</h5>
                <input type="text" placeholder="" value={nameFantasy} onChange={e => setNameFantasy(e.target.value)}/>
            </div>
            : type === "company" ?
            <div className="data">
            <h5>Nome Imobiliária ou Corretor</h5>
            <input type="text" placeholder="" value={nameFantasy} onChange={e => setNameFantasy(e.target.value)}/>
            </div>
            :
            <div className="data">
            <h5>Escolha uma opção acima</h5>
            <input type="text" placeholder="" disabled/>
            </div>
            }
            <div className="data">
                <h5>E-mail</h5>
                <input type="text" placeholder="" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="data">
                <h5>Whatsapp</h5>
                <input type="text" placeholder="" value={whatsapp} onChange={ChangeMaskWhatsapp}/>
            </div>
            <div className="cep">
                <input type="text" placeholder="CEP" value={cep} onChange={e => setCep(e.target.value)}/>
                <button onClick={handleSearchCep}><IoSearchOutline /></button>
            </div>
            <div className="data">
                <h5>Cidade</h5>
                <input type="text" placeholder="" value={city} onChange={e => setCity(e.target.value)}/>
            </div>
            <div className="data">
                <h5>Estado(UF)</h5>
                <input type="text" placeholder="" value={uf} onChange={e => setUf(e.target.value)}/>
            </div>
            <button onClick={handleNewWaitingList}>Salvar na lista de espera</button>
        </div>
    </div>
        </div>
    )
}