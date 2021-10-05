<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assigment extends Model
{
    use HasFactory;
    protected $table = "assignments";
    protected $fillable = [
        'description',
        'title',
        'deadline',
        'course_id',
        'topic_id'
    ];
    protected $casts = [
        'deadline' => 'datetime'
    ];
    public function topic() {return $this->belongsTo(Topic::class);}
    public function assignment_entries() {return $this->hasMany(AssignmentEntry::class);}
}
