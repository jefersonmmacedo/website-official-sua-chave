import { useFetch } from "../../hooks/useFetch"
import { ViewClientChat } from "../ViewClientChat/ViewClientChat"
import "./userTopBarChat.css"

export function UserTopBarChat({idCompany}) {
    console.log(idCompany)
    const {data} = useFetch(`/company/unic/${idCompany}`)

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }
    return (
        <div className="UserTopBar">
            <div className="imageTop">
                <img src={data[0]?.logo} alt={`Logo da ${data[0]?.fantasyName}`} />
            </div>
            <div className="textTop">
                <h5>{data[0]?.fantasyName}</h5>
                <h6>{data[0]?.city} - {data[0]?.uf}</h6>

                <ViewClientChat id={idCompany} mobile={true}/>
            </div>
      </div>
    )
}