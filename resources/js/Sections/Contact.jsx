import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Components/Icons';
import ScrollReveal from '../Components/ScrollReveal';
import SectionTitle from '../Components/SectionTitle';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!form.subject.trim()) newErrors.subject = 'Subject is required';
        if (!form.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);

        // Simulate sending
        setTimeout(() => {
            setIsSubmitting(false);
            setForm({ name: '', email: '', subject: '', message: '' });
            setToast({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
            setTimeout(() => setToast(null), 4000);
        }, 1500);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const contactItems = [
        { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
        { icon: Phone, label: 'WhatsApp', value: personalInfo.whatsapp, href: `https://wa.me/${personalInfo.whatsapp}` },
        { icon: 'linkedin', label: 'LinkedIn', value: 'irfannuril', href: personalInfo.linkedin },
        { icon: 'github', label: 'GitHub', value: 'Fanzirfan27', href: personalInfo.github },
        { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
    ];

    const renderIcon = (icon) => {
        if (icon === 'github') return <GithubIcon size={20} />;
        if (icon === 'linkedin') return <LinkedinIcon size={20} />;
        const Icon = icon;
        return <Icon size={20} />;
    };

    return (
        <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Let's Build Something Great Together"
                    subtitle="Get In Touch"
                />

                <p className="text-center text-base mb-12 -mt-6 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Jika Anda memiliki project, peluang kerja sama, atau ingin berdiskusi mengenai pengembangan aplikasi, jangan ragu untuk menghubungi saya.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-4">
                        {contactItems.map((item, i) => (
                            <ScrollReveal key={item.label} delay={i * 80}>
                                <div
                                    className="flex items-center gap-4 p-4 rounded-xl card-hover"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                    }}
                                >
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{
                                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                            color: 'var(--color-accent)',
                                        }}>
                                        {renderIcon(item.icon)}
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium block" style={{ color: 'var(--text-tertiary)' }}>
                                            {item.label}
                                        </span>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                                rel="noreferrer"
                                                className="text-sm font-semibold hover:text-indigo-400 transition-colors"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <ScrollReveal className="lg:col-span-3" direction="right">
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 sm:p-8 rounded-2xl"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                            }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                {/* Name */}
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="form-input"
                                    />
                                    {errors.name && (
                                        <span className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                            <AlertCircle size={12} /> {errors.name}
                                        </span>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="form-input"
                                    />
                                    {errors.email && (
                                        <span className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                            <AlertCircle size={12} /> {errors.email}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="mb-4">
                                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Subject of your message"
                                    className="form-input"
                                />
                                {errors.subject && (
                                    <span className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.subject}
                                    </span>
                                )}
                            </div>

                            {/* Message */}
                            <div className="mb-6">
                                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-primary)' }}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows={5}
                                    className="form-input resize-none"
                                />
                                {errors.message && (
                                    <span className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </ScrollReveal>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
                    <span className="flex items-center gap-2">
                        <CheckCircle size={16} /> {toast.message}
                    </span>
                </div>
            )}
        </section>
    );
}
