import React from 'react';

export default function SkillCard({ skill, delay = 0 }) {
    return (
        <div
            className="group flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl card-hover cursor-default w-full h-full"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
            }}
        >
            <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center p-2 sm:p-2.5 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                }}
            >
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                        // Fallback icon style
                        e.target.style.display = 'none';
                    }}
                />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center" style={{ color: 'var(--text-primary)' }}>
                {skill.name}
            </span>
        </div>
    );
}
