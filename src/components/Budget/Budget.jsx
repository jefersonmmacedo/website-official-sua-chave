import "./budget.css"
import { IoDocumentTextOutline } from "react-icons/io5";

export function Budget() {
    return (
        <div className="Budget">
            <div className="proposal">
                <h3><IoDocumentTextOutline /> Nome do projeto</h3>
                <h5>Descrição do projeto</h5>
                <p>Aprovado</p>
            </div>
            <div className="infoBudget">
                <h5>Valor:</h5>
                <h3>R$ 0,00</h3>
                <p>Recusado</p>
            </div>
        </div>
    )
}


