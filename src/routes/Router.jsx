import {Route, Routes, Navigate} from 'react-router-dom';
import { Favorites } from '../pages/Favorites/Favorites';
import { Home } from '../pages/Home/Home';
import { Notifications } from '../pages/Notifications/Notifications';
import { Pricing } from '../pages/Pricing/Pricing';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUpClient } from '../pages/SignUpClient/SignUpClient';
import { PrivacyPolicy } from '../pages/PrivacyPolicy/PrivacyPolicy';
import { TermsOfUse } from '../pages/TermsOfUse/TermsOfUse';
import { Properties } from '../pages/Properties/Properties';
import { Property } from '../pages/Property/Property';
import { About } from '../pages/About/About';
import { Companies } from '../pages/Companies/Companies';
import { Company } from '../pages/Company/Company';
import { Schedules } from '../pages/Schedules/Schedules';
import { MessagesProperty } from '../pages/MessagesProperty/MessagesProperty';
import { Simulator } from '../pages/Simulator/Simulator';
import { Recuperation } from '../pages/Recuperation/Recuperation';
import { MyAccount } from '../pages/MyAccount/MyAccount';
import { Scheduling } from '../pages/Scheduling/Scheduling';
import { ComingSoon } from '../pages/CommingSoom/ComingSoon';
import { Checkout } from '../pages/Checkout/Checkout';
import { PaymentCompleted } from '../pages/PaymentCompleted/PaymentCompleted';
import { Contact } from '../pages/Contact/Contact';
import { Faq } from '../pages/Faq/Faq';
import { UpdateAccount } from '../pages/UpdateAccount/UpdateAccount';
import { NotFound } from '../pages/NotFound/NotFound';
import { Negociations } from '../pages/Negociations/Negociations';
import { TestTools } from '../pages/TestTools/TestTools';
import { Evaluation } from '../pages/Evaluation/Evaluation';
import { ChatMessage } from '../pages/ChatMessage/ChatMessage';
import { RecuperationCode } from '../pages/RecuperartionCode/RecuperartionCode';
import { RecuperationPassword } from '../pages/RecuperartionPassword/RecuperartionPassword';
import { Announce } from '../pages/Announce/Announce';
import { ConfirmedAccount } from '../pages/ConfirmedAccount/ConfirmedAccount';
import { ConfirmedSend } from '../pages/ConfirmedSend/ConfirmedSend';
import { UploadImagesAWS } from '../pages/UploadImagesAWS/UploadImagesAWS';
import { ChooseYourAccount } from '../pages/ChooseYourAccount/ChooseYourAccount';

function Router () {
const Local = localStorage.getItem("suachave");
const userLocal = JSON.parse(Local)

const LocalAdm = localStorage.getItem("suachave");
const userLocalAdm = JSON.parse(LocalAdm)

if(userLocalAdm !== null) {
    localStorage.removeItem("adm-suachave");
}

function PrivateRoute({children} ) {
    return userLocal !== null ? children : <Navigate to="/entrar"/>
}

    return (
            <Routes>
            {/* Rotas abertas */}
            <Route path="*" element={<NotFound />}/>
            <Route path="/escolha-sua-conta" element={<ChooseYourAccount />}/>
            <Route path="/confirmacao" element={<ConfirmedAccount />}/>
            <Route path="/envio-completo" element={<ConfirmedSend />}/>
            <Route path="/em-breve" element={<ComingSoon />}/>
            <Route path="/sobre" element={<About />}/>
            <Route path="/" element={<Home />}/>
            <Route path="/anunciar" element={<Announce />}/>
            <Route path="/entrar" element={<SignIn />}/>
            <Route path="/recuperar" element={<Recuperation />}/>
            <Route path="/recuperar-codigo/:email" element={<RecuperationCode />}/>
            <Route path="/recuperar-nova-senha/:email" element={<RecuperationPassword />}/>
            <Route path="/cadastrar" element={<SignUpClient />}/>
            <Route path="/imoveis/:status" element={<Properties />}/>
            <Route path="/imoveis" element={<Properties />}/>
            <Route path="/privacidade" element={<PrivacyPolicy />}/>
            <Route path="/termos" element={<TermsOfUse />}/>
            <Route path="/imovel/:id" element={<Property />}/>
            <Route path="/imobiliarias" element={<Companies />}/>
            <Route path="/imobiliaria/:nameSlug" element={<Company />}/>
            <Route path="/corretor/:id" element={<Company />}/>
            <Route path="/financiamento" element={<Simulator />}/>
            <Route path="/planos" element={<Pricing />}/>
            <Route path="/faleconosco" element={<Contact />}/>
            <Route path="/faq" element={<Faq />}/>
            <Route path="/avaliacao" element={<Evaluation />}/>
            <Route path="/test" element={<TestTools />}/>
            <Route path="/upload" element={<UploadImagesAWS />}/>
            
            /* Rotas fechadas/login */
            <Route path="/minhaconta"
                    element={ <PrivateRoute> <MyAccount /> </PrivateRoute>} />
            <Route path="/meusdados"
                    element={ <PrivateRoute> <UpdateAccount /> </PrivateRoute>} />
            <Route path="/mensagens"
                    element={ <PrivateRoute> <MessagesProperty /> </PrivateRoute>} />
            <Route path="/chat/:room/:idProperty/:idCompany/:idClient"
                    element={ <PrivateRoute> <ChatMessage /> </PrivateRoute>} />
            <Route path="/favoritos"
                    element={ <PrivateRoute> <Favorites /> </PrivateRoute>} />
            <Route path="/notificacoes"
                    element={ <PrivateRoute> <Notifications /> </PrivateRoute>} />
            <Route path="/meusimoveis"
                    element={ <PrivateRoute> <Negociations /> </PrivateRoute>} />
            <Route path="/agendamentos"
                    element={ <PrivateRoute> <Schedules /> </PrivateRoute>} />
            <Route path="/agendamento/:id"
                    element={ <PrivateRoute> <Scheduling /> </PrivateRoute>} />
            <Route path="/plano/:id"
                    element={ <PrivateRoute> <Checkout /> </PrivateRoute>} />
            <Route path="/pagamentofinalizado"
                    element={ <PrivateRoute> <PaymentCompleted /> </PrivateRoute>} />
            </Routes>
           
    )
}

export {Router}