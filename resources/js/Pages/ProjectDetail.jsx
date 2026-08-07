import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, CheckCircle2,
    ExternalLink, Lock, Layers, AlertTriangle, Lightbulb, ListChecks
} from 'lucide-react';
import { GithubIcon } from '../Components/Icons';
import MainLayout from '../Layouts/MainLayout';
import ScrollReveal from '../Components/ScrollReveal';
import { projects } from '../data/portfolioData';

export default function ProjectDetail({ slug }) {
    const project = projects.find((p) => p.slug === slug);
    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

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
        'AI / Machine Learning': '#34d399',
        'Point of Sale': '#fbbf24',
    };

    const accentColor = categoryColors[project.category] || '#818cf8';

    return (
        <MainLayout>
            <Head title={`${project.title} — Project Detail`} />

            {/* Hero Banner */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 opacity-30"
                    style={{ background: `radial-gradient(ellipse at 30% 50%, ${accentColor}20, transparent 70%)` }} />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <ScrollReveal>
                        <Link
                            href="/#projects"
                            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:text-indigo-400"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <ArrowLeft size={16} /> Back to Projects
                        </Link>
                    </ScrollReveal>

                    {/* Category & Status */}
                    <ScrollReveal delay={100}>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                                style={{
                                    backgroundColor: `${accentColor}15`,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}30`,
                                }}>
                                {project.category}
                            </span>
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                style={{
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    color: '#34d399',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                }}>
                                {project.status}
                            </span>
                        </div>
                    </ScrollReveal>

                    {/* Title */}
                    <ScrollReveal delay={200}>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {project.title}
                        </h1>
                    </ScrollReveal>

                    {/* Meta Info */}
                    <ScrollReveal delay={300}>
                        <div className="flex flex-wrap items-center gap-4 mt-5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} style={{ color: accentColor }} /> {project.year}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} style={{ color: accentColor }} /> {project.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User size={14} style={{ color: accentColor }} /> {project.role}
                            </span>
                        </div>
                    </ScrollReveal>

                    {/* Actions */}
                    <ScrollReveal delay={400}>
                        <div className="flex flex-wrap items-center gap-3 mt-6">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    <GithubIcon size={16} /> {project.githubBackend ? 'GitHub (Mobile)' : 'View on GitHub'}
                                </a>
                            )}
                            {project.githubBackend && (
                                <a
                                    href={project.githubBackend}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    <GithubIcon size={16} /> GitHub (API Backend)
                                </a>
                            )}
                            {project.liveDemo && (
                                <a
                                    href={project.liveDemo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                                    style={{
                                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                                    }}
                                >
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            )}
                            {project.isPrivate && !project.github && (
                                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-tertiary)',
                                    }}>
                                    <Lock size={14} /> Private Repository 🔒
                                </span>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content */}
            <section className="pb-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Overview */}
                            <ScrollReveal>
                                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <h2 className="flex items-center gap-2 text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                                        <Layers size={20} style={{ color: accentColor }} /> Overview
                                    </h2>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {project.overview}
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Problem */}
                            <ScrollReveal delay={100}>
                                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <h2 className="flex items-center gap-2 text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                                        <AlertTriangle size={20} style={{ color: '#f59e0b' }} /> Problem
                                    </h2>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {project.problem}
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Solution */}
                            <ScrollReveal delay={200}>
                                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <h2 className="flex items-center gap-2 text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                                        <Lightbulb size={20} style={{ color: '#34d399' }} /> Solution
                                    </h2>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {project.solution}
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Key Features */}
                            <ScrollReveal delay={300}>
                                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <h2 className="flex items-center gap-2 text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                        <ListChecks size={20} style={{ color: accentColor }} /> Key Features
                                    </h2>
                                    <ul className="space-y-3">
                                        {project.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Tech Stack */}
                            <ScrollReveal direction="right">
                                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="text-xs font-medium px-3 py-1.5 rounded-lg"
                                                style={{
                                                    backgroundColor: `${accentColor}10`,
                                                    color: accentColor,
                                                    border: `1px solid ${accentColor}25`,
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Project Info */}
                            <ScrollReveal direction="right" delay={100}>
                                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                                        Project Info
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Role', value: project.role },
                                            { label: 'Duration', value: project.duration },
                                            { label: 'Year', value: project.year },
                                            { label: 'Status', value: project.status },
                                            { label: 'Category', value: project.category },
                                        ].map((item) => (
                                            <div key={item.label} className="flex justify-between text-sm">
                                                <span style={{ color: 'var(--text-tertiary)' }}>{item.label}</span>
                                                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Project Preview */}
                            <ScrollReveal direction="right" delay={200}>
                                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                                        Project Preview
                                    </h3>
                                    {project.image ? (
                                        <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                                            <img 
                                                src={project.image} 
                                                alt={`${project.title} Preview`} 
                                                className="w-full aspect-video object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video rounded-xl flex items-center justify-center"
                                            style={{
                                                background: `linear-gradient(135deg, ${accentColor}10, var(--bg-secondary))`,
                                                border: '1px dashed var(--border-color)',
                                            }}>
                                            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                                Coming Soon
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Next Project */}
                    {nextProject && nextProject.slug !== project.slug && (
                        <ScrollReveal className="mt-16">
                            <div className="pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
                                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                                    Next Project
                                </span>
                                <Link
                                    href={`/projects/${nextProject.slug}`}
                                    className="group flex items-center justify-between mt-3 p-6 rounded-2xl transition-all hover:scale-[1.01]"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                    }}
                                >
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors"
                                            style={{ color: 'var(--text-primary)' }}>
                                            {nextProject.title}
                                        </h3>
                                        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                                            {nextProject.category}
                                        </p>
                                    </div>
                                    <ArrowRight size={24} className="text-indigo-400 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
