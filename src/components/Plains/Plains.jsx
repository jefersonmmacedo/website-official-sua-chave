import "./plains.css"
import {IoCheckmarkOutline} from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";


export function Plains() {

    const { data } = useFetch("/plains")



    return (
        <div className="Plains">

            {data?.map((plain) => {
                return (
                    plain?.status === "Inativo" ? "" :
                    <div className="plain" key={plain?.id}>
                    <h3>{plain?.name}</h3>
                    <div className="title2">
                    <h1>R$ {plain?.value}</h1>
                    <h6>/mês</h6>
                    </div>
                    <div className="title">
                    <h1>R$ {plain?.valueNew}</h1>
                    <h4>/mês</h4>
                    </div>
                    {/* <div className="title">
                    <h3>Entre em contato</h3>
                    </div> */}
                    <div className="text">
                    {plain?.infos.map((info) => {
                        return (
                            <p><IoCheckmarkOutline /> {info.info}</p>
                        )
                    })}
                    </div>
                    <div className="aditionalUser">
                        {/* <h5>Acesso: <span>3 Usuários</span></h5> */}
                        {/* <h5>Usuários adicionais: <span>R$ 29,90</span></h5> */}
                        {/* <h5>Usuários adicionais: <span>Em Breve</span></h5> */}
                    </div>
                    {/* {myPlain?.idPlain === plain?.id ?
                    <a href="http://adm.suachave.com.br/planos" target="_blank">Seu plano atual</a>
                    :
                    <a href={user !== null && user?.type === "Imobiliária" || user !== null && user?.type === "Corretor" ? `/plano/${plain?.id}` : "/cadastro-profissional"}>Contratar plano</a>
                } */}

                <a href={"https://wa.me/5521997429585?text=Olá. Gostaria de saber mais detalhes sobre os planos e serviços que a Sua Chave pode me oferecer"}>Falar com time comercial</a>
                {/* <a href={`http://adm.suachave.com.br/cadastrar/${plain?.id}`} target="_blank" rel="noreferrer">Contratar</a> */}

                    <p>{plain?.note}</p>
                </div>
                )
            })}

        </div>
    )
}