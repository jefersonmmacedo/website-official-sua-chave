import { useFetch } from "../../hooks/useFetch";
export function TextMessagesChat({room}) {
    const {data} = useFetch(`/messages/${room}`)

    if(!data) {
        return (
            <h6>Carregando</h6>
        )
    }
        
    return (
            <>
            {data[0]?.text.length > 70 ?
            <h5>{data[0]?.text.substring(0,62)}...</h5>
            :
            <h5>{data[0]?.text}</h5>
            }
            <h6>{new Date(data[0]?.created_at).getDate()}/{new Date(data[0]?.created_at).getMonth() +1}/{new Date(data[0]?.created_at).getFullYear()} às {new Date(data[0]?.created_at).getHours()}:{new Date(data[0]?.created_at).getMinutes() < 10 ? "0"+new Date(data[0]?.created_at).getMinutes() : new Date(data[0]?.created_at).getMinutes() }</h6>
            </>
        )
}