import "./SectionTitle.css";

function SectionTitle({
    subtitle,
    title
}) {

    return (
        <div className="section-title">
            <span>
                {subtitle}
            </span>

            <h2>
                {title}
            </h2>
        </div>
    );

}

export default SectionTitle;

{/* <SectionTitle
title="About Us"
subtitle="WHO WE ARE"/> */}