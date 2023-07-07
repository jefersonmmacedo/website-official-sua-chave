import "./notification.css";
import { IoFolderOpenOutline } from "react-icons/io5";

export function Notification({text, link}) {
    
    return (
        <div className="Notification">
            <div className="infos">
                <div className="text">
                <h5>{text}</h5>
                </div>
            </div>
            {link === "" ? "" :
            <a href={`${link}`}>
                <IoFolderOpenOutline />
            </a>
            } 
        </div>
    )
}