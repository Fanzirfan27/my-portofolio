<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Public: receive contact form submission and store it.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:150',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:5000',
        ]);

        Message::create($validated);

        return back()->with('contact_success', 'Pesan berhasil dikirim! Saya akan menghubungi Anda segera.');
    }

    /**
     * Admin: list all messages, newest first.
     */
    public function index()
    {
        $messages = Message::orderByDesc('created_at')->get();
        $unreadCount = Message::where('is_read', false)->count();

        return Inertia::render('Admin/Messages', [
            'messages'    => $messages,
            'unreadCount' => $unreadCount,
        ]);
    }

    /**
     * Admin: mark a message as read.
     */
    public function markRead(Message $message)
    {
        $message->update(['is_read' => true]);
        return back();
    }

    /**
     * Admin: delete a message.
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return back()->with('success', 'Pesan berhasil dihapus.');
    }

    /**
     * Admin: delete all messages.
     */
    public function destroyAll()
    {
        Message::truncate();
        return back()->with('success', 'Semua pesan berhasil dihapus.');
    }
}
