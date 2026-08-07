import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function SectionTitle({ title, subtitle, align = 'center', light = false }) {
    return (
        <ScrollReveal className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
            {subtitle && (
                <span className="inline-block text-sm font-semibold tracking-wider uppercase mb-3"
                    style={{ color: 'var(--color-accent)' }}>
                    {subtitle}
                </span>
            )}
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                light ? 'text-white' : ''
            }`}
                style={!light ? { color: 'var(--text-primary)' } : {}}>
                {title}
            </h2>
            <div className={`mt-4 flex ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
                <div className="h-1 w-16 rounded-full" style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-green))' }} />
            </div>
        </ScrollReveal>
    );
}
