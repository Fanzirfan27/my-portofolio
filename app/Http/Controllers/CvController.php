<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    /**
     * Serve the latest CV file to the public with no-cache headers.
     * Works regardless of whether the file is stored in storage or public.
     */
    public function download()
    {
        // Primary: file stored via admin upload in storage/app/cv/
        if (Storage::disk('local')->exists('cv/cv-irfan.pdf')) {
            $path = Storage::disk('local')->path('cv/cv-irfan.pdf');

            return response()->file($path, [
                'Content-Type'        => 'application/pdf',
                'Content-Disposition' => 'inline; filename="cv-irfan.pdf"',
                'Cache-Control'       => 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma'              => 'no-cache',
                'Expires'             => '0',
            ]);
        }

        // Fallback: original static file from public folder
        $publicPath = public_path('cv-irfan.pdf');
        if (file_exists($publicPath)) {
            return response()->file($publicPath, [
                'Content-Type'        => 'application/pdf',
                'Content-Disposition' => 'inline; filename="cv-irfan.pdf"',
                'Cache-Control'       => 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma'              => 'no-cache',
                'Expires'             => '0',
            ]);
        }

        abort(404, 'CV tidak ditemukan.');
    }

    /**
     * Handle CV file upload — replaces the stored CV file.
     * Stores in storage/app/cv/ so it works on any hosting.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'cv_file' => 'required|file|mimes:pdf|max:5120', // max 5 MB
        ]);

        // Delete previous CV from storage if it exists
        if (Storage::disk('local')->exists('cv/cv-irfan.pdf')) {
            Storage::disk('local')->delete('cv/cv-irfan.pdf');
        }

        // Store the new file at storage/app/cv/cv-irfan.pdf
        $request->file('cv_file')->storeAs('cv', 'cv-irfan.pdf', 'local');

        return back()->with('cv_success', 'CV berhasil diperbarui!');
    }
}
