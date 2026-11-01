import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, ArrowRight, Calendar, Clock, User, CheckCircle2,
    ExternalLink, Lock, AlertTriangle, Lightbulb, ListChecks,
    Sparkles, Code2, Globe, Laptop
} from 'lucide-react';
import { GithubIcon } from '../Components/Icons';
import MainLayout from '../Layouts/MainLayout';
import ScrollReveal from '../Components/ScrollReveal';

export default function ProjectDetail({ project, projects = [] }) {
    const currentIndex = projects.findIndex((p) => p.slug === project?.slug);
    const nextProject = projects.length > 1
        ? projects[(currentIndex + 1) % projects.length]
        : null;

    if (!project) {
        return (
            <MainLayout>
                <Head title="Project Not Found" />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Project Not Found
                        </h1>
                        <Link href="/#projects" className="text-indigo-400 hover:underline">
                            ← Back to Projects
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const categoryColors = {
        'Web & Mobile Application': '#818cf8',
        'Web Application': '#22d3ee',
        'Desktop Application': '#a78bfa',
        'Point of Sale': '#fbbf24',
    };

    const accentColor = categoryColors[project.category] || '#818cf8';

    const isPrivate = Boolean(
        project.is_private === true ||
        project.is_private === 1 ||
        project.is_private === '1' ||
        project.is_private === 'true' ||
        project.isPrivate === true
    );

    return (
        <MainLayout>
            <Head title={`${project.title} — Project Case Study`} />

            {/* Top Atmospheric Glow */}
            <div className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] opacity-25 blur-3xl"
                    style={{
                        background: `radial-gradient(circle at 50% 20%, ${accentColor} 0%, transparent 70%)`
                    }}
                />

                {/* Hero Header Section */}
                <section className="relative pt-24 sm:pt-28 pb-10">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Navigation Breadcrumb */}
                        <ScrollReveal>
                            <div className="flex items-center gap-2 text-xs sm:text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
                                <Link
                                    href="/#projects"
                                    className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-indigo-400"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <ArrowLeft size={14} /> Projects
                                </Link>
                                <span>/</span>
                                <span className="truncate max-w-[200px] sm:max-w-md font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {project.title}
                                </span>
                            </div>
                        </ScrollReveal>

                        {/* Category & Status Badges */}
                        <ScrollReveal delay={50}>
                            <div className="flex flex-wrap items-center gap-2.5 mb-5">
                                <span
                                    className="text-xs font-semibold px-3 py-1 rounded-full"
                                    style={{
                                        backgroundColor: `${accentColor}18`,
                                        color: accentColor,
                                        border: `1px solid ${accentColor}35`,
                                    }}
                                >
                                    {project.category}
                                </span>
                                {project.status && (
                                    <span
                                        className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5"
                                        style={{
                                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                            color: '#34d399',
                                            border: '1px solid rgba(16, 185, 129, 0.25)',
                                        }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        {project.status}
                                    </span>
                                )}
                            </div>
                        </ScrollReveal>

                        {/* Title */}
                        <ScrollReveal delay={100}>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
                                {project.title}
                            </h1>
                        </ScrollReveal>

                        {/* Short Tagline / Description */}
                        {project.description && (
                            <ScrollReveal delay={150}>
                                <p className="mt-4 text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    {project.description}
                                </p>
                            </ScrollReveal>
                        )}

                        {/* Quick Metadata Strip (Seamless inline stats, not cards) */}
                        <ScrollReveal delay={200}>
                            <div
                                className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 py-5 mt-6 border-y"
                                style={{ borderColor: 'var(--border-color)' }}
                            >
                                {project.role && (
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <User size={15} style={{ color: accentColor }} />
                                        <span style={{ color: 'var(--text-tertiary)' }}>Role:</span>
                                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{project.role}</span>
                                    </div>
                                )}
                                {project.year && (
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <Calendar size={15} style={{ color: accentColor }} />
                                        <span style={{ color: 'var(--text-tertiary)' }}>Year:</span>
                                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{project.year}</span>
                                    </div>
                                )}
                                {project.duration && (
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <Clock size={15} style={{ color: accentColor }} />
                                        <span style={{ color: 'var(--text-tertiary)' }}>Timeline:</span>
                                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{project.duration}</span>
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>

                        {/* Action Buttons */}
                        <ScrollReveal delay={250}>
                            <div className="flex flex-wrap items-center gap-3 pt-6">
                                {project.live_demo && (
                                    <a
                                        href={project.live_demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                                        style={{
                                            background: `linear-gradient(135deg, ${accentColor}, #6366f1)`,
                                            boxShadow: `0 8px 24px -6px ${accentColor}60`,
                                        }}
                                    >
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                )}
                                {isPrivate ? (
                                    <span
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold opacity-90 cursor-not-allowed select-none"
                                        style={{
                                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                            border: '1px solid rgba(245, 158, 11, 0.3)',
                                            color: '#fbbf24',
                                        }}
                                        title="Source code repository is private & confidential"
                                    >
                                        <Lock size={15} className="text-amber-400" /> Private Repository 🔒
                                    </span>
                                ) : (
                                    <>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                                                style={{
                                                    backgroundColor: 'var(--bg-card)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)',
                                                }}
                                            >
                                                <GithubIcon size={16} /> {project.github_backend ? 'GitHub (Frontend)' : 'View Code'}
                                            </a>
                                        )}
                                        {project.github_backend && (
                                            <a
                                                href={project.github_backend}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                                                style={{
                                                    backgroundColor: 'var(--bg-card)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-primary)',
                                                }}
                                            >
                                                <GithubIcon size={16} /> GitHub (API Backend)
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Hero Showcase Mockup (Prominent Visual, not hidden in sidebar) */}
                <section className="pb-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal delay={300}>
                            <div
                                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300"
                                style={{
                                    borderColor: 'var(--border-color)',
                                    backgroundColor: 'var(--bg-card)',
                                    boxShadow: `0 24px 60px -15px ${accentColor}18, 0 10px 30px -10px var(--shadow-lg)`,
                                }}
                            >
                                {/* Browser Chrome Top Bar */}
                                <div
                                    className="px-4 py-3 border-b flex items-center justify-between"
                                    style={{
                                        borderColor: 'var(--border-color)',
                                        backgroundColor: 'var(--bg-secondary)',
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
                                        <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
                                        <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
                                    </div>
                                    <div
                                        className="px-3 py-1 rounded-md text-xs font-mono max-w-[260px] sm:max-w-sm truncate text-center opacity-70"
                                        style={{
                                            backgroundColor: 'var(--bg-card)',
                                            border: '1px solid var(--border-color)',
                                            color: 'var(--text-tertiary)',
                                        }}
                                    >
                                        {project.live_demo || `https://portfolio.dev/projects/${project.slug}`}
                                    </div>
                                    <div className="text-xs font-semibold px-2 py-0.5 rounded opacity-60" style={{ color: accentColor }}>
                                        Preview
                                    </div>
                                </div>

                                {/* Mockup Preview Image */}
                                {project.image ? (
                                    <div className="relative w-full max-h-[560px] overflow-hidden bg-black/5 flex items-center justify-center">
                                        <img
                                            src={project.image}
                                            alt={`${project.title} Preview`}
                                            className="w-full h-auto object-cover object-top"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="aspect-[16/9] max-h-[460px] flex flex-col items-center justify-center p-8 text-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${accentColor}12, var(--bg-card))`,
                                        }}
                                    >
                                        <Laptop size={48} className="mb-3 opacity-40" style={{ color: accentColor }} />
                                        <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            {project.title}
                                        </h3>
                                        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                                            Preview screenshot coming soon
                                        </p>
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </div>

            {/* Main Editorial Body (Seamless case study, no redundant cards) */}
            <section className="pb-24 pt-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left / Main Narrative Flow (lg:col-span-8) */}
                        <div className="lg:col-span-8 space-y-14">
                            {/* Overview */}
                            {project.overview && (
                                <ScrollReveal>
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                                                Project Overview
                                            </span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                                            About the project
                                        </h2>
                                        <p className="text-base sm:text-lg leading-relaxed font-normal" style={{ color: 'var(--text-secondary)' }}>
                                            {project.overview}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            )}

                            {/* Problem & Solution (Side-by-side comparative layout, not 2 separate isolated cards) */}
                            {(project.problem || project.solution) && (
                                <ScrollReveal delay={100}>
                                    <div className="pt-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Problem Statement */}
                                            {project.problem && (
                                                <div
                                                    className="p-6 rounded-2xl transition-all"
                                                    style={{
                                                        backgroundColor: 'var(--bg-card)',
                                                        borderLeft: '4px solid #f59e0b',
                                                        borderTop: '1px solid var(--border-color)',
                                                        borderRight: '1px solid var(--border-color)',
                                                        borderBottom: '1px solid var(--border-color)',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm mb-2.5">
                                                        <AlertTriangle size={17} />
                                                        <span>The Challenge</span>
                                                    </div>
                                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                        {project.problem}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Solution Statement */}
                                            {project.solution && (
                                                <div
                                                    className="p-6 rounded-2xl transition-all"
                                                    style={{
                                                        backgroundColor: 'var(--bg-card)',
                                                        borderLeft: '4px solid #10b981',
                                                        borderTop: '1px solid var(--border-color)',
                                                        borderRight: '1px solid var(--border-color)',
                                                        borderBottom: '1px solid var(--border-color)',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2.5">
                                                        <Lightbulb size={17} />
                                                        <span>The Solution</span>
                                                    </div>
                                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                        {project.solution}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            )}

                            {/* Key Features (Clean open grid instead of a boxed card) */}
                            {project.features && project.features.length > 0 && (
                                <ScrollReveal delay={150}>
                                    <div className="pt-4">
                                        <div className="flex items-center justify-between mb-6 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                                            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}>
                                                <ListChecks size={22} style={{ color: accentColor }} /> Key Features & Capabilities
                                            </h2>
                                            <span
                                                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: `${accentColor}15`,
                                                    color: accentColor,
                                                }}
                                            >
                                                {project.features.length} Features
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {project.features.map((feature, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-start gap-3 p-3.5 rounded-xl transition-all hover:translate-x-1"
                                                    style={{
                                                        backgroundColor: 'var(--bg-card)',
                                                        border: '1px solid var(--border-color)',
                                                    }}
                                                >
                                                    <span
                                                        className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                                                        style={{
                                                            backgroundColor: `${accentColor}18`,
                                                            color: accentColor,
                                                        }}
                                                    >
                                                        <CheckCircle2 size={15} />
                                                    </span>
                                                    <span className="text-sm font-medium leading-snug" style={{ color: 'var(--text-secondary)' }}>
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            )}
                        </div>

                        {/* Right Column / Unified Sidebar (lg:col-span-4) - Single sticky rail, NO 3 separate cards */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                <ScrollReveal direction="right">
                                    <div
                                        className="p-6 rounded-2xl backdrop-blur-sm"
                                        style={{
                                            backgroundColor: 'var(--bg-card)',
                                            border: '1px solid var(--border-color)',
                                        }}
                                    >
                                        {/* Tech Stack */}
                                        {project.tech && project.tech.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-xs font-bold uppercase tracking-wider mb-3.5 flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                                                    <Code2 size={15} style={{ color: accentColor }} /> Technologies Used
                                                </h3>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.tech.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="text-xs font-medium px-2.5 py-1 rounded-md transition-colors hover:scale-105"
                                                            style={{
                                                                backgroundColor: `${accentColor}12`,
                                                                color: accentColor,
                                                                border: `1px solid ${accentColor}25`,
                                                            }}
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Project Specifications */}
                                        <div className="pt-5 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                                                Project Details
                                            </h3>
                                            <div className="space-y-2.5 text-xs sm:text-sm">
                                                {[
                                                    { label: 'Role', value: project.role },
                                                    { label: 'Timeline', value: project.duration },
                                                    { label: 'Year', value: project.year },
                                                    { label: 'Category', value: project.category },
                                                    { label: 'Status', value: project.status },
                                                ].filter(item => item.value).map((item) => (
                                                    <div key={item.label} className="flex justify-between items-center py-1">
                                                        <span style={{ color: 'var(--text-tertiary)' }}>{item.label}</span>
                                                        <span className="font-semibold text-right" style={{ color: 'var(--text-primary)' }}>{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Links inside sidebar for quick access */}
                                        {(project.live_demo || project.github || project.github_backend || isPrivate) && (
                                            <div className="pt-5 mt-5 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
                                                {project.live_demo && (
                                                    <a
                                                        href={project.live_demo}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                                                        style={{ background: accentColor }}
                                                    >
                                                        <ExternalLink size={13} /> Visit Live Project
                                                    </a>
                                                )}
                                                {isPrivate ? (
                                                    <div
                                                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold opacity-90 cursor-not-allowed select-none"
                                                        style={{
                                                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                                            border: '1px solid rgba(245, 158, 11, 0.25)',
                                                            color: '#fbbf24',
                                                        }}
                                                        title="Repository source code bersifat private"
                                                    >
                                                        <Lock size={13} className="text-amber-400" /> Private Repository 🔒
                                                    </div>
                                                ) : (
                                                    <>
                                                        {project.github && (
                                                            <a
                                                                href={project.github}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors hover:text-indigo-400"
                                                                style={{
                                                                    backgroundColor: 'var(--bg-secondary)',
                                                                    border: '1px solid var(--border-color)',
                                                                    color: 'var(--text-primary)',
                                                                }}
                                                            >
                                                                <GithubIcon size={14} /> {project.github_backend ? 'Frontend Code' : 'Source Code'}
                                                            </a>
                                                        )}
                                                        {project.github_backend && (
                                                            <a
                                                                href={project.github_backend}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors hover:text-indigo-400"
                                                                style={{
                                                                    backgroundColor: 'var(--bg-secondary)',
                                                                    border: '1px solid var(--border-color)',
                                                                    color: 'var(--text-primary)',
                                                                }}
                                                            >
                                                                <GithubIcon size={14} /> Backend Code
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>

                    {/* Next Project Seamless Navigation Bar (At bottom, sleek edge-to-edge footer banner) */}
                    {nextProject && nextProject.slug !== project.slug && (
                        <ScrollReveal className="mt-20">
                            <div className="pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <Link
                                        href="/#projects"
                                        className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-400"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        <ArrowLeft size={16} /> All Projects
                                    </Link>

                                    <Link
                                        href={`/projects/${nextProject.slug}`}
                                        className="group inline-flex items-center gap-4 text-right transition-colors"
                                    >
                                        <div>
                                            <span className="text-xs uppercase tracking-wider font-semibold block" style={{ color: 'var(--text-tertiary)' }}>
                                                Next Project →
                                            </span>
                                            <span className="text-base sm:text-lg font-bold group-hover:text-indigo-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                                                {nextProject.title}
                                            </span>
                                        </div>
                                        <span
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1"
                                            style={{
                                                backgroundColor: 'var(--bg-card)',
                                                border: '1px solid var(--border-color)',
                                                color: accentColor,
                                            }}
                                        >
                                            <ArrowRight size={18} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}

