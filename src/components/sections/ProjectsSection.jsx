import React from 'react'
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle/SectionTitle';

const ProjectsSection = () => {
    return (
        <section id="projects">
            <Reveal>
                <div className="container">
                    <SectionTitle title={"Project Section"} subtitle={"WHAT WE HAVE BUILT"}/>
                    <p>
                        This section will be developed by Member 3.
                    </p>
                </div>
            </Reveal>
        </section>
    );
}

export default ProjectsSection