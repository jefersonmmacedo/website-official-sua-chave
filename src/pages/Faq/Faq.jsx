import { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import "./faq.css"

export function Faq() {

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();

    const Questions = [
        {
            id: 1,
            question: "O que é o Sua Chave?",
            reply: "A Sua Chave foi desenvolvida o com foco em conectar seus imóveis a clientes interessados. Nossos serviços consistem em 3 serviços essenciais: Portal, sistema de gestão e site para imobiliárias corretores."
        },
        {
            id: 2,
            question: "Como me cadastrar no Sua Chave?",
            reply: "Em vários lugares do site você encontra um botão ou link para a falar com um de nossos consultores. O cadastro é simples e bem rápido."
        },
        {
            id: 3,
            question: "Quais os planos?",
            reply: "Possuímso vários planos de acordo com a necessidade dos nossos clientes. Acesse o link https://www.suachave.com.br/planos."
        },
        {
            id: 4,
            question: "Para quem é o Sua Chave?",
            reply: "Para corretores e imobiliárias que querm divulgar seus imóveis alcançando o maior número de possíveis clientes e clientes que buscam um imóvel para sua moradia."
        },
        {
            id: 5,
            question: "Porque desejo criar conta de cliente?",
            reply: "Com a conta como cliente você aproveita as funcionalidades de: Salvar favoritos, mandar mensagem no chat, agendar vistas e muito mais."
        },
        {
            id: 6,
            question: "Os planos possuem fidelidade?",
            reply: "Não. Nossos planos não possuem fidelidade e são cobrados mensalmente."
        },
        {
            id: 7,
            question: "Preciso ter cartão de crédito?",
            reply: "Não. O pagamento das mensalidades são feitos por boleto ou pix, através de um único documento chamado Bolix."
        },
    ]



    const searchFilter = Questions?.filter((companies) => companies.question.toLowerCase().includes(searchLower) || companies.reply.toLowerCase().includes(searchLower))
    return (
        <div className="Faq">
            <Navbar2 />
            <h2>Faq</h2>
            <h4>Tire suas dúvidas com as perguntas mais feitas por nossos clientes e colaboradores.</h4>

            <div className="blocFaq">
                <input type="search" placeholder="Digite sua dúvida" value={search} onChange={e => setSearch(e.target.value)}/>

                    {searchFilter.map((faqs) => {
                        return (
                <div className="faqUnic" key={faqs.id}>
                    <div className="Question">
                            <h4>{faqs.question}</h4>
                    </div>
                    <div className="Reply">
                        <h5>{faqs.reply}</h5>
                    </div>
                </div>
                        )
                    })}
            </div>
            <Footer />
        </div>
    )
}