import { useFetch } from "../../hooks/useFetch";

export function CounterPropertiesCompany({id}) {
    const {data} = useFetch(`/property/company/${id}`);

    if(data) {
        console.log(data)
    }

    return (
        <>
        { data?.length}
        </>
    )
}