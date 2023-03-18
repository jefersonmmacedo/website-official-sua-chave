import "./signIn.css";
import Logo from "../../assets/images/Logo.png";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { IoAlertCircleOutline } from "react-icons/io5";

export function SignIn() {
    const [company, setCompany] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {loginSession, loading} = useContext(AuthContext);

    function handleSelectClient(e) {
        e.preventDefault();
        setCompany(false)
    }
    function handleSelectCompany(e) {
        e.preventDefault();
        setCompany(true)
    }
    function handleRedirectToPage(e) {
        e.preventDefault();
        window.open("https://adm.suachave.com.br/")
    }

    function handleLogin(e) {
        e.preventDefault();
        loginSession({email: login, password:password})
        console.log({email: login, password:password})
    }

    return (
        <div className="SignIn">
            <div className="login">
                <div className="form">
                <img src={Logo} alt="Logo GPS Buscador" style={{width: "150px"}}/>
                    <div className="data">
                <div className="buttons">
                    <button className={company === false ? "btn" : "btn2"} onClick={handleSelectClient}>Cliente</button>
                    <button className={company === false ? "button1" : "button2"} onClick={handleSelectCompany}>Imobiliária</button>
                </div>

                {company === false ?
                    <>
                        <input type="text" placeholder="Email ou ID" value={login} onChange={(e) => setLogin(e.target.value)}/>
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {loading === true ? "" :
                         <div className="message">
                         <h5><IoAlertCircleOutline /> Email/Id ou senha incorretos.</h5>
                         <h5> Caso sua conta seja empresarial, clique no botão Imobiliária acima.</h5>
                       </div>
                        }
                        <div className="links">
                            <p> <a className="link" href="/recuperar">Recuperar senha</a></p>
                        </div>
                        <button onClick={handleLogin}>Entrar</button>
                        <a href="/cadastrar">Cadastre-se aqui!</a>
                    </>
                    :
                    <>
                    <button className="buttonCompany" onClick={handleRedirectToPage}>Entrar como imobiliária / Corretor</button>
                    {/* <a href="http://adm.suachave.com.br/entrar" target="_blank">Cadastre-se aqui!</a> */}
                    </>
                }
                    </div>
                </div>

            </div>
            <div className="professional">
                <div className="block">
                </div>
            </div>
        </div>
    )
}