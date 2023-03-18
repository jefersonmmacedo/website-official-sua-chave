import "./propertyCarroussel.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { PropertyUnicBlock } from "../PropertyUnicBlock/PropertyUnicBlock";
import { useFetch } from "../../hooks/useFetch";
import { PropertyUnicBlockLoader } from "../PropertyUnicBlockLoader/PropertyUnicBlockLoader";
import { useState } from "react";


export function PropertyCarroussel({status}) {
    console.log(status)
    const availability = "Disponível";
    const [ currentPage, setCurrentPage] = useState(0);
    const perPage = 12;

    const {data} = useFetch(
        `/property/lists/${availability}/${status}?page=${currentPage}&limit=${perPage}`
       );

    if(!data) {
        return (
            <div className="loader">
            <PropertyUnicBlockLoader />
            <PropertyUnicBlockLoader />
            <PropertyUnicBlockLoader />
            <PropertyUnicBlockLoader />
            </div>
        )
    }
    if(data) {
       console.log(data)
    }
    const buttonStyle = {
        display:'none'
    };
    
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}></button>,
        nextArrow: <button style={{ ...buttonStyle }}></button>
    }

    const responsiveSettings = [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 780,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 560,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 250,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

    return (
        <div>
            <Slide slidesToScroll={3} slidesToShow={3} indicators={true} {...properties} responsive={responsiveSettings}>
                {data?.map((property) => {
                    return (
                        <PropertyUnicBlock id={property.id} key={property.id}/>
                    )

                })}
            </Slide>
        </div>
    )
}