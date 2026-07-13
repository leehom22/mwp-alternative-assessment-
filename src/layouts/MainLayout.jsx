import React from 'react'
import { Outlet } from "react-router-dom";
import ScrollProgress from '../components/common/ScrollProgress/ScrollProgress';
import BackToTop from '../components/common/BackToTop/BackToTop';
import Background from '../components/common/Background/Background';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';

function MainLayout(){
    return(
        <>
            <Background/>
            <BackToTop/>
            <ScrollProgress/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default MainLayout;