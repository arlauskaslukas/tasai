<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
    protected $fillable = [
        'starts_at',
        'title',
        'short_description',
        'long_description',
        'duration',
        'cost'
    ];
    public function progress_trackers(){ return $this->hasMany(ProgressTracker::class); }
    public function topics() {return $this->hasMany(Topic::class);}
}
