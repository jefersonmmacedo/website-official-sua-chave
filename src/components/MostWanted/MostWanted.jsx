import "./mostWanted.css";
import { FaScrewdriver, FaBookMedical, FaCar, FaHandHoldingMedical } from "react-icons/fa"

export function MostWanted() {
    return (
        <div className="MostWanted">
            <h2>MAIS PROCURADOS</h2>
            <div className="blocks">
                <div className="blockUnic">
                        <h4>Pedreiro</h4>
                        <FaScrewdriver />
                        <h5>40</h5>
                </div>
                <div className="blockUnic">
                        <h4>Médico</h4>
                        <FaBookMedical />
                        <h5>40</h5>
                </div>
                <div className="blockUnic">
                        <h4>Motorista</h4>
                        <FaCar />
                        <h5>40</h5>
                </div>
                <div className="blockUnic">
                        <h4>Pedreiro</h4>
                        <FaCar />
                        <h5>40</h5>
                </div>
                <div className="blockUnic">
                        <h4>Cuidador de Idosos</h4>
                        <FaHandHoldingMedical />
                        <h5>40</h5>
                </div>
                <div className="blockUnic">
                        <h4>Pedreiro</h4>
                        <FaScrewdriver />
                        <h5>40</h5>
                </div>
            </div>
            <a href="/profissionais">VER TODOS OS PROFISSIONAIS</a>

        </div>
    )
}