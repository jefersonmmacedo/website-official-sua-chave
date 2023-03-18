import "./companies.css"
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { CompanyList } from "../../components/CompanyList/CompanyList";

export function Companies() {
    return (
        <div className="Companies">
            <Navbar2 />

            <h2>Imobiliárias e corretores</h2>

            <CompanyList />
            <Footer />
        </div>
    )
}