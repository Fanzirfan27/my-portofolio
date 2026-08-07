import React from 'react';
import ScrollReveal from '../Components/ScrollReveal';
import SectionTitle from '../Components/SectionTitle';
import SkillCard from '../Components/SkillCard';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
    // Flatten skills from all categories
    const allSkills = skillCategories.flatMap((category) => category.skills);

    return (
        <section id="skills" className="py-20 lg:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <SectionTitle title="Skills & Technologies" subtitle="Tech Stack" />
            </div>

            <ScrollReveal>
                <div className="carousel-3d-container">
                    {/* Background glow for 3D depth perception */}
                    <div className="carousel-3d-glow" />

                    <div className="carousel-3d-scene">
                        <div className="carousel-3d-track">
                            {allSkills.map((skill, index) => {
                                const angle = index * (360 / allSkills.length);
                                return (
                                    <div
                                        key={skill.name}
                                        className="carousel-3d-item"
                                        style={{
                                            '--angle': `${angle}deg`,
                                            transform: `rotateY(${angle}deg) translateZ(var(--carousel-radius))`,
                                        }}
                                    >
                                        <SkillCard skill={skill} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
