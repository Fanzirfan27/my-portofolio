<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    /**
     * Handle CV file upload — replaces the public/cv-irfan.pdf file.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'cv_file' => 'required|file|mimes:pdf|max:5120', // max 5 MB
        ]);

        $destination = public_path('cv-irfan.pdf');

        // Remove old file if exists
        if (file_exists($destination)) {
            unlink($destination);
        }

        // Move uploaded file to public directory
        $request->file('cv_file')->move(public_path(), 'cv-irfan.pdf');

        return back()->with('cv_success', 'CV berhasil diperbarui!');
    }
}
