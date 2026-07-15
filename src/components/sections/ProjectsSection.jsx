import React,{useState} from 'react';
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle/SectionTitle';
import ProjectCard from '../common/ProjectGallery/ProjectCard';
import {members} from '../../data/projects';

const ProjectsSection = () => {

const [memberIndex,setMemberIndex]=useState(0);
const [projectIndex,setProjectIndex]=useState(0);

const member=members[memberIndex];
const project=member.projects[projectIndex];

return (

<section id="projects">

<Reveal>

<div className="container">

<SectionTitle
title={"Project Gallery"}
subtitle={"WHAT WE HAVE BUILT"}
/>

<ProjectCard
member={member}
project={project}
memberIndex={memberIndex}
projectIndex={projectIndex}
setMemberIndex={setMemberIndex}
setProjectIndex={setProjectIndex}
/>

</div>

</Reveal>

</section>

)

}

export default ProjectsSection;