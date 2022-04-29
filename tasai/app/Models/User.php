<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $table = "Users";
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function progress_trackers()
    {
        return $this->hasMany(ProgressTracker::class);
    }
    public function assignment_entries()
    {
        return $this->hasMany(AssignmentEntry::class);
    }
    public function attendance_entries()
    {
        return $this->hasMany(AttendanceEntry::class);
    }
    public function testimonials() { return $this->hasMany(Testimonial::class);}
    public function models() { return $this->hasMany(ANNModel::class);}
}
