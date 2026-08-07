import React from 'react';
import SectionTitle from '../Components/SectionTitle';
import ProjectCard from '../Components/ProjectCard';
import { projects } from '../data/portfolioData';

export default function Projects() {
    return (
        <section id="projects" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Featured Projects" subtitle="My Work" />

                <p className="text-center text-base mb-12 -mt-6 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Beberapa project yang pernah saya kerjakan dalam pengembangan aplikasi web, mobile, dan solusi berbasis teknologi.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
