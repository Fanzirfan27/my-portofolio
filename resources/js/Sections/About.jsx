import React from 'react';
import { GraduationCap, Target, MapPin, Sparkles, Download, User } from 'lucide-react';
import ScrollReveal from '../Components/ScrollReveal';
import SectionTitle from '../Components/SectionTitle';
import { aboutData, personalInfo } from '../data/portfolioData';

const iconMap = {
    GraduationCap,
    Target,
    MapPin,
    Sparkles,
};

export default function About() {
    return (
        <section id="about" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="About Me" subtitle="Who I Am" />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
                    {/* Profile Image */}
                    <ScrollReveal direction="left" className="lg:col-span-2">
                        <div className="relative mx-auto lg:mx-0 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-md aspect-square">
                            {/* Gradient border ring */}
                            <div className="absolute inset-0 rounded-2xl animate-gradient opacity-60"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent), #06b6d4, var(--color-accent-green), var(--color-accent))',
                                    padding: '3px',
                                    borderRadius: '1.25rem',
                                }} />
                            <div className="absolute inset-[3px] rounded-[calc(1.25rem-3px)] overflow-hidden"
                                style={{ backgroundColor: 'var(--bg-card)' }}>
                                {personalInfo.avatar ? (
                                    <img
                                        src={personalInfo.avatar}
                                        alt={personalInfo.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                                        style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1))' }}>
                                        <User size={64} style={{ color: 'var(--color-accent)', opacity: 0.5 }} />
                                        <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                                            Profile Photo
                                        </span>
                                    </div>
                                )}
                            </div>
                            {/* Floating decoration */}
                            <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl animate-float-slow opacity-30"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent), #06b6d4)',
                                    filter: 'blur(20px)',
                                }} />
                        </div>
                    </ScrollReveal>

                    {/* Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {aboutData.paragraphs.map((p, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    {p}
                                </p>
                            </ScrollReveal>
                        ))}

                        {/* Quick Info Cards */}
                        <ScrollReveal delay={300}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                                {aboutData.quickInfo.map((info) => {
                                    const Icon = iconMap[info.icon] || Sparkles;
                                    return (
                                        <div
                                            key={info.label}
                                            className="flex items-center gap-3 p-4 rounded-xl"
                                            style={{
                                                backgroundColor: 'var(--bg-card)',
                                                border: '1px solid var(--border-color)',
                                            }}
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                    color: 'var(--color-accent)',
                                                }}>
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                                                    {info.label}
                                                </span>
                                                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                    {info.value}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollReveal>

                        {/* Download CV */}
                        <ScrollReveal delay={400}>
                            <a
                                href={personalInfo.cvUrl}
                                download
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 mt-4"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                                }}
                            >
                                <Download size={16} /> Download CV
                            </a>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
