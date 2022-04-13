<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layer extends Model
{
    use HasFactory;
    protected $fillable = [
        "next_layer_id",
        "ann_model_id",
        "type",
        "activation"
    ];
    public function model() {return $this->hasMany(ANNModel::class);}
    public function layerParameters() {return $this->hasMany(LayerParameter::class);}
}
