<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Portfolio Routes
|--------------------------------------------------------------------------
| Main single-page portfolio and project detail pages.
| No database or backend logic — purely Inertia page rendering.
*/

// Home — single-page portfolio with all sections
Route::get('/', function () {
    return Inertia::render('Home');
});

// Project Detail — renders by slug (data resolved on frontend)
Route::get('/projects/{slug}', function (string $slug) {
    return Inertia::render('ProjectDetail', [
        'slug' => $slug,
    ]);
});
