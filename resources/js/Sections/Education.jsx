import React from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import ScrollReveal from '../Components/ScrollReveal';
import SectionTitle from '../Components/SectionTitle';
import { education } from '../data/portfolioData';

export default function Education() {
    return (
        <section id="education" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Education" subtitle="Academic Background" />

                <div className="max-w-3xl mx-auto">
                    {education.map((edu, i) => (
                        <ScrollReveal key={edu.id} delay={i * 150}>
                            <div
                                className="p-6 sm:p-8 rounded-2xl card-hover"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                <div className="flex items-start gap-5">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1))',
                                            border: '1px solid rgba(99, 102, 241, 0.2)',
                                        }}>
                                        <GraduationCap size={24} style={{ color: 'var(--color-accent)' }} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {edu.degree}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                            <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                                                <BookOpen size={14} /> {edu.institution}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <MapPin size={14} /> {edu.campus}, {edu.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                                <Calendar size={14} /> {edu.period}
                                            </span>
                                        </div>

                                        <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--text-secondary)' }}>
                                            {edu.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
