import HeroObject from "../threeD/HeroObject";
import "./Hero.css";
import { motion } from "framer-motion";

function Hero() {
    return (
        <section id="hero" className="hero">

            <motion.div 
            transition={{duration:.8}}
            animate={{opacity:1,x:0}}
            initial={{opacity:0,x:-50}}
            className="hero-left"
            >

                <h1>
                    Interactive 3D Portfolio
                </h1>
                <h2>
                    Computer Science Students | Graphic & Multimedia Software
                </h2>
                <p className="tagline">
                    Building Interactive Digital Experiences
                </p>
                <p className="description">
                    We are a team of four Computer Science students specializing
                    in Graphic and Multimedia Software at Universiti Teknologi
                    Malaysia (UTM). Passionate about web development, computer
                    graphics, multimedia technologies, and interactive user
                    experiences, we collaborate to create innovative digital
                    solutions that combine creativity with modern web
                    technologies. This portfolio showcases our technical skills,
                    academic projects, and achievements through an immersive
                    3D web experience powered by Three.js.
                </p>

                <button className="explore-btn" onClick={()=>{
                    document.getElementById("about").scrollIntoView({
                        behavior:'smooth',
                        block:'start'
                    })
                }}>
                    Explore Portfolio
                </button>

            </motion.div>
        
            <motion.div 
            transition={{
                    delay:.3,
                    duration:.8
                }}
            animate={{opacity:1,x:0}}
            initial={{opacity:0,x:50}}
            className="hero-right">

                <div className="scene-placeholder">

                   <HeroObject/>

                </div>

            </motion.div>

        </section>
    );
}

export default Hero;