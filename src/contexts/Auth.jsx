import {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../services/api';
import apiGoogleReverse from '../services/apiGoogleReverse';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import apiMail from '../services/apiMail';


const AuthContext = createContext({});

function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [cityLocation, setCityLocation] = useState("");
    const [ufLocation, setUfLocation] = useState("");

    
    async function createAccount({
        name, email, phone, whatsapp, password, status, verified, avatar, cep, city, uf
        }) {
        const data = {
            name, email, phone, whatsapp, password, status, verified, avatar, cep, city, uf
            }
        console.log(data)
        
        await api.post('/client', data).then(() => {
          //  completeAccount(email)
            toast.info(`Cadastro criado com sucesso!`);
            localStorage.setItem("suachave", JSON.stringify(data));
            window.open("/confirmacao", "_self")

        }).catch(error => {
            console.log("Cadastro não foi realizado: "+ error);
            toast.error(`Username ou E-mail ja utilizados. Tente outro por favor!`);
        });
    }

    async function loginSession({email, password}) {     
            await api.post("/session/client", {email, password}).then((result) => {
                if(result.data.status === "blocked") {
                    toast.error(`Olá, ${result.data.username}. Sua conta está bloqueada, entre em contato!`);
                    return
                }

                console.log(result.data)
                localStorage.setItem("suachave", JSON.stringify(result.data));
                window.open("/minhaconta", "_self")
                
            }).catch(error => {
                
                console.log("Login não foi realizado" + error)
                setLoading(false)
            }) 
    }   

    async function loginSessionFast({email, password}) {     
            await api.post("/session/client", {email, password}).then((result) => {
                if(result.data.status === "blocked") {
                    toast.error(`Olá, ${result.data.username}. Sua conta está bloqueada, entre em contato!`);
                    return
                }

                localStorage.setItem("suachave", JSON.stringify(result.data));
                window.location.reload(false);
                
            }).catch(error => {
                console.log("Login não foi realizado" + error)
                setLoading(false)
            })        
    }    








    async function updateAccount({id, avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron}){
        const Local = localStorage.getItem("suachave");
        const user = JSON.parse(Local)
        const Local2 = localStorage.getItem("informations-suachave");
        const userInformations = JSON.parse(Local2)
        const data = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron};
        const data2 = {avatar, cover, city, uf, relationship, nickname, cep, latitude, longitude, país, username, role, status, type, email, phone, online, patron, date:user.date , token:user.token  , expiresIn:user.expiresIn };
        console.log(id)
        console.log(data)
        await api.patch(`/accounts/${id}`, data).then(res => {
            localStorage.setItem("suachave", JSON.stringify(data2));
            window.open("/feed", "_self")
        }).catch(error => {
            console.log(error)
        });
    }

async function deleteAccount(id) {
    toast.success("Deletando sua conta")
    const Local = localStorage.getItem("informations-suachave");
    const user = JSON.parse(Local);
     toast.success("Deletando conta de usuário")
    console.log("Deletando conta de usuário")

    const res = await api.delete(`/accounts/${id}`);

    if(res.status===201) {
        toast.info("Deletando informações") 
        const idPatrono = user.patron;
        const text = `${user.username}, Deletou sua conta em nosso site`;
        const type = "notification";
        const idPost = "";
        const idFriend = "";
        const idAccount = user.id;
        notifications(idPatrono, text, idAccount, idFriend, type, idPost)
       
     } else {
        toast.error('Falha ao deletar, tente novamente!');
     }
}

async function deleteConversations(user) {
    const idAccount = user.id
    const rmyRooms1 = await api.get(`conversations/account/filter/${idAccount}`)

     const idFriend = user.id
     const rmyRooms2 = await api.get(`conversations/friend/filter/${idFriend}`)

     const newRooms = rmyRooms1.data.concat(rmyRooms2.data);
     // console.log(newRooms);

     newRooms.forEach(async (room) => {
         const id = room.id
         toast.success("Deletado conversas!");
              await api.delete(`/conversations/${id}`);
     })
     toast.success("Deletado com sucesso!");
}

async function deleteConversation(room) {
    await api.delete(`/conversations/room/${room}`).then((res) => {
        toast.success("Deletado com sucesso!");
        window.open("/messages", "_self")

    })
}
//Fim deletando conta

async function recuperationUserForEmail(email) {
    console.log(email)
   const account =  await api.get(`/accounts/find/${email}`);
   console.log(account)

   if(account.data.length === 0) {
       toast.error("Não existe conta com este e-mail em nossa base de dados!")
       return
   } 

   const username = account.data[0].username
   searchUsername(email, username)
}

async function gerateCodeRecuperation(email, code) {
    console.log(email)
    const account =  await api.get(`/client/unic/${email}`);
    console.log(account)
    
    if(account.data.length === 0) {
        toast.error("Não existe conta com este e-mail em nossa base de dados!")
        return
    } 
    
    await api.post("/recuperation", {email, code}).then((res) => {
        console.log(res.data);
        codeRecuperation(email, code);
    }).catch((error) => {
        console.log(error)
    })
}

