import React from 'react'
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle/SectionTitle';

const SkillsSection = () => {
    return (
        <section id="skills">
            <Reveal>
                <div className="container">
                    <SectionTitle title={"Skills Section"} subtitle={"OUR SKILLS"}/>
                    <p>
                        This section will be developed by Member 3.
                    </p>
                </div>
            </Reveal>
        </section>
    );
}

export default SkillsSection