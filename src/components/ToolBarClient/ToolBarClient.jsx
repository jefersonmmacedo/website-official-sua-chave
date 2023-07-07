import "./toolBarClient.css";
import LogoImg from '../../assets/images/corretor1.jpg'
import { IoPersonOutline, IoHeartOutline, IoLogOutOutline, IoChatboxEllipsesOutline,
    IoHomeOutline, IoCalendarOutline,  } from 'react-icons/io5';
import {HiOutlineChatBubbleLeftRight  } from 'react-icons/hi2';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { MdOutlineMarkChatRead } from "react-icons/md";
export function ToolBarClient() {
    const { logout } = useContext(AuthContext);
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);
  
    function handleLogOut() {
      logout()
    }
  

    return (
        <div className="ToolBarClient">
            <div className="image">
                <a href="/minhaconta">
                <img src={LogoImg} alt="" />
                </a>
            </div>
            <div className="ToolsClient">
            <div className="ToolUnicClient2">
                   <a href="/minhaconta">
                   <div className="image2">
                      <img src={LogoImg} alt="" />
                    </div>  
                    </a>
                </div>
                {/* <div className="ToolUnicClient">
                   <a href="/mensagens">
                    <IoChatboxEllipsesOutline /><p>Chat</p>
                    </a>
                </div> */}
                <div className="ToolUnicClient">
                   <a href="/agendamentos">
                    <IoCalendarOutline /><p>Agenda</p>
                    </a>
                </div>
                <div className="ToolUnicClient">
                   <a href="/favoritos">
                    <IoHeartOutline /><p>Favoritos</p>
                    </a>
                </div>
                {/* <div className="ToolUnicClient">
                   <a href="/meusimoveis">
                    <IoHomeOutline /><p>Imóveis</p>
                    </a>
                </div>
                <div className="ToolUnicClient">
                   <a href="/ticket">
                    <MdOutlineMarkChatRead /><p>Tickets</p>
                    </a>
                </div> */}
                <div className="ToolUnicClient">
                   <a href="/meusdados">
                    <IoPersonOutline /><p>Conta</p>
                    </a>
                </div>
                <button onClick={handleLogOut}><IoLogOutOutline />Sair</button>
            </div>
        </div>
    )
}