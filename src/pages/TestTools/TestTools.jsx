import "./testTools.css";
import ReactFullscreenSlideshow from 'react-fullscreen-slideshow';
import { useState } from "react";
import { RiH3 } from "react-icons/ri";

export function TestTools(){
    const [number, setNumber] = useState()
    const images = [
        {
            image: 'https://images.unsplash.com/photo-1664574652984-5b5f769bef07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1663091701962-2ae72a2ad2ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://images.unsplash.com/photo-1669999666300-532838c49a6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://images.unsplash.com/photo-1664574652984-5b5f769bef07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1663091701962-2ae72a2ad2ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://images.unsplash.com/photo-1669999666300-532838c49a6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://images.unsplash.com/photo-1664574652984-5b5f769bef07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1663091701962-2ae72a2ad2ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://images.unsplash.com/photo-1669999666300-532838c49a6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://images.unsplash.com/photo-1664574652984-5b5f769bef07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://plus.unsplash.com/premium_photo-1663091701962-2ae72a2ad2ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
            image: 'https://images.unsplash.com/photo-1669999666300-532838c49a6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        }
    ];

    console.log(number)

    return (
        <div className="App2"> 
        {/* <ReactFullscreenSlideshow images={images} width="100%" height="100%" cycle={true}/> */}
        <h2>Seja bem-vindo.<br /> O sua chave é para você!</h2>

        <input type="text" className="primary" placeholder="Digite o código" list="brow"/>
                    <datalist id="brow">
                        <option value="Internet Explorer"></option>
                        <option value="Firefox"></option>
                        <option value="Chrome"></option>
                        <option value="Opera"></option>
                        <option value="Safari"></option>
                        </datalist>

        {number < 20000 ?
        <h3>Menor: {number}</h3>
        :
        <h3>Maior: {number}</h3>
        }
    </div>
    )
}
