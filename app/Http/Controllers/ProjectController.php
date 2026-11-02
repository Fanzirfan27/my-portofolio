<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('sort_order')->get();
        $unreadCount = Message::where('is_read', false)->count();

        return Inertia::render('Admin/Dashboard', [
            'projects'    => $projects,
            'unreadCount' => $unreadCount,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ProjectForm', [
            'project' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateProject($request);

        // Ensure unique slug
        $baseSlug = Str::slug($validated['title']) ?: 'project';
        $slug = $baseSlug;
        $counter = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }
        $validated['slug'] = $slug;

        // Handle image upload
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = 'project_' . time() . '_' . Str::random(6) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('projects'), $filename);
            $validated['image'] = '/projects/' . $filename;
        }

        Project::create($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Project berhasil ditambahkan!');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/ProjectForm', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $this->validateProject($request);

        // Ensure unique slug (excluding current project)
        $baseSlug = Str::slug($validated['title']) ?: 'project';
        $slug = $baseSlug;
        $counter = 1;
        while (Project::where('slug', $slug)->where('id', '!=', $project->id)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }
        $validated['slug'] = $slug;

        // Handle image upload
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = 'project_' . time() . '_' . Str::random(6) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('projects'), $filename);
            $validated['image'] = '/projects/' . $filename;
        }

        $project->update($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Project berhasil diupdate!');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.dashboard')->with('success', 'Project berhasil dihapus!');
    }

    private function validateProject(Request $request): array
    {
        // Normalize boolean is_private so string "false"/"true" from FormData doesn't fail
        $rawIsPrivate = $request->input('is_private');
        $isPrivate = filter_var($rawIsPrivate, FILTER_VALIDATE_BOOLEAN) || $rawIsPrivate === '1' || $rawIsPrivate === 1 || $rawIsPrivate === true || $rawIsPrivate === 'true';

        // Clean url links: convert placeholders like '-' or 'https://...' into null
        $cleanUrl = function ($val) {
            if (!$val) return null;
            $val = trim((string) $val);
            if ($val === '' || $val === '-' || str_contains($val, '...')) {
                return null;
            }
            if (!preg_match('~^(?:f|ht)tps?://~i', $val)) {
                $val = 'https://' . $val;
            }
            return $val;
        };

        $request->merge([
            'is_private' => $isPrivate ? 1 : 0,
            'github' => $cleanUrl($request->input('github')),
            'github_backend' => $cleanUrl($request->input('github_backend')),
            'live_demo' => $cleanUrl($request->input('live_demo')),
        ]);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string|max:500',
            'image_file' => 'nullable|image|max:10240',
            'role' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:50',
            'year' => 'nullable|string|max:50',
            'duration' => 'nullable|string|max:100',
            'is_private' => 'nullable',
            'github' => 'nullable|string|max:500',
            'github_backend' => 'nullable|string|max:500',
            'live_demo' => 'nullable|string|max:500',
            'overview' => 'nullable|string',
            'problem' => 'nullable|string',
            'solution' => 'nullable|string',
            'tech' => 'nullable|string',
            'features' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        // Parse comma-separated strings to arrays
        if (isset($data['tech']) && is_string($data['tech'])) {
            $data['tech'] = array_values(array_filter(array_map('trim', explode(',', $data['tech']))));
        } elseif (!isset($data['tech'])) {
            $data['tech'] = [];
        }

        if (isset($data['features']) && is_string($data['features'])) {
            $data['features'] = array_values(array_filter(array_map('trim', explode("\n", $data['features']))));
        } elseif (!isset($data['features'])) {
            $data['features'] = [];
        }

        $data['is_private'] = $isPrivate;
        $data['sort_order'] = (int) ($data['sort_order'] ?? 0);
        unset($data['image_file']);

        return $data;
    }
}
