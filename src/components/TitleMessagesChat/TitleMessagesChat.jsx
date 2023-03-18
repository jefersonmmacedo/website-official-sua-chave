import { useFetch } from "../../hooks/useFetch";
export function TitleMessagesChat({idProperty}) {

    const {data} = useFetch(`/property/${idProperty}`)

    if(!data) {
        return (
            <h6>Carregando</h6>
        )
    }
        
    return (
            <>
            <h3>{data[0]?.title}</h3>
            </>
        )
}