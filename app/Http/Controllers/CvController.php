<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    /**
     * Serve the latest CV file to the public with strict no-cache headers.
     */
    public function download()
    {
        $path = null;

        // 1. Primary: file stored via admin upload in storage/app/private/cv/
        if (Storage::disk('local')->exists('cv/cv-irfan.pdf')) {
            $path = Storage::disk('local')->path('cv/cv-irfan.pdf');
        } elseif (file_exists(public_path('cv-irfan.pdf'))) {
            // 2. Fallback: file in public folder
            $path = public_path('cv-irfan.pdf');
        }

        if (!$path || !file_exists($path)) {
            abort(404, 'CV tidak ditemukan.');
        }

        return response()->file($path, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'inline; filename="cv-irfan.pdf"',
            'Cache-Control'       => 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0',
            'Pragma'              => 'no-cache',
            'Expires'             => 'Sun, 02 Jan 1990 00:00:00 GMT',
        ]);
    }

    /**
     * Handle CV file upload — replaces the old CV file in both storage and public.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'cv_file' => 'required|file|mimes:pdf|max:10240', // max 10 MB
        ]);

        $uploaded = $request->file('cv_file');

        // Delete old file from storage if exists
        if (Storage::disk('local')->exists('cv/cv-irfan.pdf')) {
            Storage::disk('local')->delete('cv/cv-irfan.pdf');
        }

        // Store new CV file to local storage
        $uploaded->storeAs('cv', 'cv-irfan.pdf', 'local');

        // Also update public/cv-irfan.pdf so direct webserver access also gets the new file
        try {
            $publicCv = public_path('cv-irfan.pdf');
            $storageCv = Storage::disk('local')->path('cv/cv-irfan.pdf');
            if (file_exists($storageCv)) {
                copy($storageCv, $publicCv);
            }
        } catch (\Throwable $e) {
            // Ignore if permissions prevent writing to public directory
        }

        return back()->with('cv_success', 'CV berhasil diperbarui! File lama telah digantikan dengan yang baru.');
    }
}
