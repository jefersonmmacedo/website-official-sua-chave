﻿import "./chatCounter.css"
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../../hooks/useFetch";
import api from "../../../services/api";
import { useEffect, useState } from "react";

export function ChatCounter() {
  const Local = localStorage.getItem("suachave");
  const user = JSON.parse(Local);

  const [dateReadyMessages, setDateReadyMessages] = useState([]);
  
  useEffect(() => {
    async function loadMessages() {
      await api.get(`/dateready/messages/user/${user.id}`).then((res) => {

        if(res.data.length === 0) {
          createMessageReadData()
          return;
        }
        setDateReadyMessages(res.data)
      }).catch((err) => {
        console.log(err)
      });
    }

    async function createMessageReadData() {
      const data = {
        idUser: user.id,
        dateReady: new Date()
      }
      await api.post(`/dateready/messages`, data).then((res) => {
          console.log("Data criada")
      }).catch((err) => {
        console.log(err)
      })
    }

    loadMessages()
  },[])

  const {data} = useFetch(`/messages/messagesFriendall/${user.id}`);

  const filterMessages = data?.filter((filterData) => new Date(filterData?.created_at) > new Date(dateReadyMessages[0]?.dateReady))

    async function HandleOpenLink(link) {
      const data = {
        idUser: user.id,
        dateReady: new Date()
      }
        await api.patch(`/dateready/messages/update/${dateReadyMessages[0]?.id}`, data).then(() =>{
          window.open(`${link}`, "_self")
        }).catch((err) => {
          console.log(err)
        });
      }

    return (
       <div className="buttonCounter">
        {filterMessages?.length === 0 ? "" :
      <div className="couterChat">
      {filterMessages?.length}                                                    
      </div>
    }
          <button className='iconUnic' onClick={() => HandleOpenLink("/mensagens")} data-tip data-for='Chat'><IoChatboxEllipsesOutline /></button>
            <ReactTooltip id='Chat' place="bottom" type="dark" effect="solid">
                <span>Chat</span>
            </ReactTooltip>
            </div>
    )
}