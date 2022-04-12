<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ANNModel extends Model
{
    protected $table = "ann_models";
    use HasFactory;

    public function layers() {return $this->hasMany(Layer::class);}
    public function user() {return $this->belongsTo(User::class);}
}
