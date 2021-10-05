<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimetableEntry extends Model
{
    use HasFactory;
    protected $table = 'timetableentries';
    protected $fillable = [
        'lesson_time',
        'entry_title',
        'link',
        'course_id',
        'topic_id'
    ];
    public function topic() {return $this->belongsTo(Topic::class);}
}
