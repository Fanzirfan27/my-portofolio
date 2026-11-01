import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #151d3b 50%, #0f1629 100%)' }}>

                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-8"
                        style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
                    <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-indigo-400 opacity-30 animate-pulse-glow" />
                    <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-25 animate-pulse-glow delay-300" />
                    <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-emerald-400 opacity-20 animate-pulse-glow delay-500" />
                </div>

                {/* Login card */}
                <div className="relative w-full max-w-md mx-4 animate-fade-in-up">
                    {/* Glow effect behind card */}
                    <div className="absolute -inset-1 rounded-2xl opacity-20 blur-xl"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }} />

                    <div className="relative rounded-2xl p-8 border"
                        style={{
                            background: 'rgba(15, 22, 41, 0.8)',
                            backdropFilter: 'blur(24px)',
                            borderColor: 'rgba(99, 102, 241, 0.15)',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                        }}>

                        {/* Logo / Brand */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                                }}>
                                <Lock className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
                            <p className="text-sm" style={{ color: '#94a3b8' }}>
                                Masuk untuk mengelola project portfolio
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                        style={{ color: '#64748b' }} />
                                    <input
                                        id="login-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@portofolio.com"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                                        style={{
                                            background: 'rgba(30, 41, 59, 0.5)',
                                            border: errors.email ? '1px solid #ef4444' : '1px solid rgba(99, 102, 241, 0.2)',
                                            color: '#f1f5f9',
                                        }}
                                        onFocus={(e) => {
                                            if (!errors.email) e.target.style.borderColor = '#6366f1';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.email) e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                                        style={{ color: '#64748b' }} />
                                    <input
                                        id="login-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                                        style={{
                                            background: 'rgba(30, 41, 59, 0.5)',
                                            border: errors.password ? '1px solid #ef4444' : '1px solid rgba(99, 102, 241, 0.2)',
                                            color: '#f1f5f9',
                                        }}
                                        onFocus={(e) => {
                                            if (!errors.password) e.target.style.borderColor = '#6366f1';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.password) e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        {showPassword
                                            ? <EyeOff className="w-4 h-4" style={{ color: '#64748b' }} />
                                            : <Eye className="w-4 h-4" style={{ color: '#64748b' }} />
                                        }
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-indigo-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm" style={{ color: '#94a3b8' }}>
                                    Ingat saya
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                id="login-submit"
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2"
                                style={{
                                    background: processing
                                        ? 'rgba(99, 102, 241, 0.5)'
                                        : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                    boxShadow: processing ? 'none' : '0 8px 24px rgba(99, 102, 241, 0.3)',
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    if (!processing) {
                                        e.target.style.transform = 'translateY(-1px)';
                                        e.target.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.4)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)';
                                }}
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Masuk'
                                )}
                            </button>
                        </form>

                        {/* Footer hint */}
                        <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: 'rgba(99, 102, 241, 0.1)' }}>
                            <p className="text-xs" style={{ color: '#475569' }}>
                                Portfolio Admin Panel — CMS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
