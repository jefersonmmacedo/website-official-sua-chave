import "./home.css";
import Navbar2 from "../../components/Nav/Navbar";
import { Footer } from "../../components/Footer/Footer";
import {  PropertyCarroussel } from "../../components/PropertyCarroussel/PropertyCarroussel";
import { DownloadApp } from "../../components/DownloadApp/DownloadApp";
import { Cities } from "../../components/Cities/Cities";
import { ExploreIconsProperties } from "../../components/ExploreIconsProperties/ExploreIconsProperties";
import { ToHire } from "../../components/ToHire/ToHire";
import { Finance } from "../../components/Finance/Finance";
import { TopHeadHome } from "../../components/TopHeadHome/TopHeadHome";
import { NewSearchClient } from "../../components/NewSearchClient/NewSearchClient";
import { useState } from "react";
import { Partners } from "../../components/Partners/Partners";
import { Announce } from "../../components/Announce/Announce";


export function Home() {

    // setInterval(function () {
    //     if (navigator.onLine) {
    //         console.log("Online")
    //       } else {
    //         alert("OffLine")
    //       }
    // }, 1000);

    return (
        <div className="Home">
            <Navbar2 />
            <TopHeadHome />
           <ExploreIconsProperties />
            <div className="textFeature">
            <h3>Imóveis à venda</h3>
            </div>

            <div className="carroussel">
            <PropertyCarroussel status={"Venda"}/>
            </div>
            
            {/* <DownloadApp /> */}
            <div className="textFeature">
            <h3>Imóveis para alugar</h3>
            </div>
            <div className="carroussel">
            <PropertyCarroussel status={"Aluguel"}/>
            </div>
            <Finance />

            <NewSearchClient />
         
            {/* <Cities /> */}
            {/* <ToHire /> */}
            <Footer />
        </div>
    )
}