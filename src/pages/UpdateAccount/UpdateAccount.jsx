import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import "./updateAccount.css";
import {IoCloseCircle} from 'react-icons/io5';
import { ToolBarClient } from "../../components/ToolBarClient/ToolBarClient";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { mask as masker, unMask } from "remask";

export function UpdateAccount() {
    const LocalCity = localStorage.getItem("suachave");
    const user = JSON.parse(LocalCity);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const profile = user.avatar;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");

    function handleFile(e) {
        // console.log(e.target.files[0])
        if(e.target.files[0]){
            const image = e.target.files[0];
            if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                console.log(avatarUrl);
             } else {
                 console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                 setImageAvatar(null);
                 return null;
             }
         }
     }


     
    function ChangeMaskPhone(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setPhone(maskedValue)
      }
    function ChangeMaskWhatsapp(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsapp(maskedValue)
      }

    return (
        <div className="UpdateAccount">
            <Navbar2 />

                <div className="main">
                <ToolBarClient />
                <div className="text">
                <h2>Minha Conta</h2>
                    <form action="">

                    <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>

                        <div className="dataInputs">
                            <div className="textSpan">
                                <h5>Nome:</h5>
                            </div>           
                        <input type="text" placeholder="Nome completo" value={user.name} onChange={(e) => setName(e.target.value)} />
                        <div className="textSpan">
                                <h5>E-mail:</h5>
                            </div> 
                        <input type="email" placeholder="E-mail" value={user.email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="textSpan">
                                <h5>Telefone:</h5>
                            </div> 
                        <input type="text" placeholder="Telefone" value={user.phone} onChange={ChangeMaskPhone} />
                        <div className="textSpan">
                                <h5>Whatsapp:</h5>
                            </div> 
                        <input type="text" placeholder="Whatsapp" value={user.whatsapp} onChange={ChangeMaskWhatsapp} />
                        </div>

                        <div className="dataInputs">               
                        <select name="" id="">
                            <option value="">Estado</option>
                        </select>
                        <select name="" id="">
                            <option value="">Cidade</option>
                        </select>
                        </div>

                        <button>Atualizar Dados</button>

                        <div className="dataInputs">               
                        <input type="password" placeholder="Senha Atual" />
                        <input type="password" placeholder="Nova senha" />
                        <input type="password" placeholder="Confirmar nova senha" />            
                        </div>

                        <button>Atualizar Senha</button>
                    </form>
                </div>
            </div>
            <div className="viewFooter">
            <Footer />
        </div>
        </div>
    )
}       