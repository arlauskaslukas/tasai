<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topic extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "topics";
    protected $fillable = [
        'title',
        'topic_order',
        'short_description',
        'theory',
        'course_id'
    ];
    public function course() {return $this->belongsTo(Course::class);}
    public function assignments() {return $this->hasMany(Assignment::class);}
    public function timetable_entries() {return $this->hasMany(TimetableEntry::class);}
    public function media() {return $this->hasMany(Media::class);}
    public function attendance_entries() {return $this->hasMany(AttendanceEntry::class);}
}
