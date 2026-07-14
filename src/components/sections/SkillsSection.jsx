import React, { useState } from 'react'

import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle/SectionTitle';

import SkillCanvas from '../common/SkillSphere/SkillCanvas';

import { members } from '../../data/skills';

import '../common/SkillSphere/SkillSphere.css';



const SkillsSection = () => {


    const [current, setCurrent] = useState(0);



    const nextMember = () => {

        setCurrent(
            (current + 1) % members.length
        );

    };



    const previousMember = () => {

        setCurrent(
            (current - 1 + members.length) % members.length
        );

    };



    return (

        <section id="skills">

            <Reveal>

                <div className="container">


                    <SectionTitle 
                        title={"Skills Showcase"} 
                        subtitle={"OUR SKILLS"}
                    />



                    <div className="skill-navigation">


                        <button
                            onClick={previousMember}
                        >

                            &lt;

                        </button>



                        <h2>

                            {
                                members[current].name
                            }

                        </h2>



                        <button
                            onClick={nextMember}
                        >

                            &gt;

                        </button>


                    </div>




                    <div className="skills-canvas">


                        <SkillCanvas

                            members={members}

                            current={current}

                        />


                    </div>



                </div>

            </Reveal>

        </section>

    );

}


export default SkillsSection;