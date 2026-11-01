import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft, Save, Loader2, ImageIcon, X, Plus, FolderOpen,
    Code2, Globe, ExternalLink, FileText, Lightbulb, AlertTriangle, ListChecks
} from 'lucide-react';
import { GithubIcon } from '../../Components/Icons';

export default function ProjectForm({ project }) {
    const isEdit = !!project;

    const [form, setForm] = useState({
        title: project?.title || '',
        category: project?.category || '',
        description: project?.description || '',
        image: project?.image || '',
        tech: project?.tech ? (Array.isArray(project.tech) ? project.tech.join(', ') : project.tech) : '',
        role: project?.role || '',
        status: project?.status || 'Completed',
        year: project?.year || new Date().getFullYear().toString(),
        duration: project?.duration || '',
        is_private: !!(project?.is_private),
        github: project?.github || '',
        github_backend: project?.github_backend || '',
        live_demo: project?.live_demo || '',
        overview: project?.overview || '',
        problem: project?.problem || '',
        solution: project?.solution || '',
        features: project?.features ? (Array.isArray(project.features) ? project.features.join('\n') : project.features) : '',
        sort_order: project?.sort_order !== undefined && project?.sort_order !== null ? project.sort_order : 0,
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(project?.image || null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === 'is_private') {
                formData.append(key, value ? '1' : '0');
            } else if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (imageFile) {
            formData.append('image_file', imageFile);
        }

        const url = isEdit ? `/admin/projects/${project.id}` : '/admin/projects';

        router.post(url, formData, {
            forceFormData: true,
            onSuccess: () => setProcessing(false),
            onError: (errs) => {
                setErrors(errs);
                setProcessing(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        });
    };

    const categories = Array.from(new Set([
        'Web Application',
        'Web & Mobile Application',
        'Mobile Application',
        'Desktop Application',
        'Point of Sale',
        'Healthcare Tech',
        'Enterprise System',
        form.category,
    ].filter(Boolean)));

    const InputField = ({ label, icon: Icon, field, type = 'text', placeholder, required, ...props }) => (
        <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                {Icon && <Icon size={16} className="w-4 h-4" style={{ color: '#6366f1' }} />}
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: errors[field] ? '1px solid #ef4444' : '1px solid rgba(99, 102, 241, 0.15)',
                    color: '#f1f5f9',
                }}
                onFocus={(e) => {
                    if (!errors[field]) e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                    if (!errors[field]) e.target.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                    e.target.style.boxShadow = 'none';
                }}
                {...props}
            />
            {errors[field] && (
                <p className="mt-1 text-xs text-red-400">{errors[field]}</p>
            )}
        </div>
    );

    const TextArea = ({ label, icon: Icon, field, placeholder, rows = 3, required }) => (
        <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                {Icon && <Icon className="w-4 h-4" style={{ color: '#6366f1' }} />}
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            <textarea
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: errors[field] ? '1px solid #ef4444' : '1px solid rgba(99, 102, 241, 0.15)',
                    color: '#f1f5f9',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                    e.target.style.boxShadow = 'none';
                }}
            />
            {errors[field] && (
                <p className="mt-1 text-xs text-red-400">{errors[field]}</p>
            )}
        </div>
    );

    return (
        <>
            <Head title={isEdit ? `Edit: ${project.title}` : 'Tambah Project'} />
            <div className="min-h-screen" style={{ background: '#0a0e1a' }}>
                {/* Top bar */}
                <div className="sticky top-0 z-30 border-b"
                    style={{
                        background: 'rgba(10, 14, 26, 0.9)',
                        backdropFilter: 'blur(16px)',
                        borderColor: 'rgba(99, 102, 241, 0.1)',
                    }}>
                    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin"
                                className="p-2 rounded-lg transition-colors"
                                style={{ color: '#64748b' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                                    e.currentTarget.style.color = '#a5b4fc';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#64748b';
                                }}>
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-bold text-white">
                                    {isEdit ? 'Edit Project' : 'Tambah Project Baru'}
                                </h1>
                                <p className="text-xs" style={{ color: '#64748b' }}>
                                    {isEdit ? project.title : 'Isi detail project baru'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                            style={{
                                background: processing
                                    ? 'rgba(99, 102, 241, 0.5)'
                                    : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                boxShadow: processing ? 'none' : '0 8px 24px rgba(99, 102, 241, 0.3)',
                                cursor: processing ? 'not-allowed' : 'pointer',
                            }}>
                            {processing ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                            ) : (
                                <><Save className="w-4 h-4" /> Simpan</>
                            )}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-6 py-8">
                    {/* Error Banner */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 p-4 rounded-xl border flex items-start gap-3"
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderColor: 'rgba(239, 68, 68, 0.3)',
                                color: '#f87171',
                            }}>
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold mb-1">Gagal menyimpan project! Mohon periksa isian form:</p>
                                <ul className="list-disc list-inside text-xs space-y-0.5 opacity-90">
                                    {Object.entries(errors).map(([key, msg]) => (
                                        <li key={key}>
                                            <strong className="capitalize">{key.replace('_', ' ')}</strong>: {msg}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main content - Left column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Info */}
                            <div className="rounded-xl p-6 border"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    borderColor: 'rgba(99, 102, 241, 0.1)',
                                }}>
                                <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                                    <FolderOpen className="w-4 h-4" style={{ color: '#6366f1' }} />
                                    Informasi Dasar
                                </h3>
                                <div className="space-y-4">
                                    <InputField label="Judul Project" icon={FileText} field="title" placeholder="Nama project..." required />
                                    <TextArea label="Deskripsi Singkat" icon={FileText} field="description" placeholder="Deskripsi singkat project..." rows={2} required />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                                                <Globe className="w-4 h-4" style={{ color: '#6366f1' }} />
                                                Kategori <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                value={form.category}
                                                onChange={(e) => handleChange('category', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl text-sm outline-none cursor-pointer"
                                                style={{
                                                    background: 'rgba(30, 41, 59, 0.5)',
                                                    border: errors.category ? '1px solid #ef4444' : '1px solid rgba(99, 102, 241, 0.15)',
                                                    color: '#f1f5f9',
                                                }}>
                                                <option value="">Pilih kategori</option>
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            {errors.category && (
                                                <p className="mt-1 text-xs text-red-400">{errors.category}</p>
                                            )}
                                        </div>
                                        <InputField label="Role" icon={Code2} field="role" placeholder="Fullstack Developer" />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                                                Status
                                            </label>
                                            <select
                                                value={form.status}
                                                onChange={(e) => handleChange('status', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl text-sm outline-none cursor-pointer"
                                                style={{
                                                    background: 'rgba(30, 41, 59, 0.5)',
                                                    border: '1px solid rgba(99, 102, 241, 0.15)',
                                                    color: '#f1f5f9',
                                                }}>
                                                <option value="Completed">Completed</option>
                                                <option value="In Progress">In Progress</option>
                                            </select>
                                        </div>
                                        <InputField label="Tahun" field="year" placeholder="2025" />
                                        <InputField label="Durasi" field="duration" placeholder="3 Bulan" />
                                    </div>
                                </div>
                            </div>

                            {/* Detail */}
                            <div className="rounded-xl p-6 border"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    borderColor: 'rgba(99, 102, 241, 0.1)',
                                }}>
                                <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4" style={{ color: '#f59e0b' }} />
                                    Detail Project
                                </h3>
                                <div className="space-y-4">
                                    <TextArea label="Overview" icon={FileText} field="overview"
                                        placeholder="Deskripsi lengkap tentang project..." rows={4} />
                                    <TextArea label="Problem" icon={AlertTriangle} field="problem"
                                        placeholder="Masalah yang diselesaikan..." rows={3} />
                                    <TextArea label="Solution" icon={Lightbulb} field="solution"
                                        placeholder="Solusi yang diterapkan..." rows={3} />
                                </div>
                            </div>

                            {/* Tech & Features */}
                            <div className="rounded-xl p-6 border"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    borderColor: 'rgba(99, 102, 241, 0.1)',
                                }}>
                                <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
                                    <Code2 className="w-4 h-4" style={{ color: '#06b6d4' }} />
                                    Tech Stack & Features
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <InputField label="Tech Stack" icon={Code2} field="tech"
                                            placeholder="Laravel, MySQL, Kotlin, REST API (pisahkan dengan koma)" />
                                        {form.tech && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {String(form.tech).split(',').map((t, i) => t.trim() && (
                                                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg"
                                                        style={{
                                                            background: 'rgba(99, 102, 241, 0.1)',
                                                            color: '#a5b4fc',
                                                            border: '1px solid rgba(99, 102, 241, 0.2)',
                                                        }}>
                                                        {t.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <TextArea label="Features (satu per baris)" icon={ListChecks} field="features"
                                        placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3" rows={5} />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right column */}
                        <div className="space-y-6">
                            {/* Image */}
                            <div className="rounded-xl p-6 border"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    borderColor: 'rgba(99, 102, 241, 0.1)',
                                }}>
                                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" style={{ color: '#6366f1' }} />
                                    Project Image
                                </h3>

                                {imagePreview ? (
                                    <div className="relative mb-3">
                                        <img src={imagePreview} alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                            style={{ border: '1px solid rgba(99, 102, 241, 0.15)' }} />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview(null);
                                                handleChange('image', '');
                                            }}
                                            className="absolute top-2 right-2 p-1.5 rounded-lg"
                                            style={{
                                                background: 'rgba(0, 0, 0, 0.6)',
                                                backdropFilter: 'blur(8px)',
                                            }}>
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer transition-all duration-200 mb-3"
                                        style={{
                                            border: '2px dashed rgba(99, 102, 241, 0.2)',
                                            background: 'rgba(30, 41, 59, 0.3)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                                            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.3)';
                                        }}>
                                        <ImageIcon className="w-8 h-8 mb-2" style={{ color: '#475569' }} />
                                        <span className="text-xs" style={{ color: '#64748b' }}>
                                            Klik untuk upload gambar
                                        </span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                )}

                                <InputField label="Atau URL Gambar" field="image" placeholder="/projects/image.png" />
                            </div>

                            {/* Links */}
                            <div className="rounded-xl p-6 border"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    borderColor: 'rgba(99, 102, 241, 0.1)',
                                }}>
                                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" style={{ color: '#10b981' }} />
                                    Links
                                </h3>
                                <div className="space-y-4">
                                    <InputField label="GitHub" icon={GithubIcon} field="github" placeholder="https://github.com/..." />
                                    <InputField label="GitHub Backend" icon={GithubIcon} field="github_backend" placeholder="https://github.com/..." />
                                    <InputField label="Live Demo" icon={ExternalLink} field="live_demo" placeholder="https://..." />
                                </div>
                            </div>

                            {/* Settings */}
                            <div className="rounded-xl p-6 border"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    borderColor: 'rgba(99, 102, 241, 0.1)',
                                }}>
                                <h3 className="text-sm font-semibold text-white mb-4">Settings</h3>
                                <div className="space-y-4">
                                    <InputField label="Sort Order" field="sort_order" type="number" placeholder="1" />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-sm font-medium" style={{ color: '#cbd5e1' }}>
                                                Private Project
                                            </label>
                                            {errors.is_private && (
                                                <p className="text-xs text-red-400 mt-0.5">{errors.is_private}</p>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleChange('is_private', !form.is_private)}
                                            className="relative w-11 h-6 rounded-full transition-all duration-300"
                                            style={{
                                                background: form.is_private
                                                    ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                                                    : 'rgba(30, 41, 59, 0.8)',
                                                border: '1px solid',
                                                borderColor: form.is_private ? '#6366f1' : 'rgba(99, 102, 241, 0.2)',
                                            }}>
                                            <span className="absolute top-0.5 transition-all duration-300 w-5 h-5 rounded-full bg-white shadow-md"
                                                style={{
                                                    left: form.is_private ? 'calc(100% - 22px)' : '2px',
                                                }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
