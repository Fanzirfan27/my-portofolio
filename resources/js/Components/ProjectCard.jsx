import React from 'react';
import { Link } from '@inertiajs/react';
import { ExternalLink, Lock, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import ScrollReveal from './ScrollReveal';

export default function ProjectCard({ project, index = 0 }) {
    const categoryColors = {
        'Web & Mobile Application': { bg: 'rgba(99, 102, 241, 0.1)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.2)' },
        'Web Application': { bg: 'rgba(6, 182, 212, 0.1)', text: '#22d3ee', border: 'rgba(6, 182, 212, 0.2)' },
        'Desktop Application': { bg: 'rgba(168, 85, 247, 0.1)', text: '#a78bfa', border: 'rgba(168, 85, 247, 0.2)' },
        'Point of Sale': { bg: 'rgba(245, 158, 11, 0.1)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.2)' },
    };

    const colors = categoryColors[project.category] || categoryColors['Web Application'];
    const isPrivate = Boolean(
        project.is_private === true ||
        project.is_private === 1 ||
        project.is_private === '1' ||
        project.is_private === 'true' ||
        project.isPrivate === true
    );

    return (
        <ScrollReveal delay={index * 100}>
            <div
                className="group rounded-2xl overflow-hidden card-hover h-full flex flex-col"
                style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}
            >
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden">
                    {project.image ? (
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.bg}, var(--bg-card))` }}>
                            <div className="text-6xl font-bold opacity-10" style={{ color: colors.text }}>
                                {project.title.charAt(0)}
                            </div>
                        </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span
                            className="text-xs font-semibold px-3 py-1.5 rounded-full"
                            style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
                                border: `1px solid ${colors.border}`,
                            }}
                        >
                            {project.category}
                        </span>
                    </div>
                    {/* Status */}
                    <div className="absolute top-4 right-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                color: '#34d399',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                            }}>
                            {project.status}
                        </span>
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors"
                        style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 flex-grow"
                        style={{ color: 'var(--text-secondary)' }}>
                        {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {(project.tech || []).map((t) => (
                            <span
                                key={t}
                                className="text-xs font-medium px-2.5 py-1 rounded-lg"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Role */}
                    <p className="text-xs font-medium mb-4" style={{ color: 'var(--text-tertiary)' }}>
                        👤 {project.role}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            View Details <ArrowRight size={14} />
                        </Link>

                        {isPrivate ? (
                            <span
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg opacity-85 cursor-not-allowed select-none"
                                style={{
                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                    border: '1px solid rgba(245, 158, 11, 0.25)',
                                    color: '#fbbf24',
                                }}
                                title="Repository bersifat private"
                            >
                                <Lock size={12} className="text-amber-400" /> Private Repository 🔒
                            </span>
                        ) : (
                            <>
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-indigo-400"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        <GithubIcon size={14} /> {project.github_backend ? 'GitHub (Mobile)' : 'GitHub'}
                                    </a>
                                )}

                                {project.github_backend && (
                                    <a
                                        href={project.github_backend}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-indigo-400"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        <GithubIcon size={14} /> GitHub (API Backend)
                                    </a>
                                )}
                            </>
                        )}

                        {project.live_demo && (
                            <a
                                href={project.live_demo}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-emerald-400"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                <ExternalLink size={14} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}
