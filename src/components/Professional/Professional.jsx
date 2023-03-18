import "./professional.css";
import Profile from "../../assets/images/profile.png";
import { FaStar } from "react-icons/fa";

export function Professional() {
    return (
        <div className="Professional">
            <div className="infos">
                <div className="image">
                    <img src={Profile} alt="" />
                </div>
                <div className="text">
                <h4>Nome Completo de Usuário</h4>
                <div className="professionals">
                        <p>Profissão</p>
                        <p>Profissão</p>
                        <p>Profissão</p>
                    </div>
                </div>
            </div>
            <div className="stars">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
        </div>
    )
}