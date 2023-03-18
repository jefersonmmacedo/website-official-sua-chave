import "./notificationView.css"
import { useState } from "react";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import api from "../../services/api";
import ReactTooltip from 'react-tooltip';
import { Notification } from "../Notification/Notifications";


export function NotificationView() {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const [filter, setFilter] = useState(false);
    const [dateReadyNotifications, setDateReadyNotifications] = useState([])
  
    useEffect(() => {
      async function loadNotifications() {
        await api.get(`/dateready/notifications/user/${user.id}`).then((res) => {
  
          if(res.data.length === 0) {
            createMessageReadData()
            return;
          }
          setDateReadyNotifications(res.data)
        }).catch((err) => {
          console.log(err)
        });
      }
  
      async function createMessageReadData() {
        const data = {
          idUser: user.id,
          dateReady: new Date()
        }
        await api.post(`/dateready/notifications`, data).then((res) => {
            console.log("Data criada")
        }).catch((err) => {
          console.log(err)
        })
      }
  
      loadNotifications()
    },[])
  

    const {data} = useFetch(`/notification/${user.id}`);

    const filterNotifications = data?.filter((filterData) => new Date(filterData?.created_at) > new Date(dateReadyNotifications[0]?.dateReady))
         
    
    
    function handleFiltro(e) {
        e.preventDefault();
        setFilter(!filter)
        console.log(!filter)
        if(filter === false) {
            HandleOpenLink()
        }
    }



    async function HandleOpenLink() {
      const data = {
        idUser: user.id,
        dateReady: new Date()
      }
        await api.patch(`/dateready/notifications/update/${dateReadyNotifications[0]?.id}`, data).then(() =>{
        }).catch((err) => {
          console.log(err)
        });
      }
  




    return (
        <div className="NotificationView">
        <div className="buttonCounter">
       {filterNotifications?.length === 0 ? "" :
        <div className="counter">
         {filterNotifications?.length}                                                    
        </div>
      }

       <button className='iconUnic' onClick={handleFiltro} data-tip data-for='Notificações'><IoNotificationsOutline /></button>
                <ReactTooltip id='Notificações' place="bottom" type="dark" effect="solid">
                     <span>Notificações</span>
                </ReactTooltip>
            </div>

        <div className={filter === true ? "ListItens" : "ListItensNone"}>
        <div className="buttons">
        <button onClick={handleFiltro}>X</button>
        </div>
        <div className="ListNotification">
        {data?.map((notification) => {
                return (
                    <Notification text={notification.text} link={notification.link}/>
                )
            })}
        </div>
    </div>
        </div>
    )
}