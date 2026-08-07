import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Mail, Download, Eye, MessageCircle, Code2, Terminal, Braces } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Components/Icons';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
    const [scaleState, setScaleState] = useState('sway');
    const [isHovered, setIsHovered] = useState(false);
    const [tiltAngle, setTiltAngle] = useState(0);
    
    const resetTimerRef = useRef(null);
    const libraRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!libraRef.current) return;
        const rect = libraRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const relativeX = e.clientX - centerX;
        
        // Track up to 600px left and right
        const maxDistance = 600;
        const distance = Math.min(Math.max(relativeX, -maxDistance), maxDistance);
        
        // Normalize between -1 and 1
        const normalized = distance / maxDistance;
        
        // Target tilt between -22 and 22 degrees
        const targetAngle = normalized * 22;
        
        setTiltAngle(targetAngle);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTiltAngle(0);
    };

    const handleLeftClick = () => {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        setScaleState('left-down');
        resetTimerRef.current = setTimeout(() => {
            setScaleState('sway');
        }, 4000);
    };

    const handleRightClick = () => {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        setScaleState('right-down');
        resetTimerRef.current = setTimeout(() => {
            setScaleState('sway');
        }, 4000);
    };

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        };
    }, []);

    const handleScroll = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section 
            id="home" 
            className="relative min-h-screen flex items-center overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Starry Galaxy Background */}
            <div className="absolute inset-0 hero-galaxy" />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse-glow opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent)' }} />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse-glow opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)', animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
                style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent)' }} />

            {/* Floating Elements */}
            <div className="absolute top-32 right-[15%] hidden lg:block animate-float opacity-20">
                <Code2 size={40} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div className="absolute top-[60%] left-[10%] hidden lg:block animate-float-slow opacity-15">
                <Terminal size={32} style={{ color: 'var(--color-accent-green)' }} />
            </div>
            <div className="absolute bottom-32 right-[25%] hidden lg:block animate-float-delay opacity-15">
                <Braces size={36} style={{ color: '#06b6d4' }} />
            </div>

            {/* Code Snippet Decoration */}
            <div className="absolute top-40 right-[8%] hidden xl:block opacity-20 rotate-6">
                <div className="code-block p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <span className="comment">{'// Building something amazing'}</span><br />
                    <span className="keyword">const</span> <span className="variable">developer</span> <span className="bracket">=</span> <span className="bracket">{'{'}</span><br />
                    <span className="ml-4">  <span className="function">name</span>: <span className="string">"Irfan"</span>,</span><br />
                    <span className="ml-4">  <span className="function">passion</span>: <span className="string">"code"</span></span><br />
                    <span className="bracket">{'}'}</span>;
                </div>
            </div>

            {/* Animated Libra Scales & Constellation */}
            <div ref={libraRef} className="absolute right-[5%] lg:right-[8%] top-[50%] -translate-y-1/2 w-[340px] h-[340px] lg:w-[440px] lg:h-[440px] hidden md:block opacity-50 lg:opacity-100 z-0 pointer-events-none select-none">
                <svg viewBox="0 0 300 300" className="w-full h-full libra-container">
                    {/* Constellation Lines */}
                    <g stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" strokeDasharray="3,3" fill="none">
                        <line x1="150" y1="40" x2="80" y2="110" />
                        <line x1="150" y1="40" x2="220" y2="100" />
                        <line x1="80" y1="110" x2="100" y2="180" />
                        <line x1="220" y1="100" x2="200" y2="170" />
                        <line x1="100" y1="180" x2="150" y2="220" />
                        <line x1="200" y1="170" x2="150" y2="220" />
                        <line x1="150" y1="40" x2="150" y2="220" />
                    </g>

                    {/* Libra Symbol Outline */}
                    <path d="M110,265 L190,265 M110,273 C110,255 190,255 190,273" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1" />

                    {/* Scale Stand / Base */}
                    <g stroke="currentColor" fill="none" strokeLinecap="round">
                        {/* Pillar */}
                        <line x1="150" y1="80" x2="150" y2="250" strokeWidth="4" opacity="0.7" />
                        {/* Pillar Accent Ring */}
                        <circle cx="150" cy="120" r="6" fill="var(--bg-card)" strokeWidth="2" />
                        {/* Stand Base */}
                        <path d="M110,250 C120,245 180,245 190,250" strokeWidth="6" opacity="0.8" />
                        {/* Top hanger ring */}
                        <circle cx="150" cy="65" r="8" strokeWidth="3" opacity="0.7" />
                    </g>

                    {/* Sways beam group */}
                    <g 
                        className={`scale-beam ${!isHovered ? (scaleState === 'sway' ? 'animate-sway' : scaleState === 'left-down' ? 'tilt-left' : 'tilt-right') : ''}`}
                        style={isHovered ? {
                            transform: `rotate(${tiltAngle}deg)`,
                            transformOrigin: '150px 80px',
                            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        } : {}}
                        stroke="currentColor" 
                        fill="none" 
                        strokeLinecap="round"
                    >
                        {/* Central pivot node */}
                        <circle cx="150" cy="80" r="5" fill="var(--color-accent)" strokeWidth="2" />
                        {/* Main Beam */}
                        <path d="M50,80 L250,80" strokeWidth="4" />
                        {/* Beam decorations */}
                        <circle cx="50" cy="80" r="3" fill="currentColor" />
                        <circle cx="250" cy="80" r="3" fill="currentColor" />

                        {/* Left pan assembly (sways upright) */}
                        <g 
                            className="scale-left-pan"
                            style={isHovered ? {
                                transform: `rotate(${-tiltAngle}deg)`,
                                transformOrigin: '50px 80px',
                                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            } : {}}
                        >
                            {/* Chain strings */}
                            <path d="M50,80 L20,170 M50,80 L80,170" strokeWidth="1.5" opacity="0.6" />
                            {/* Pan holder bar */}
                            <line x1="20" y1="170" x2="80" y2="170" strokeWidth="2" />
                            {/* Pan dish */}
                            <path d="M15,170 C15,190 85,190 85,170 Z" fill="rgba(99, 102, 241, 0.08)" strokeWidth="2.5" />
                            {/* Left Weight */}
                            <circle cx="50" cy="155" r="4" fill="#06b6d4" className="star-glow" />
                            {/* Interactive Click target zone */}
                            <circle 
                                cx="50" 
                                cy="170" 
                                r="35" 
                                fill="transparent" 
                                className="cursor-pointer pointer-events-auto"
                                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                                onClick={handleLeftClick}
                                onMouseEnter={handleLeftClick}
                            />
                        </g>

                        {/* Right pan assembly (sways upright) */}
                        <g 
                            className="scale-right-pan"
                            style={isHovered ? {
                                transform: `rotate(${-tiltAngle}deg)`,
                                transformOrigin: '250px 80px',
                                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            } : {}}
                        >
                            {/* Chain strings */}
                            <path d="M250,80 L220,170 M250,80 L280,170" strokeWidth="1.5" opacity="0.6" />
                            {/* Pan holder bar */}
                            <line x1="220" y1="170" x2="280" y2="170" strokeWidth="2" />
                            {/* Pan dish */}
                            <path d="M215,170 C215,190 285,190 285,170 Z" fill="rgba(99, 102, 241, 0.08)" strokeWidth="2.5" />
                            {/* Right Weight */}
                            <circle cx="250" cy="155" r="4" fill="var(--color-accent-green)" className="star-glow star-delay-1" />
                            {/* Interactive Click target zone */}
                            <circle 
                                cx="250" 
                                cy="170" 
                                r="35" 
                                fill="transparent" 
                                className="cursor-pointer pointer-events-auto"
                                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                                onClick={handleRightClick}
                                onMouseEnter={handleRightClick}
                            />
                        </g>
                    </g>

                    {/* Constellation Star Vertices */}
                    <g className="star-glow">
                        <circle cx="150" cy="40" r="5" fill="#fff" />
                    </g>
                    <g className="star-glow star-delay-1">
                        <circle cx="80" cy="110" r="4" fill="#fff" />
                    </g>
                    <g className="star-glow star-delay-2">
                        <circle cx="220" cy="100" r="4.5" fill="#fff" />
                    </g>
                    <g className="star-glow star-delay-3">
                        <circle cx="100" cy="180" r="3.5" fill="#fff" />
                    </g>
                    <g className="star-glow star-delay-1">
                        <circle cx="200" cy="170" r="3.5" fill="#fff" />
                    </g>
                    <g className="star-glow star-delay-2">
                        <circle cx="150" cy="220" r="5" fill="#fff" />
                    </g>
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="max-w-3xl">
                    {/* Greeting */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                        <span className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
                            Hello, I'm
                        </span>
                    </div>

                    {/* Name */}
                    <div className="animate-fade-in-up mt-2" style={{ animationDelay: '150ms' }}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
                            <span className="gradient-text">{personalInfo.name}</span>
                        </h1>
                    </div>

                    {/* Role Badge */}
                    <div className="animate-fade-in-up mt-4" style={{ animationDelay: '300ms' }}>
                        <span
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                            style={{
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                color: 'var(--color-accent-light)',
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {personalInfo.role}
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="animate-fade-in-up mt-6" style={{ animationDelay: '450ms' }}>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            {personalInfo.headline}
                        </h2>
                    </div>

                    {/* Description */}
                    <div className="animate-fade-in-up mt-4" style={{ animationDelay: '600ms' }}>
                        <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                            {personalInfo.description}
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="animate-fade-in-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: '750ms' }}>
                        <a
                            href="#projects"
                            onClick={(e) => handleScroll(e, 'projects')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                            }}
                        >
                            <Eye size={16} /> View My Projects
                        </a>
                        <a
                            href={personalInfo.cvUrl}
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)',
                            }}
                        >
                            <Download size={16} /> Download CV
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => handleScroll(e, 'contact')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: 'transparent',
                                color: 'var(--color-accent-light)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                            }}
                        >
                            <MessageCircle size={16} /> Contact Me
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="animate-fade-in-up mt-8 flex items-center gap-3" style={{ animationDelay: '900ms' }}>
                        <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                            Find me on
                        </span>
                        <div className="flex gap-2">
                            <a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-indigo-400"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                }}
                                aria-label="GitHub"
                            >
                                <GithubIcon size={16} />
                            </a>
                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-indigo-400"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                }}
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon size={16} />
                            </a>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:text-indigo-400"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                }}
                                aria-label="Email"
                            >
                                <Mail size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
                style={{ animationDelay: '1200ms' }}>
                <span className="text-xs font-medium tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                    Scroll to explore
                </span>
                <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
                    style={{ border: '2px solid var(--border-color)' }}>
                    <div className="w-1 h-2.5 rounded-full animate-scroll-indicator"
                        style={{ backgroundColor: 'var(--color-accent)' }} />
                </div>
            </div>
        </section>
    );
}
