import "./signUpProfessional.css";
import Logo from "../../assets/images/Logo.png";
import { useState } from "react";
import { FiUpload } from 'react-icons/fi';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import buscaDistrito from "../../services/api-buscaDistrito";
import { toast } from 'react-toastify';
import {IoEyeOutline, IoEyeOffOutline, IoSearchOutline} from 'react-icons/io5';
import { mask as masker, unMask } from "remask";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import buscaCNPJ from "../../services/api-buscaCNPJ";
import buscaCep from "../../services/api-buscaCep";

export function SignUpProfessional() {
    const {createAccountCompany} = useContext(AuthContext);
    const [account, setAccount] = useState("imobiliária")
    const [data, setData] = useState("1");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const profile = "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?b=1&s=170667a&w=0&k=20&c=7WCqA9IZcIhn6UQbi6Kx1EtdnhEgVOOHwLi0rTMtbCo="

    const [passwordView, setPasswordView] = useState(false)

    const [type, setType] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cnpj2, setCnpj2] = useState("");
    const [situation, setSituation] = useState("");
    const [socialReason, setSocialReason] = useState("");
    const [fantasyName, setFantasyName] = useState("");
    const [creci, setCreci] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");

    const [responsibleName, setResponsibleName] = useState("");
    const [emailResponsible, setEmailResponsible] = useState("");
    const [whatsappResponsible, setWhatsappResponsible] = useState("");

    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("");
    const [road, setRoad] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [website, setWebsite] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [youtube, setYoutube] = useState("");
    const [facebook, setFacebook] = useState("");



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

    function handleSelectStepe(number) {
        setData(number)
    }

    function handleSelectAccount(e) {
        setAccount(e.target.value)
        setType(e.target.value)
    }




      async function handleNewAccount(e) {
        e.preventDefault();
        toast.info("Criando conta. Aguarde...")
                //Avatar
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatarCompany/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);
        continueNewAccount(photoUrlAvatar)
      }

    function continueNewAccount(photoUrlAvatar) {
        const verified = false;
        const status = "Ativo";
        const nameSlug = fantasyName;
        createAccountCompany({type, verified, status, cnpj,nameSlug, socialReason, fantasyName, creci, email, phone, whatsapp, password, responsibleName,
            emailResponsible, whatsappResponsible, logo: photoUrlAvatar, cep, road, number, district, city, uf, website, facebook,
            instagram, linkedin, youtube})
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
    function ChangeMaskWhatsappResp(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "(99)99999-9999",
          "(99)99999-999",
        ]);
    
        setWhatsappResponsible(maskedValue)
      }
    function ChangeMaskCNPJ(e) {
      setCnpj2(e.target.value)
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
            "999.999.999-99",
          "99.999.999/9999-99",
        ]);
    
        setCnpj(maskedValue)
      }
    function ChangeMaskCReci(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
            "999-SS",
            "9999-SS",
          "99999-SS",
          "999999-SS",
          "9999999-SS",
        ]);
    
        setCreci(maskedValue)
      }

      function handlePasswordView() {
        if(passwordView === false) {
          setPasswordView(true)
        } else {
          setPasswordView(false)
        }
      }
      async function handleSearchCnpj(e) {
        e.preventDefault();
        const formatCNPJ1 = cnpj2.replace(".", "")
        const formatCNPJ2 = formatCNPJ1.replace(".", "")
        const formatCNPJ3 = formatCNPJ2.replace("/", "")
        const formatCNPJ4 = formatCNPJ3.replace("-", "")
        console.log(formatCNPJ4)
        try {
          const res = await buscaCNPJ.get(`${formatCNPJ4}`) 
            console.log(res.data.estabelecimento.situacao_cadastral);
            setSituation(res.data.estabelecimento.situacao_cadastral)
            return;
          }catch{
            console.log("error")
            toast.error("Escolha um estado e clica em buscar cidades")
        }
        return
      }

      async function handleSearchCep(e) {
        e.preventDefault();
        try {
          const res = await buscaCep.get(`${cep}/json`) 
            console.log(res.data);

            setRoad(res.data.logradouro);
            setDistrict(res.data.bairro);
            setCity(res.data.localidade);
            setUf(res.data.uf);
            return;
          }catch{
            console.log("error")
        }
        return
    }


      function handleRedirectAfterError(e) {
        e.preventDefault();
        window.open("/", "_self")
      }



    return (
        <div className="SignUpProfessional">
            <div className="professional">
                <div className="block">
                </div>
            </div>
            <div className="login">
                <form action="">
                <img src={Logo} alt="Logo GPS Buscador" />
                    <div className="data">
                        {
                        data === "1" ?
                        <>
                        
                        <select value={account} onChange={handleSelectAccount}>
                        <option value="imobiliária">Sou Imobiliária</option>
                        <option value="corretor">Sou Corretor</option>
                         </select>

                        {account === "imobiliária" ?
                        <>
                        <input type="text" placeholder="CNPJ" value={cnpj} onChange={ChangeMaskCNPJ} />
                        <button className="btn" onClick={handleSearchCnpj}>Verificar</button>

                            {situation === "" ? ""
                            : situation === "Inapta" || situation === "Irregular" || situation === "Extinto" || situation === "Cancelado"  ?
                             <div className="situationCnpj2">
                             <h4>Ops! Encontramos um problema com o CNPJ.</h4>
                             <h3>Situação: {situation}</h3>
                             <h5>Verifique e tente novamente em outro momento!</h5>
                             <button className="btn1" onClick={handleRedirectAfterError}>Sair</button>
                           </div>
                            : situation === "Ativa" || situation === "Regular" ?
                            <div className="situationCnpj">
                              <h4>Parabéns</h4>
                              <h3>CNPJ Validado!</h3>
                              <button className="btn3" onClick={() => handleSelectStepe("2")}>Avançar</button>
                            </div>
                            : ""
                            }
                        </>
                        : 
                        <>
                        <input type="text" placeholder="CPF" value={cnpj} onChange={ChangeMaskCNPJ} />
                        <button className="btn" onClick={() => handleSelectStepe("2")}>Avançar</button>
                        </>}
                        </>

                        :data === "2" ?
                        <>
                        {account === "imobiliária" ?
                        <>
                        <input type="text" placeholder="Razão Social" value={socialReason} onChange={(e) => setSocialReason(e.target.value)} />
                        <input type="text" placeholder="Nome Fantasia" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} />
                        </>
                        : 
                        <>
                        <input type="text" placeholder="Nome Completo" value={socialReason} onChange={(e) => setSocialReason(e.target.value)} />
                        <input type="text" placeholder="Nome Profissional" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} />
                        </>

                        }
                        <input type="text" placeholder="CRECI" value={creci} onChange={ChangeMaskCReci} />
                        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Telefone" value={phone} onChange={ChangeMaskPhone} />
                        <input type="text" placeholder="Whatsapp" value={whatsapp} onChange={ChangeMaskWhatsapp} />
                        <div className="dataInputs">
                        <input type={passwordView === false ? "password" : "text"}  placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="icon" onClick={handlePasswordView}>{passwordView === false ? <IoEyeOutline /> : <IoEyeOffOutline /> }
                        </div>
                        </div>
                        <div className="dataInputs">
                        <input type={passwordView === false ? "password" : "text"} placeholder="Confirmar senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <div className="icon"onClick={handlePasswordView}>{passwordView === false ? <IoEyeOutline /> : <IoEyeOffOutline /> }
                            </div>
                        </div>
                        <button className="btn" onClick={() => handleSelectStepe("3")}>Avançar</button>
                        <button className="btn3" onClick={() => handleSelectStepe("1")}>Voltar</button>
                        </>
                        : data === "3" ?
                        <>
                         <input type="text" placeholder="Nome Responsável" value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)} />
                        <input type="email" placeholder="E-mail" value={emailResponsible} onChange={(e) => setEmailResponsible(e.target.value)} />
                        <input type="text" placeholder="Whatsapp" value={whatsappResponsible} onChange={ChangeMaskWhatsappResp} />
                        <button className="btn" onClick={() => handleSelectStepe("4")}>Avançar</button>
                        <button className="btn3" onClick={() => handleSelectStepe("2")}>Voltar</button>
                        </>
                        : data === "4" ?
                        <>
                        <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        <input type="text" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                        <input type="text" placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                        <input type="text" placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                        <input type="text" placeholder="Youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                        <button className="btn" onClick={() => handleSelectStepe("5")}>Avançar</button>
                        <button className="btn3" onClick={() => handleSelectStepe("3")}>Voltar</button>
                        </>
                        : data === "5" ?
                         <>
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>
                        
                        <div className="BuscaCep">
                        <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)}  />
                        <button onClick={handleSearchCep}><IoSearchOutline /></button>
                        </div>

                         <input type="text" placeholder="Rua" value={road} onChange={(e) => setRoad(e.target.value)}  />
                         <input type="text" placeholder="Número" value={number} onChange={(e) => setNumber(e.target.value)}  />
                        <input type="text" placeholder="Bairro" value={district} onChange={(e) => setDistrict(e.target.value)}  />  
                        <input type="text" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)}  />
                        <input type="text" placeholder="Estado(UF)" value={uf} onChange={(e) => setUf(e.target.value)}  />



                        <button className="btn1" onClick={handleNewAccount}>Cadastrar</button>
                        <button className="btn3" onClick={() => handleSelectStepe("4")}>Voltar</button>
                         </>
                         :""}
                        {/* <div className="links">
                            <p>Recuperar senha</p>
                        </div>
                        <button onClick={() => handleSelectStepe()}>Cadastrar</button> */}
                    </div>
                </form>

            </div>
        </div>
    )
}