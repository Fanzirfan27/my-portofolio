import React from 'react';
import {
    GraduationCap, Target, MapPin, Sparkles, Download, User,
    Code2, Layers, CheckCircle2, MessageCircle, ArrowRight
} from 'lucide-react';
import ScrollReveal from '../Components/ScrollReveal';
import SectionTitle from '../Components/SectionTitle';
import { aboutData, personalInfo } from '../data/portfolioData';

const iconMap = {
    GraduationCap,
    Target,
    MapPin,
    Sparkles,
    Code2,
    Layers,
    CheckCircle2,
};

export default function About() {
    return (
        <section id="about" className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="About Me"
                    subtitle={aboutData.subtitle || 'Engineering With Purpose & Precision'}
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
                    {/* Profile Image & Badges */}
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

                            {/* Floating credential badge */}
                            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 z-10 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.95)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(99, 102, 241, 0.25)',
                                }}>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}>
                                    <Code2 size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">Full-Stack &amp; Mobile</p>
                                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Production-Ready</p>
                                </div>
                            </div>

                            {/* Floating decoration */}
                            <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl animate-float-slow opacity-30 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent), #06b6d4)',
                                    filter: 'blur(20px)',
                                }} />
                        </div>
                    </ScrollReveal>

                    {/* Content Column */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Tagline & Headline */}
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3"
                                style={{
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                    color: 'var(--color-accent-light)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                }}>
                                <Sparkles size={14} className="text-indigo-400" />
                                {aboutData.tagline}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug"
                                style={{ color: 'var(--text-primary)' }}>
                                {aboutData.title}
                            </h3>
                        </ScrollReveal>

                        {/* Paragraphs */}
                        <div className="space-y-4 pt-1">
                            {aboutData.paragraphs.map((p, i) => (
                                <ScrollReveal key={i} delay={i * 80}>
                                    <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {p}
                                    </p>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* Core Pillars / Highlights */}
                        {aboutData.highlights && (
                            <ScrollReveal delay={250}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                                    {aboutData.highlights.map((h, i) => {
                                        const HighlightIcon = iconMap[h.icon] || Sparkles;
                                        return (
                                            <div
                                                key={i}
                                                className="p-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                                                style={{
                                                    backgroundColor: 'var(--bg-card)',
                                                    border: '1px solid var(--border-color)',
                                                }}
                                            >
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                                                    style={{
                                                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                                        color: 'var(--color-accent)',
                                                    }}>
                                                    <HighlightIcon size={16} />
                                                </div>
                                                <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                                    {h.title}
                                                </h4>
                                                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                    {h.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Quick Info Cards */}
                        <ScrollReveal delay={350}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {aboutData.quickInfo.map((info) => {
                                    const Icon = iconMap[info.icon] || Sparkles;
                                    return (
                                        <div
                                            key={info.label}
                                            className="flex items-center gap-3.5 p-3.5 rounded-xl transition-colors"
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

                        {/* CTAs */}
                        <ScrollReveal delay={450}>
                            <div className="flex flex-wrap items-center gap-3 pt-3">
                                <a
                                    href={personalInfo.cvUrl}
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                                    }}
                                >
                                    <Download size={16} /> Download CV
                                </a>
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        color: 'var(--text-primary)',
                                        border: '1px solid var(--border-color)',
                                    }}
                                >
                                    <MessageCircle size={16} /> Hubungi Saya <ArrowRight size={14} />
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
