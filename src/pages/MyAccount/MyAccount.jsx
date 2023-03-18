import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import "./myAccount.css";
import { ToolBarClient } from "../../components/ToolBarClient/ToolBarClient";
import { IoCalendarOutline, IoChatboxEllipsesOutline, IoChatboxOutline, IoHeartOutline, IoHomeOutline, IoPersonOutline} from "react-icons/io5"
import api from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";


export function MyAccount() {
    const LocalCity = localStorage.getItem("suachave");
    const user = JSON.parse(LocalCity);

    const [favorite, setFavorite] = useState()
    const [scheduling, setScheduling] = useState()
    const [chats, setChats] = useState()

    useEffect(() => {
        async function loadFavorites() {
            const idClient = user.id
            await api.get(`/favorite/client/${idClient}`).then((res) => {
                setFavorite(res.data.length)
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadFavorites()
        async function loadScheduling() {
            await api.get(`/scheduling/client/${user.id}`).then((res) => {
                setScheduling(res.data.length)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadScheduling()

        async function loadChats() {
            await api.get(`/rooms/client/${user.id}`).then((res) => {
                setChats(res.data.length)
            }).catch((error) => {
                console.log(error)
            })
        }

        loadChats()
    }, [])
     
    return (
        <div className="MyAccount">
            <Navbar2 />

                <div className="main">
                <ToolBarClient />
                <div className="text">
                <h2>Seja bem-vindo, {user.name}</h2>
                    <div className="indicators">
                        <a href="/mensagens">
                        <div className="indicatorUnic">
                            <IoChatboxEllipsesOutline />
                            <div className="textIndicator">
                                <h3>{chats}</h3>
                                <h4>Conversas</h4>
                            </div>
                        </div>
                        </a>
                        <a href="/favoritos">
                        <div className="indicatorUnic">
                            <IoHeartOutline />
                            <div className="textIndicator">
                                <h3>{favorite}</h3>
                                <h4>Favoritos</h4>
                            </div>
                        </div>
                        </a>
                        <a href="/agendamentos">
                        <div className="indicatorUnic">
                            <IoCalendarOutline />
                            <div className="textIndicator">
                                <h3>{scheduling}</h3>
                                <h4>Agendamentos</h4>
                            </div>
                        </div>
                        </a>
                        <a href="/meusdados">
                        <div className="indicatorUnic">
                            <IoPersonOutline />
                            <div className="textIndicator">
                                <h3>Acessar</h3>
                                <h4>Minha conta</h4>
                            </div>
                        </div>
                        </a> 
                        {/* <a href="/minhaconta">
                        <div className="indicatorUnic">
                            <IoPersonOutline />
                            <div className="textIndicator">
                                <h3>&nbsp;</h3>
                                <h4>Minha conta</h4>
                            </div>
                        </div>
                        </a> 
                        <a href="/meusimoveis">
                        <div className="indicatorUnic">
                            <IoHomeOutline />
                            <div className="textIndicator">
                                <h3>0</h3>
                                <h4>Imóveis</h4>
                            </div>
                        </div>
                        </a>
                        */}

                    </div>
                </div>
            </div>
            <div className="viewFooter">
            <Footer />
        </div>
        </div>
    )
}       