import "./favorite.css";
import { PropertyUnicBlock } from "../PropertyUnicBlock/PropertyUnicBlock";
import { useFetch } from "../../hooks/useFetch";


export function Favorite() {
    const LocalCity = localStorage.getItem("suachave");
    const user = JSON.parse(LocalCity);

    const {data} = useFetch(`/favorite/client/${user.id}`)

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    return (
        <div className="Favorite">
            <div className="listFavorite">
            {data?.map((property) => {
                    return (
                        <PropertyUnicBlock id={property.idProperty} key={property.id}/>
                    )
                })}
                </div>        
        </div>
    )
}