<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceEntry extends Model
{
    use HasFactory;
    protected $table = "attendanceentries";
    protected $fillable = [
        'is_attending',
        'course_id',
        'user_id',
        'topic_id'
    ];
    public function user() {return $this->belongsTo(User::class);}
    public function topic() {return $this->belongsTo(Topic::class);}
}
