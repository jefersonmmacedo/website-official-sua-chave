import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import "./negociations.css";
import {IoBusinessOutline, IoCalendarClear, IoCalendarOutline, IoLocationOutline} from 'react-icons/io5';
import { ToolBarClient } from "../../components/ToolBarClient/ToolBarClient";
import ImageHouse1 from "../../assets/images/house.jpg";
import ImageHouse2 from "../../assets/images/house1.jpg";
import ImageHouse3 from "../../assets/images/house2.jpg";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import { useFetch } from "../../hooks/useFetch";

export function Negociations() {

    // const LocalCity = localStorage.getItem("suachave");
    // const user = JSON.parse(LocalCity);

    // const {data} = useFetch(`/scheduling/client/${user.id}`)

    // if(!data) {
    //     return (
    //         <h5>Carregando...</h5>
    //     )
    // }


    return (
        <div className="Negociations">
            <Navbar2 />
            <div className="main">
                <ToolBarClient />

                <div className="text">
                <h2>Meus imóveis</h2>
                <h5>Você não possui negociações de imóveis</h5>

                {/* {data?.map((sheduling) => {
                    return (
                        <div className="chat" key={sheduling.id}>
                        <div className="image">
                            <img src={sheduling.imageProperty} alt="" />
                        </div>
                        <div className="textChat">
                        <h4>{sheduling.titleProperty}</h4>
                        <h5><IoCalendarOutline />{sheduling.day}/{sheduling.month}/{sheduling.year} - {sheduling.hour}</h5>
                        <h6><IoBusinessOutline />{sheduling.location}</h6>
                        <h6><IoLocationOutline />{sheduling.address}</h6>
                        </div>
                    </div>
                    )
                })} */}

                </div>
            </div>

            <div className="viewFooter">
            <Footer />
        </div>
        </div>
    )
}