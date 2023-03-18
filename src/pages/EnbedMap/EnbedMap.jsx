import { useEffect } from "react";
import apiGoogleAdress from "../../services/apiGoogleAdress";

export function EnbedMap() {
    useEffect(() => {
        async function loadAdress() {
            await apiGoogleAdress.get(`/AIzaSyCZllXD0czNd_oeF0u_o9LUVJ2bCd1K4p8&q`).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err)
            })
        }

        loadAdress()
    })
    return (
        <>
        <h1>Nada a mostrar</h1>
        </>
    )
}