import "./newShareBox.css"
import { IoShareOutline, } from "react-icons/io5";
import { RWebShare } from "react-web-share";
import { FiShare2 } from "react-icons/fi";


export function NewShareBox({idProperty, title}) {
    return (
      <div className="buttonShareBox">
      <RWebShare
        data={{
          text: `ckaknvalkvnnlknj`,
          img: `https://img.freepik.com/fotos-gratis/bela-praia-tropical-mar-e-mar-com-palmeira-de-coco-na-hora-do-nascer-do-sol_74190-7454.jpg?w=2000`,
          url: `https://www.suachave.com.br/imovel/${idProperty}`,
          title: `${title}`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
       <FiShare2 />
      </RWebShare>
      </div>

    )
}
