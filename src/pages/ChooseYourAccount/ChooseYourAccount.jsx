﻿import "./chooseYourAccount.css"

export function ChooseYourAccount() {

    function handleRedirect(e) {
        e.preventDefault();
        window.open("http://adm.suachave.com.br/cadastro/cliente-site");
    }
    function handleRedirectClient(e) {
        e.preventDefault();
        window.open("/cadastrar", "_self")
    }
    return (
        <div className="ChooseYourAccount">
            <div className="client">
                <div className="block">
                    <button onClick={handleRedirectClient}>SOU CLIENTE</button>
                </div>
            </div>
            <div className="professional">
            <div className="block">
                    <button onClick={handleRedirect}>SOU CORRETOR/IMOBILIÁRIA</button>
                </div>
            </div>
        </div>
    )
}