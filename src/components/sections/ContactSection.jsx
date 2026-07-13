import React from 'react'
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle/SectionTitle';

const ContactSection = () => {
    return (
        <section id="contact">
            <Reveal>
                <div className="container">
                    <SectionTitle title={"Contact Section"} subtitle={"LET'S GET IN TOUCH"}/>
                    <p>
                        This section will be developed by Member 4.
                    </p>
                </div>
            </Reveal>
        </section>
    );
}

export default ContactSection