async function validadeCodeRecuperation(code, email) {
    console.log(code, email)
   const codeRecuperationData =  await api.get(`/recuperation/find/${email}/${code}`);
   console.log(codeRecuperationData)

   if(codeRecuperationData.data.length === 0) {
       toast.error("Código inválido ou expirado!")
       return
   } 

   window.open(`/recuperar-nova-senha/${email}`,"_self")
}


async function recoverPasswordNew(email, password) {
    console.log(email, password)
    await api.patch(`client/update/${email}`, {password}).then(() => {
        toast.info("Senha atualizada com sucesso");
        passwordRecoverOk(email)
       
    }).catch((error) => {
        toast.error("Erro ao atualiza senha");
        console.log(error)
    })
}

async function passwordRecoverOk(email) {
    const res = await apiMail.post("/mail/newpassword", {mail: email});
    if(res.status === 200) {
        window.open(`/`,"_self")
    }
}


// Fim recuperações


async function notifications({idAccount, text, type, link, view}) {
    const data = {idAccount, text, type, link, view }
    await api.post("/notification", data).then(() => {
        console.log("Comentário/Notificação feito com sucesso");
    }).catch(error => {
        console.log("Notificação não cadastrada" + error)
    })
}
async function newMessageMail({idCompany, link}) {
    const user = await api.get(`/company/unic/${idCompany}`);
    console.log(user.data)

    if(user.length === 0) {
        console.log("Usuário não encontrado")
        return;
    }
    console.log("Usuário encontrado!!!");
    
    const data = {email: user.data[0].email, link }
    console.log(data)
    await apiMail.post("/mail/newmessage", data).then(() => {
        console.log("E-mail enviado com sucesso");
    }).catch(error => {
        console.log("E-mail não enviado" + error)
    })
}


    async function createSuccess(email) {
        const res = await apiMail.post("/mail/complete", {mail: email});
        if(res.status === 200) {
        }
    }
    async function searchUsername(email, username) {
        console.log(email, username)
        const res = await apiMail.post("/mail/username", {mail: email, username: username});
        if(res.status === 200) {
            toast.info("Nome de usuário encontrado. Verifique seu e-mail!")
            window.open(`/recuperationuserresult/${username}`,"_self")
        }
    }


    async function codeRecuperation(email, code) {
        console.log(email, code)
        const res = await apiMail.post("/mail/passwordcode", {mail: email, code: code});
        if(res.status === 200) {
            window.open(`/recuperar-codigo/${email}`,"_self")
        }
    }



async function deleteActualMessage(id){
    await api.delete(`/messages/${id}`).then(() => {
    })
}


async function newVisit(idAccount, username, idFriend) {
    const data = {idAccount, username, idFriend}
    await api.post("/visits", data).then(() => {
    })
}



// Fim da Sessão grupos
    async function logout() {
        localStorage.removeItem("suachave");
        window.location.reload(false);
    }
