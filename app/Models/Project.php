<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'description',
        'image',
        'tech',
        'role',
        'status',
        'year',
        'duration',
        'is_private',
        'github',
        'github_backend',
        'live_demo',
        'overview',
        'problem',
        'solution',
        'features',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tech' => 'array',
            'features' => 'array',
            'is_private' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
