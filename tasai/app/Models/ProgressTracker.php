<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressTracker extends Model
{
    use HasFactory;
    protected $table = "progresstrackers";
    protected $fillable = [
        'completed_topics',
        'user_id',
        'course_id'
    ];
    public function course() {return $this->belongsTo(Course::class);}
    public function user() {return $this->belongsTo(User::class);}
}
