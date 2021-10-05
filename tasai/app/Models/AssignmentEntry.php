<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentEntry extends Model
{
    use HasFactory;
    protected $table = 'assignmententries';
    protected $fillable = [
        'filename',
        'rating',
        'assignment_id',
        'user_id'
    ];
    public function user() {return $this->belongsTo(User::class);}
    public function assignment() {return $this->belongsTo(Assignment::class);}
}
