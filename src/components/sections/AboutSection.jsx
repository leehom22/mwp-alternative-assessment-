import React from 'react'
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle/SectionTitle';

function AboutSection() {
    return (
        <section id="about">
            <Reveal>
                <div className="container">
                    <SectionTitle title={"About Us"} subtitle={"WHO WE ARE"}/>
                    <p>
                        This section will be developed by Member 3.
                    </p>
                </div>
            </Reveal>
        </section>
    );
}

export default AboutSection;