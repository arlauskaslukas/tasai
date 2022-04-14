<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Metric extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "ann_model_id"
    ];
    public function model() {return $this->belongsTo(ANNModel::class, "ann_model_id");}
}
