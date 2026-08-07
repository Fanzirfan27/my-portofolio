import React from 'react';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../Components/ScrollReveal';
import SectionTitle from '../Components/SectionTitle';
import { experiences } from '../data/portfolioData';

export default function Experience() {
    return (
        <section id="experience" className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Experience" subtitle="Work History" />

                <div className="relative max-w-3xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-5 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px]"
                        style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />

                    {experiences.map((exp, i) => (
                        <ScrollReveal key={exp.id} delay={i * 150}>
                            <div className={`relative pl-14 md:pl-0 mb-12 md:w-1/2 ${
                                i % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'
                            }`}>
                                {/* Timeline Dot */}
                                <div className="absolute left-[14px] md:left-auto top-1 w-5 h-5 rounded-full border-[3px] z-10"
                                    style={{
                                        borderColor: 'var(--color-accent)',
                                        backgroundColor: 'var(--bg-primary)',
                                        ...(i % 2 === 0
                                            ? { right: '-10px' }
                                            : { left: '-10px' }),
                                    }}>
                                    {/* Mobile dot position fix */}
                                    <style>{`
                                        @media (max-width: 767px) {
                                            .timeline-dot-${i} { left: 14px !important; right: auto !important; }
                                        }
                                    `}</style>
                                </div>

                                {/* Card */}
                                <div
                                    className="p-6 rounded-2xl card-hover"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                    }}
                                >
                                    {/* Period Badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar size={14} style={{ color: 'var(--color-accent)' }} />
                                        <span className="text-xs font-semibold"
                                            style={{ color: 'var(--color-accent)' }}>
                                            {exp.period}
                                        </span>
                                    </div>

                                    {/* Role */}
                                    <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        {exp.role}
                                    </h3>

                                    {/* Company & Location */}
                                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        <span className="flex items-center gap-1.5">
                                            <Briefcase size={14} /> {exp.company}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={14} /> {exp.location}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                                        {exp.description}
                                    </p>

                                    {/* Contributions */}
                                    <ul className="space-y-2">
                                        {exp.contributions.map((c, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent-green)' }} />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