// Fim da Sessão grupos
    async function logout2() {
        localStorage.removeItem("adm-suachave");
        window.location.reload(false);
    }


    //payments
    async function createPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status, status2}) {
        const data = {idPlain, idCompany, status: status2}
        const data2 = {idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status}
        console.log({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status, status2})

        const res = await api.get(`/myplain/${idCompany}`);
        if(res.data.length === 0) {
           
                await api.post("/myplain/", data).then((res) => {
                    toast.success("Novo plano criado com sucesso")
                    handleNewPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status})
                }).catch((error) => {
                    console.log(error)
                })


        } else {
            console.log("Plano Já existe")
            console.log("Criando pagamento")
            handleNewPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status})
        }

    }

    async function handleNewPayment({idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status}) {
        const data = {idPlain, idCompany, email, namePlain, value, period, linkComprovant, aceptTerms, status}
        await api.post("/payments/", data).then((res) => {
            toast.success("Pagamento efetuado com sucesso");

            setTimeout(() => {
                window.open(`/pagamentofinalizado/`, "_self")
              }, "5000")
        
        }).catch((error) => {
            console.log(error)
        })
    }

    async function newScheduling({
        idClient, idProperty, idCompany, titleProperty, imageProperty, email, phone, whatsapp, status, meet, 
      day, month, year, shift, hour, ownACar, location, address, similarProperties, amountOfPeople, dateCompleted
    }) {
        const data = {idClient, idProperty, idCompany, titleProperty, imageProperty, email, phone, whatsapp, status, meet, 
            day, month, year, shift, hour, ownACar, location, address, similarProperties, amountOfPeople, dateCompleted}

        await api.post("/scheduling/", data).then((res) => {
            
            toast.success("Agendamento criado com sucesso!");
            window.location.reload(false);
           

        }).catch((error) => {
            console.log(error)
        })
    }
    async function newContact({
        idProperty, idCompany, idClient, name, email, phone, whatsapp, origin, type, latitude, longitude, link, whatsappCompany, phoneCompany
    }) {
        const data = {idProperty, idCompany, idClient, name, email, phone, whatsapp, origin, type, latitude, longitude}

        await api.post("/contact/", data).then((res) => {

            if(type === "Ligação") {
                window.open(`tel:+55${phoneCompany}`, "_self");
            } else {
                window.open(`https://wa.me/55${whatsappCompany}?text=Olá. Gostaria de saber mais detalhes sobre o imóvel:%20 ${link}`)
            }

        }).catch((error) => {
            console.log(error)
        })
    }
    async function newContactCompany({
        idProperty, idCompany, idClient, name, email, phone, whatsapp, type, whatsappCompany, phoneCompany
    }) {
        const data = {idProperty, idCompany, idClient, name, email, phone, whatsapp, type}

        await api.post("/contact/", data).then((res) => {

            if(type === "Ligação") {
                window.open(`tel:+55${phoneCompany}`, "_self");
            } else {
                window.open(`https://wa.me/55${whatsappCompany}?text=Olá. Me chamo ${name}, gostaria de atendimento`)
            }

        }).catch((error) => {
            console.log(error)
        })
    }
    async function handleNewAlertClient({idProperty, name, email, whatsapp, status, district, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished}) {
        const data = {idProperty, name, email, whatsapp, status, district, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished}

        await api.post("/alertClient", data).then((res) => {
        toast.success("Alerta criado com sucesso!")

        }).catch((error) => {
            console.log(error)
        })
    }
    async function handleNewSearchClient({name, email, whatsapp, status, district, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished}) {
        const data = {name, email, whatsapp, status, district, city, uf, type, subType, bedroom, suite, restroom, garage, pets, furnished}

        await api.post("/searchClient", data).then((res) => {
        toast.success("Busca de imóvel cadastrado com sucesso!")

        }).catch((error) => {
            console.log(error)
        })
    }


    async function newWaitingList({type, nameFantasy, whatsapp, email, cep, city, uf}) {
        const data = {type, nameFantasy, whatsapp, email, cep, city, uf}

        await api.post("/waitinglist/", data).then((res) => {
            toast.success("Cadastrado na lista de espera com sucesso!");
            

            setTimeout(() => {
                window.location.reload(false);
              }, "5000")
        }).catch((error) => {
            console.log(error)
        })
          
    }


    

    async function newEvaluation({
        idCompany, idClient, title, description, type, subType, status,
            road, district, city, uf, bedroom, garage, suite, restroom,
            furnished, pets, characteristcs, images, name, email, phone, whatsapp, }) {
    
        const data  = {
            idCompany, idClient, title, description, type, subType, status,
            road, district, city, uf, bedroom, garage, suite, restroom,
            furnished, pets, characteristcs, images, name, email, phone, whatsapp,
            }
        console.log(data)
        await api.post("/evaluation", data).then(() => {
            toast.success("Imóvel cadastrado com sucesso!");
            setTimeout(() => {
                window.open("/envio-completo", "_self")
              }, "2000")
        }).catch(err => {
            console.log(err);
        })
    }
  // Deslogandop após tempo de inatividade
   function inactivityTime() {
       let time;
       // reset timer
       window.onload = resetTimer;
       document.onmousemove = resetTimer;
       document.onkeydown = resetTimer;
       document.onclick = resetTimer;
       document.onchange = resetTimer;
       function doSomething() {
        const DataUser = localStorage.getItem("suachave");
        const user = JSON.parse(DataUser);

            if(user !== null || user !== undefined || user !== "") {
              //  toast.error("Finalizando a sessão")
                logout(user.id)
            }
        }
        function resetTimer() {
        clearTimeout(time);
      time = setTimeout(doSomething, 900000)
      //time = setTimeout(doSomething, 1000)
    }


}

function newLocation(cityLocation, ufLocation) {
    console.log({cityLocation, ufLocation});

    setCityLocation(cityLocation)
    setUfLocation(ufLocation)
}







    return(
        <AuthContext.Provider value={{
            updateAccount,
            loginSession,
            loginSessionFast,
            createAccount,
            loading,
            logout,
            logout2,
            deleteActualMessage,
            newVisit,
            deleteAccount,
            recuperationUserForEmail,
            gerateCodeRecuperation,
            validadeCodeRecuperation,
            recoverPasswordNew,
            inactivityTime,
            createPayment,
            deleteConversation,
            newScheduling,
            newContact,
            newContactCompany,
            newLocation,
            cityLocation,
            ufLocation,
            newWaitingList,
            handleNewAlertClient,
            handleNewSearchClient,
            newEvaluation,
            notifications,
            newMessageMail
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}