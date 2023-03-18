import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import "./messagesProperty.css";
import {IoRefreshOutline} from 'react-icons/io5';
import { ToolBarClient } from "../../components/ToolBarClient/ToolBarClient";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { DataMenssageChat } from "../../components/DataMenssageChat/DataMenssageChat";
import { MessagesCounter } from "../../components/ButtonsCounter/MessagesCounter/MessagesCounter";

export function MessagesProperty() {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const [dateMessage, setDateMessage] = useState([])
    
    useEffect(() => {
        async function LoadRooms() {
        const res = await api.get(`/rooms/client/${user.id}`);
             
        res.data.forEach((chatLists) => {
                async function RoomsAndLastDate() {            
                    const result = await api.get(`/messages/${chatLists.room}`)

                    const dados = {
                        dateLastMessage: result.data[0].created_at,
                        id: chatLists.id,
                        room: chatLists.room,
                        idCompany: chatLists.idCompany,
                        idClient: chatLists.idClient,
                        idProperty: chatLists.idProperty,
                        imageProperty: chatLists.imageProperty,
                        created_at: chatLists.created_at
                    } 

                   setDateMessage(oldDateMessage => [...oldDateMessage, dados]);
    
                }

                RoomsAndLastDate()

           })

        }


        LoadRooms();

        
    }, []);

    console.log("dateMessage")
console.log(dateMessage)

function realoadPage() {
    window.location.reload(false);
}
if(dateMessage) {
    dateMessage.sort(function(a,b) {
        if(a.dateLastMessage > b.dateLastMessage ) {
            return -1
        } else {
            return true
        }
    })
}



    return (
        <div className="MessagesProperty">
            <Navbar2 />

                <div className="main">
                <ToolBarClient />
                <div className="text">
                <div className="textTop">
                <h3>Minhas conversas</h3>
                <button onClick={realoadPage}><IoRefreshOutline /> Atualizar</button>
                </div>
                {dateMessage.length === 0 ?
                <h5>Você não possui conversas</h5>
                :
                dateMessage?.map((chat) => {
                    return (
                        <a href={`/chat/${chat.room}/${chat.idProperty}/${chat.idCompany}/${chat.idClient}`}>
                        <div className="chat">
                        <div className="image">
                            <img src={chat.imageProperty} alt="" />
                        </div>
                       <DataMenssageChat idProperty={chat.idProperty} room={chat.room}/>
                        <MessagesCounter room={chat.room}/>
                    </div>
                    </a>
                    )
                })
                }


                </div>
            </div>
            <div className="viewFooter">
            <Footer />
        </div>
        </div>
    )
}