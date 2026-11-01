import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Plus, Pencil, Trash2, LogOut, FolderOpen, ExternalLink,
    Search, Eye, ChevronDown, X, LayoutDashboard, Lock, Globe
} from 'lucide-react';
import { GithubIcon } from '../../Components/Icons';

export default function Dashboard({ projects = [] }) {
    const { auth = {}, flash = {} } = usePage().props;
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    const safeProjects = projects || [];
    const categories = [...new Set(safeProjects.map(p => p.category).filter(Boolean))];

    const filtered = safeProjects.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = !filterCategory || p.category === filterCategory;
        return matchSearch && matchCategory;
    });

    const handleDelete = (id) => {
        router.delete(`/admin/projects/${id}`, {
            preserveScroll: true,
            onSuccess: () => setShowDeleteModal(null),
        });
    };

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const statusColor = (status) => {
        switch (status) {
            case 'Completed': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' };
            case 'In Progress': return { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' };
            default: return { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' };
        }
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen" style={{ background: '#0a0e1a' }}>
                {/* Sidebar */}
                <aside className="fixed left-0 top-0 bottom-0 w-64 border-r flex flex-col z-30"
                    style={{
                        background: 'rgba(15, 22, 41, 0.95)',
                        backdropFilter: 'blur(16px)',
                        borderColor: 'rgba(99, 102, 241, 0.1)',
                    }}>
                    {/* Brand */}
                    <div className="p-6 border-b" style={{ borderColor: 'rgba(99, 102, 241, 0.1)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
                                }}>
                                <LayoutDashboard className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-white text-sm">Admin Panel</h2>
                                <p className="text-xs" style={{ color: '#64748b' }}>Project CMS</p>
                            </div>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
                            Menu
                        </p>
                        <a href="/admin"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                color: '#818cf8',
                                border: '1px solid rgba(99, 102, 241, 0.15)',
                            }}>
                            <FolderOpen className="w-4 h-4" />
                            Projects
                            <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
                                style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>
                                {safeProjects.length}
                            </span>
                        </a>
                    </nav>

                    {/* User */}
                    <div className="p-4 border-t" style={{ borderColor: 'rgba(99, 102, 241, 0.1)' }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}>
                                {auth?.user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{auth?.user?.name || 'Admin'}</p>
                                <p className="text-xs truncate" style={{ color: '#64748b' }}>{auth?.user?.email || 'admin@portofolio.com'}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#f87171',
                                border: '1px solid rgba(239, 68, 68, 0.15)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}>
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="ml-64 p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Project Management</h1>
                            <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                                Kelola semua project portfolio kamu
                            </p>
                        </div>
                        <Link href="/admin/projects/create"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)';
                            }}>
                            <Plus className="w-4 h-4" />
                            Tambah Project
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#64748b' }} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari project..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    border: '1px solid rgba(99, 102, 241, 0.15)',
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
                        </div>
                        <div className="relative">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="appearance-none px-4 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 cursor-pointer"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    border: '1px solid rgba(99, 102, 241, 0.15)',
                                    color: '#f1f5f9',
                                }}>
                                <option value="">Semua Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                                style={{ color: '#64748b' }} />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { label: 'Total Projects', value: safeProjects.length, color: '#6366f1', icon: FolderOpen },
                            { label: 'Completed', value: safeProjects.filter(p => p.status === 'Completed').length, color: '#10b981', icon: Eye },
                            { label: 'In Progress', value: safeProjects.filter(p => p.status === 'In Progress').length, color: '#f59e0b', icon: Globe },
                        ].map((stat, i) => (
                            <div key={i} className="rounded-xl p-5 border transition-all duration-300"
                                style={{
                                    background: 'rgba(15, 22, 41, 0.6)',
                                    borderColor: 'rgba(99, 102, 241, 0.1)',
                                }}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ background: `${stat.color}15` }}>
                                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                                    </div>
                                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                                </div>
                                <p className="text-sm" style={{ color: '#64748b' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="rounded-xl border overflow-hidden"
                        style={{
                            background: 'rgba(15, 22, 41, 0.6)',
                            borderColor: 'rgba(99, 102, 241, 0.1)',
                        }}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                                        {['#', 'Project', 'Category', 'Status', 'Year', 'Links', 'Actions'].map(header => (
                                            <th key={header} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                                style={{ color: '#64748b' }}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-5 py-16 text-center">
                                                <FolderOpen className="w-12 h-12 mx-auto mb-3" style={{ color: '#1e293b' }} />
                                                <p className="text-sm" style={{ color: '#475569' }}>
                                                    {search || filterCategory ? 'Tidak ada project yang sesuai filter' : 'Belum ada project'}
                                                </p>
                                            </td>
                                        </tr>
                                    ) : filtered.map((project, i) => {
                                        const sc = statusColor(project.status);
                                        return (
                                            <tr key={project.id}
                                                className="transition-colors duration-150"
                                                style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.06)' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.03)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                                <td className="px-5 py-4 text-sm" style={{ color: '#475569' }}>
                                                    {project.sort_order || i + 1}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {project.image ? (
                                                            <img src={project.image} alt={project.title}
                                                                className="w-10 h-10 rounded-lg object-cover"
                                                                style={{ border: '1px solid rgba(99, 102, 241, 0.15)' }} />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                                style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                                                                <FolderOpen className="w-5 h-5" style={{ color: '#6366f1' }} />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-sm font-medium text-white">{project.title}</p>
                                                            <p className="text-xs mt-0.5 truncate max-w-[200px]" style={{ color: '#64748b' }}>
                                                                {project.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="text-xs px-2.5 py-1 rounded-lg"
                                                        style={{
                                                            background: 'rgba(99, 102, 241, 0.1)',
                                                            color: '#a5b4fc',
                                                            border: '1px solid rgba(99, 102, 241, 0.15)',
                                                        }}>
                                                        {project.category}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="text-xs px-2.5 py-1 rounded-lg"
                                                        style={{
                                                            background: sc.bg,
                                                            color: sc.text,
                                                            border: `1px solid ${sc.border}`,
                                                        }}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-sm" style={{ color: '#94a3b8' }}>
                                                    {project.year}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {project.github && (
                                                            <a href={project.github} target="_blank" rel="noreferrer"
                                                                className="p-1.5 rounded-lg transition-colors"
                                                                style={{ color: '#64748b' }}
                                                                onMouseEnter={(e) => e.currentTarget.style.color = '#f1f5f9'}
                                                                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                                                                <GithubIcon size={16} />
                                                            </a>
                                                        )}
                                                        {project.live_demo && (
                                                            <a href={project.live_demo} target="_blank" rel="noreferrer"
                                                                className="p-1.5 rounded-lg transition-colors"
                                                                style={{ color: '#64748b' }}
                                                                onMouseEnter={(e) => e.currentTarget.style.color = '#f1f5f9'}
                                                                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {Boolean(project.is_private === true || project.is_private === 1 || project.is_private === '1' || project.is_private === 'true') && (
                                                            <span title="Private Repository" className="inline-flex items-center text-amber-400 p-1">
                                                                <Lock className="w-3.5 h-3.5" />
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Link href={`/admin/projects/${project.id}/edit`}
                                                            className="p-2 rounded-lg transition-all duration-200"
                                                            style={{
                                                                background: 'rgba(99, 102, 241, 0.1)',
                                                                color: '#818cf8',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                                                            }}>
                                                            <Pencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => setShowDeleteModal(project)}
                                                            className="p-2 rounded-lg transition-all duration-200"
                                                            style={{
                                                                background: 'rgba(239, 68, 68, 0.1)',
                                                                color: '#f87171',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                                            }}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setShowDeleteModal(null)}>
                        <div className="rounded-2xl p-6 w-full max-w-md mx-4 animate-fade-in-up"
                            style={{
                                background: 'rgba(15, 22, 41, 0.95)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                            }}
                            onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-white">Hapus Project</h3>
                                <button onClick={() => setShowDeleteModal(null)}
                                    className="p-1 rounded-lg hover:bg-white/5 transition-colors">
                                    <X className="w-5 h-5" style={{ color: '#64748b' }} />
                                </button>
                            </div>
                            <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
                                Yakin ingin menghapus <span className="text-white font-medium">"{showDeleteModal.title}"</span>?
                                Aksi ini tidak bisa dibatalkan.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setShowDeleteModal(null)}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                                    style={{
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        color: '#a5b4fc',
                                        border: '1px solid rgba(99, 102, 241, 0.15)',
                                    }}>
                                    Batal
                                </button>
                                <button onClick={() => handleDelete(showDeleteModal.id)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                                    style={{
                                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                        boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
                                    }}>
                                    Ya, Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast */}
                {toast && (
                    <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white flex items-center gap-2 animate-fade-in-up"
                        style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                        }}>
                        <Eye className="w-4 h-4" />
                        {toast}
                    </div>
                )}
            </div>
        </>
    );
}
