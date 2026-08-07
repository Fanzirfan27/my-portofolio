import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Download, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { navLinks, personalInfo } from '../data/portfolioData';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { url } = usePage();

    const isHome = url === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            if (!isHome) return;

            // Determine active section
            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const handleNavClick = (e, href) => {
        if (isHome && href.startsWith('#')) {
            e.preventDefault();
            const id = href.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
            setIsMobileOpen(false);
        } else if (!isHome && href.startsWith('#')) {
            // Navigate to home with hash
            e.preventDefault();
            window.location.href = '/' + href;
        }
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    backgroundColor: isScrolled ? 'var(--bg-navbar)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
                    borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
                    boxShadow: isScrolled ? '0 4px 20px var(--shadow-color)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-18">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-xl font-bold gradient-text">{personalInfo.shortName}</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const sectionId = link.href.replace('#', '');
                                const isActive = isHome && activeSection === sectionId;
                                return (
                                    <a
                                        key={link.name}
                                        href={isHome ? link.href : `/${link.href}`}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-[var(--bg-card)]"
                                        style={{
                                            color: isActive ? 'var(--color-accent)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                                                style={{ backgroundColor: 'var(--color-accent)' }} />
                                        )}
                                    </a>
                                );
                            })}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            <ThemeToggle />
                            <a
                                href={personalInfo.cvUrl}
                                download
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                                }}
                            >
                                <Download size={16} /> Download CV
                            </a>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex lg:hidden items-center gap-3">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                className={`p-2 rounded-xl transition-colors ${isMobileOpen ? 'hamburger-active' : ''}`}
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                }}
                                aria-label="Toggle mobile menu"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <span className="hamburger-line" />
                                    <span className="hamburger-line" />
                                    <span className="hamburger-line" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
                    isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
                {/* Menu Panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] p-6 pt-24 transition-transform duration-300 ease-out ${
                        isMobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderLeft: '1px solid var(--border-color)',
                    }}
                >
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link, i) => (
                            <a
                                key={link.name}
                                href={isHome ? link.href : `/${link.href}`}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="px-4 py-3 rounded-xl text-base font-medium transition-all hover:bg-[var(--bg-card)]"
                                style={{
                                    color: 'var(--text-primary)',
                                    animationDelay: `${i * 50}ms`,
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                        <a
                            href={personalInfo.cvUrl}
                            download
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                            }}
                        >
                            <Download size={16} /> Download CV
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
