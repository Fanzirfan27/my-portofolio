<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Portfolio Routes
|--------------------------------------------------------------------------
| Main single-page portfolio and project detail pages.
*/

// Home — single-page portfolio with all sections
Route::get('/', function () {
    $projects = Project::orderBy('sort_order')->get();
    return Inertia::render('Home', [
        'projects' => $projects,
    ]);
});

// Project Detail — renders by slug (data resolved from DB)
Route::get('/projects/{slug}', function (string $slug) {
    $project = Project::where('slug', $slug)->firstOrFail();
    $projects = Project::orderBy('sort_order')->get();
    return Inertia::render('ProjectDetail', [
        'project' => $project,
        'projects' => $projects,
    ]);
});

/*
|--------------------------------------------------------------------------
| Admin Auth Routes
|--------------------------------------------------------------------------
*/
Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('admin.login');
Route::redirect('/login', '/admin/login')->name('login');
Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

/*
|--------------------------------------------------------------------------
| Admin Dashboard (Protected)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', fn() => redirect()->route('admin.dashboard'));
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::post('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
    Route::post('/cv/upload', [CvController::class, 'upload'])->name('cv.upload');
});
