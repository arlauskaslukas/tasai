<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;
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
    public function testimonials() { return $this->hasMany(Testimonial::class);}
    public function timetables() { return $this->hasMany(TimetableEntry::class);}
}
