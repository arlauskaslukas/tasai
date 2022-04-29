<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ANNModel extends Model
{
    protected $table = "ann_models";
    use HasFactory;

    protected $fillable = [
        "title",
        "optimizer",
        "loss",
        "user_id"
    ];

    public function layers() {return $this->hasMany(Layer::class, "ann_model_id");}
    public function user() {return $this->belongsTo(User::class);}
    public function assignment_entries() {$this->hasMany(AssignmentEntry::class);}
    public function metrics() {return $this->hasMany(Metric::class, "ann_model_id");}
}
