import React from 'react';
import './MemberCard.css';

function MemberCard({
    name,
    degree,
    description,
    achievements,
    image,
    index,
    hoveredMember,
    setHoveredMember
}) {

    let className = "member-card";

    if (hoveredMember === index) {
        className += " active";
    } else if (hoveredMember !== null) {
        className += " inactive";
    }

    return (
        <div
            className={className}
            onMouseEnter={() => setHoveredMember(index)}
            onMouseLeave={() => setHoveredMember(null)}
        >
            <img
                src={image}
                alt={name}
                className="member-image"
            />

            <h3 className="member-name">
                {name}
            </h3>

            <h4 className="member-degree">
                {degree}
            </h4>

            {/* Optimized Container for Smooth Collapsing */}
            <div className="member-details">
                <p className="member-description">
                    {description}
                </p>

                {achievements && achievements.length > 0 && (
                    <div className="member-achievements">
                        <h4 className="achievement-title">
                            Personal Achievement
                        </h4>
                        <ul className="achievement-list">
                            {achievements.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemberCard;