<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;
    protected $table = "testimonials";
    protected $fillable = [
        "testimonial",
        "rating",
        "user_id",
        "course_id"
    ];

    public function course() {return $this->belongsTo(Course::class);}
    public function user() {return $this->belongsTo(User::class);}
}
