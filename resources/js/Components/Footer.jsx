import React from 'react';
import { Link } from '@inertiajs/react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Footer() {
    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer style={{ backgroundColor: 'var(--bg-footer)', borderTop: '1px solid var(--border-color)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <span className="text-2xl font-bold gradient-text">{personalInfo.shortName}</span>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {personalInfo.role}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                            Building digital solutions through code. Always learning, always growing.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                            Navigation
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-sm py-1 transition-colors hover:text-indigo-400"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            <a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:text-indigo-400"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                }}
                                aria-label="GitHub"
                            >
                                <GithubIcon size={18} />
                            </a>
                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:text-indigo-400"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                }}
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon size={18} />
                            </a>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:text-indigo-400"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                }}
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid var(--border-color)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                    </p>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                        Built with <Heart size={12} className="text-red-400" /> using Laravel & React
                    </p>
                </div>
            </div>
        </footer>
    );
}
