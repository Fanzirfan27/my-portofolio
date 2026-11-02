import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Mail, Trash2, LogOut, FolderOpen, LayoutDashboard,
    MailOpen, Inbox, AlertTriangle, ChevronDown, ChevronUp, X,
    Globe, ExternalLink
} from 'lucide-react';

export default function Messages({ messages = [], unreadCount = 0 }) {
    const { auth = {}, flash = {} } = usePage().props;
    const [toast, setToast] = useState(null);
    const [expanded, setExpanded] = useState(null);
    const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            const t = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    const handleMarkRead = (msg) => {
        if (!msg.is_read) {
            router.patch(`/admin/messages/${msg.id}/read`, {}, { preserveScroll: true });
        }
    };

    const handleDelete = (id) => {
        router.delete(`/admin/messages/${id}`, { preserveScroll: true });
    };

    const handleDeleteAll = () => {
        router.delete('/admin/messages/all', {
            preserveScroll: true,
            onSuccess: () => setConfirmDeleteAll(false),
        });
    };

    const handleLogout = () => router.post('/admin/logout');

    const toggleExpand = (msg) => {
        if (expanded === msg.id) {
            setExpanded(null);
        } else {
            setExpanded(msg.id);
            handleMarkRead(msg);
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <>
            <Head title="Inbox — Admin" />
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
                    <nav className="flex-1 p-4 flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>Menu</p>

                        <a href="/admin"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{ color: '#64748b' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
                            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                            <FolderOpen className="w-4 h-4" />
                            Projects
                        </a>

                        <a href="/admin/messages"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                color: '#818cf8',
                                border: '1px solid rgba(99, 102, 241, 0.15)',
                            }}>
                            <Inbox className="w-4 h-4" />
                            Messages
                            {unreadCount > 0 && (
                                <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-bold"
                                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                                    {unreadCount}
                                </span>
                            )}
                        </a>

                        <a href="/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{ color: '#64748b' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
                            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                            <Globe className="w-4 h-4" />
                            Lihat Website
                            <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50" />
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
                                <p className="text-xs truncate" style={{ color: '#64748b' }}>{auth?.user?.email}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#f87171',
                                border: '1px solid rgba(239, 68, 68, 0.15)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}>
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main */}
                <main className="ml-64 p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Inbox className="w-6 h-6" style={{ color: '#818cf8' }} />
                                Inbox Pesan
                            </h1>
                            <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                                {messages.length} pesan masuk
                                {unreadCount > 0 && (
                                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                                        style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                                        {unreadCount} belum dibaca
                                    </span>
                                )}
                            </p>
                        </div>

                        {messages.length > 0 && (
                            <button
                                onClick={() => setConfirmDeleteAll(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.08)',
                                    color: '#f87171',
                                    border: '1px solid rgba(239, 68, 68, 0.15)',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.18)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'}>
                                <Trash2 className="w-4 h-4" />
                                Hapus Semua
                            </button>
                        )}
                    </div>

                    {/* Messages List */}
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 rounded-2xl"
                            style={{ border: '1px dashed rgba(99,102,241,0.15)', background: 'rgba(99,102,241,0.03)' }}>
                            <Inbox className="w-12 h-12 mb-4" style={{ color: '#334155' }} />
                            <p className="text-base font-semibold" style={{ color: '#475569' }}>Belum ada pesan masuk</p>
                            <p className="text-sm mt-1" style={{ color: '#334155' }}>Pesan dari form contact akan muncul di sini</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className="rounded-xl overflow-hidden transition-all duration-200"
                                    style={{
                                        background: msg.is_read
                                            ? 'rgba(15, 22, 41, 0.6)'
                                            : 'rgba(99, 102, 241, 0.05)',
                                        border: msg.is_read
                                            ? '1px solid rgba(99, 102, 241, 0.08)'
                                            : '1px solid rgba(99, 102, 241, 0.25)',
                                    }}
                                >
                                    {/* Row Header */}
                                    <div
                                        className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
                                        onClick={() => toggleExpand(msg)}
                                    >
                                        {/* Unread dot */}
                                        <div className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{
                                                background: msg.is_read ? 'transparent' : '#6366f1',
                                                boxShadow: msg.is_read ? 'none' : '0 0 6px rgba(99,102,241,0.6)',
                                            }} />

                                        {/* Icon */}
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: msg.is_read
                                                    ? 'rgba(99,102,241,0.06)'
                                                    : 'rgba(99,102,241,0.12)',
                                                color: '#818cf8',
                                            }}>
                                            {msg.is_read
                                                ? <MailOpen className="w-4 h-4" />
                                                : <Mail className="w-4 h-4" />}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-white truncate">
                                                    {msg.name}
                                                </span>
                                                <span className="text-xs truncate" style={{ color: '#64748b' }}>
                                                    &lt;{msg.email}&gt;
                                                </span>
                                            </div>
                                            <p className="text-xs mt-0.5 truncate" style={{ color: '#94a3b8' }}>
                                                <span className="font-medium" style={{ color: '#cbd5e1' }}>{msg.subject}</span>
                                                <span style={{ color: '#475569' }}> — {msg.message.substring(0, 80)}{msg.message.length > 80 ? '...' : ''}</span>
                                            </p>
                                        </div>

                                        {/* Date + Actions */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className="text-xs" style={{ color: '#475569' }}>
                                                {formatDate(msg.created_at)}
                                            </span>

                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200"
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.08)',
                                                    color: '#f87171',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                                                title="Hapus pesan">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>

                                            {expanded === msg.id
                                                ? <ChevronUp className="w-4 h-4" style={{ color: '#475569' }} />
                                                : <ChevronDown className="w-4 h-4" style={{ color: '#475569' }} />}
                                        </div>
                                    </div>

                                    {/* Expanded Body */}
                                    {expanded === msg.id && (
                                        <div className="px-5 pb-5 pt-1"
                                            style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                                            <div className="rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap"
                                                style={{
                                                    background: 'rgba(99,102,241,0.04)',
                                                    color: '#cbd5e1',
                                                    border: '1px solid rgba(99,102,241,0.08)',
                                                }}>
                                                {msg.message}
                                            </div>
                                            <div className="mt-3 flex items-center gap-4">
                                                <a
                                                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                                                    style={{
                                                        background: 'rgba(99,102,241,0.1)',
                                                        color: '#818cf8',
                                                        border: '1px solid rgba(99,102,241,0.2)',
                                                    }}>
                                                    <Mail className="w-3 h-3" />
                                                    Balas via Email
                                                </a>
                                                <span className="text-xs" style={{ color: '#334155' }}>
                                                    Diterima: {formatDate(msg.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {/* Toast */}
                {toast && (
                    <div className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium z-50"
                        style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            color: '#34d399',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        }}>
                        ✓ {toast}
                    </div>
                )}

                {/* Confirm Delete All Modal */}
                {confirmDeleteAll && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                        <div className="w-full max-w-sm mx-4 rounded-2xl p-6"
                            style={{
                                background: 'rgba(15,22,41,0.98)',
                                border: '1px solid rgba(239,68,68,0.2)',
                                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                            }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: 'rgba(239,68,68,0.1)' }}>
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">Hapus Semua Pesan?</h3>
                                    <p className="text-xs" style={{ color: '#64748b' }}>Tindakan ini tidak dapat dibatalkan</p>
                                </div>
                            </div>
                            <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
                                Seluruh {messages.length} pesan akan dihapus permanen dari database.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmDeleteAll(false)}
                                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                                    style={{
                                        background: 'rgba(99,102,241,0.08)',
                                        color: '#818cf8',
                                        border: '1px solid rgba(99,102,241,0.15)',
                                    }}>
                                    Batal
                                </button>
                                <button
                                    onClick={handleDeleteAll}
                                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                                        color: '#fff',
                                        boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
                                    }}>
                                    Ya, Hapus Semua
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
