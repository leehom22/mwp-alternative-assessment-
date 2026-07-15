import "./Hero.css";
import { motion } from "framer-motion";
import Eyeball from "./Eyeball";

function Hero() {
    // Detect if the user is on a mobile viewport (under 768px wide)
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    return (
        <section id="hero" className="hero">

            <motion.div 
                transition={{ duration: 0.8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                // Animates upward on mobile and slides in from the left on desktop
                initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0 }}
                className="hero-left"
            >
                <h1>Interactive 3D Portfolio</h1>
                <h2>Computer Science Students | Graphic & Multimedia Software</h2>
                <p className="tagline">Building Interactive Digital Experiences</p>
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

                <button className="explore-btn" onClick={() => {
                    document.getElementById("about")?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }}>
                    Explore Portfolio
                </button>
            </motion.div>
        
            <motion.div 
                transition={{ delay: 0.3, duration: 0.8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
                className="hero-right"
            >
                <div className="scene-placeholder">
                    <Eyeball />
                </div>
            </motion.div>

        </section>
    );
}

export default Hero;