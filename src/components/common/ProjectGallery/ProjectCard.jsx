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
        <div className="project-wrapper">

            {/* MEMBER SWITCH */}
            <div className="member-switch">

                <button
                    onClick={() => {
                        setMemberIndex(
                            (memberIndex - 1 + 4) % 4
                        );
                        setProjectIndex(0);
                    }}
                >
                    &lt;
                </button>

                <h2>
                    {member.name}
                </h2>

                <button
                    onClick={() => {
                        setMemberIndex(
                            (memberIndex + 1) % 4
                        );
                        setProjectIndex(0);
                    }}
                >
                    &gt;
                </button>

            </div>


            {/* PROJECT SWITCH */}
            <div className="project-switch">

                <button
                    onClick={() => {
                        setProjectIndex(
                            (projectIndex - 1 + 3) % 3
                        );
                    }}
                >
                    &lt;
                </button>

                <h3>
                    Project {projectIndex + 1}/3
                </h3>

                <button
                    onClick={() => {
                        setProjectIndex(
                            (projectIndex + 1) % 3
                        );
                    }}
                >
                    &gt;
                </button>

            </div>


            {/* PROJECT CARD */}
            <motion.div
                key={`${memberIndex}-${projectIndex}`}
                className="project-card"

                initial={{
                    opacity: 0,
                    x: 120,
                    scale: 0.9,
                    filter: "blur(5px)"
                }}

                animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    filter: "blur(0px)"
                }}

                exit={{
                    opacity: 0,
                    x: -120,
                    scale: 0.8,
                    filter: "blur(10px)"
                }}

                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
            >


                {/* INFORMATION */}
                <div className="project-info">

                    <h2>
                        {project.title}
                    </h2>

                    <p>
                        {project.description}
                    </p>

                    <h4>
                        Technologies Used
                    </h4>

                    <ul>
                        {
                            project.technologies.map(
                                (tech, index) => (
                                    <li key={index}>
                                        {tech}
                                    </li>
                                )
                            )
                        }
                    </ul>

                </div>


                {/* IMAGE */}
                <div className="project-image">

                    {
                        project.images.map(
                            (img, index) => (

                                <img
                                    key={index}
                                    src={img}
                                    alt={`${project.title}-${index}`}

                                    onClick={() => {
                                        setSelectedImage(img);
                                    }}
                                />

                            )
                        )
                    }

                </div>


            </motion.div>


            {/* IMAGE POPUP */}
            {
                selectedImage && (

                    <div
                        className="image-modal"

                        onClick={() => {
                            setSelectedImage(null);
                        }}
                    >

                        <div
                            className="image-modal-box"

                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >

                            <button
                                className="close-image"

                                onClick={() => {
                                    setSelectedImage(null);
                                }}
                            >
                                ×
                            </button>


                            <img
                                src={selectedImage}
                                alt="Large Preview"
                            />

                        </div>

                    </div>

                )
            }


        </div>
    );
}

export default ProjectCard;