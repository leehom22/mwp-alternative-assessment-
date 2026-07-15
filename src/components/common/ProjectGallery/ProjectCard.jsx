import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ProjectCard.css";

function ProjectCard({
    member,
    project,
    memberIndex,
    projectIndex,
    setMemberIndex,
    setProjectIndex
}) {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="project-container">
            
            {/* CLEAN, MINIMALIST MEMBER SWITCHER */}
            <div className="member-navigation">
                <button
                    className="member-nav-btn"
                    onClick={() => {
                        setMemberIndex((memberIndex - 1 + 4) % 4);
                        setProjectIndex(0);
                    }}
                >
                    &#8592;
                </button>
                <h2 className="member-name-display">{member.name}</h2>
                <button
                    className="member-nav-btn"
                    onClick={() => {
                        setMemberIndex((memberIndex + 1) % 4);
                        setProjectIndex(0);
                    }}
                >
                    &#8594;
                </button>
            </div>

            {/* CARD WRAPPER WITH INTEGRATED SLIDER ARROWS */}
            <div className="project-slider-wrapper">
                
                {/* Floating Project Left Arrow */}
                <button 
                    className="slider-arrow left-arrow"
                    aria-label="Previous Project"
                    onClick={() => setProjectIndex((projectIndex - 1 + 3) % 3)}
                >
                    &#8249;
                </button>

                <motion.div
                    key={`${memberIndex}-${projectIndex}`}
                    className="project-card"
                    initial={{ opacity: 0, x: 50, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* INFORMATION SIDE */}
                    <div className="project-info">
                        {/* Premium Modern Status Badge */}
                        <span className="project-counter-badge">
                            Project {projectIndex + 1} of 3
                        </span>
                        
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>

                        <h4>Technologies Used</h4>
                        <ul>
                            {project.technologies.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>

                    {/* IMAGE SIDE */}
                    <div className="project-image">
                        {project.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${project.title}-${index}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Floating Project Right Arrow */}
                <button 
                    className="slider-arrow right-arrow"
                    aria-label="Next Project"
                    onClick={() => setProjectIndex((projectIndex + 1) % 3)}
                >
                    &#8250;
                </button>
                
            </div>

            {/* IMAGE POPUP MODAL */}
            {selectedImage && (
                <div className="image-modal" onClick={() => setSelectedImage(null)}>
                    <div className="image-modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-image" onClick={() => setSelectedImage(null)}>
                            &times;
                        </button>
                        <img src={selectedImage} alt="Large Preview" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectCard;