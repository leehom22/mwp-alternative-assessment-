import React, { useState } from 'react';

import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle/SectionTitle';
import MemberCard from '../common/MemberCard/MemberCard';


function AboutSection() {

    const [hoveredMember,setHoveredMember] = useState(null);


    const members = [

    {
        name:"Ling Lee Hom",

        degree:
        "Bachelor in Computer Science in Graphic and Multimedia",

        description:
        "Aspiring Full-Stack Engineer focused on designing, developing, and deploying robust, enterprise-grade web applications. Committed to implementing scalable architectures, clean code practices, and modern development workflows.",

        achievements:[

            "Kitahack  2026 - 2nd Runner Up",

            "UM Hackathon 2026 - Participant",

            "VHack 2026  - Participant",


        ],

        image:"/images/LeeHom.jpeg"
    },


    {
        name:"Uthaya Darshni A/P Prakash",

        degree:
        "Bachelor in Computer Science in Graphic and Multimedia",

        description:
        "Interested in AI-powered applications, UI/UX design, and modern web technologies. Aims to continuously improve technical skills and contribute to innovative software solutions while pursuing a career in software development.",

        achievements:[

            "Gold Award - INNOVEX 2026 (International)",

            "Gold Award - iGEN 2026 (International)",

            "SCRATCH Block Programming (Workshop Series)"

        ],

        image:"/images/Darshini.png"
    },


    {
        name:"Nicholas Yek Ei Zhe",

        degree:
        "Bachelor in Computer Science in Graphic and Multimedia",

        description:
        "Aspiring Software Engineer with a strong interest in Artificial Intelligence, Computer Vision, Augmented Reality (AR), Graphics Programming, Full-Stack Web Development, and Multimedia Systems. Seeking opportunities to apply technical knowledge in innovative software projects while continuously developing expertise in modern technologies and software engineering. ",

        achievements:[


        ],

        image:"/images/Nicholas.jpeg"
    },


    {
        name:"Lee Xuan Ying",

        degree:
        "Bachelor in Computer Science in Graphic and Multimedia",

        description:
        "Interested in game development through Unity engine alongside game design and drawing. Aims to continuously improve knowledge in game design and coding alongside drawing to someday be able to make my own indie game with optimized code and innovative ideas and visuals.",

        achievements:[

        ],

        image:"/images/XuanYing.jpg"
    }

];

    return (
        <section id="about">
            <Reveal>
                <div className="container">
                    <SectionTitle
                        title={"About Us"}
                        subtitle={"WHO WE ARE"}
                    />
                    <div
                        className={
                            hoveredMember !== null
                            ?
                            `member-grid member-${hoveredMember}`
                            :
                            "member-grid"
                        }
                    >
                        {
                            members.map((member,index)=>(
                                <MemberCard
                                    key={index}
                                    {...member}
                                    index={index}
                                    hoveredMember={hoveredMember}
                                    setHoveredMember={setHoveredMember}
                                />
                            ))
                        }
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

export default AboutSection;