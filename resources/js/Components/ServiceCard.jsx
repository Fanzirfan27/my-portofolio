import React from 'react';
import { Globe, Smartphone, Server, Cpu } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const iconMap = {
    Globe,
    Smartphone,
    Server,
    Cpu,
};

export default function ServiceCard({ service, index = 0 }) {
    const IconComponent = iconMap[service.icon] || Globe;

    const gradients = [
        { from: '#6366f1', to: '#818cf8' },
        { from: '#06b6d4', to: '#22d3ee' },
        { from: '#10b981', to: '#34d399' },
        { from: '#f59e0b', to: '#fbbf24' },
    ];

    const gradient = gradients[index % gradients.length];

    return (
        <ScrollReveal delay={index * 100}>
            <div
                className="group p-6 rounded-2xl card-hover h-full"
                style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                }}
            >
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                        background: `linear-gradient(135deg, ${gradient.from}20, ${gradient.to}20)`,
                        border: `1px solid ${gradient.from}30`,
                    }}
                >
                    <IconComponent size={24} style={{ color: gradient.from }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                </p>
            </div>
        </ScrollReveal>
    );
}
