import { useEffect, useState } from "react";
import "./BackToTop.css";

function BackToTop(){

    const [visible,setVisible]=useState(false);

    useEffect(()=>{
        const toggle=()=>{
            setVisible(window.scrollY>500);
        }
        window.addEventListener("scroll",toggle);
        return()=>window.removeEventListener("scroll",toggle);
    },[]);

    if(!visible) return null;
    return(
        <button
        className="back-top"
        onClick={()=>{

            window.scrollTo({
                top:0,
                behavior:"smooth"
            })
        }}

        >
            ↑
        </button>
    )
}

export default BackToTop;