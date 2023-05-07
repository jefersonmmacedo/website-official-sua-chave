import "./notFound.css"
import notFoundImage from "../../assets/images/svg/404.svg";
import logo from "../../assets/images/Logo.png";


export function NotFound() {

    function handleBack() {
        window.history.back();
        console.log("Back");
    }


    return (
<div className="NotFound">
    <div className="MainAbout">
        <div className="logo">
             <img src={logo} alt="" />
        </div>
              <img src={notFoundImage} alt="" />
        <h1>Ops! Essa página não pode ser encontrada.</h1>
        <h5>Parece que nada foi encontrado neste local. Clique no botão abaixo e volte para a página anterior, ou clique em ir para a home.</h5>
        <div className="buttons">
            <button onClick={handleBack}>Voltar</button>
            <a href="/">Ir para home</a>
        </div>
    </div>
</div>
    )
}