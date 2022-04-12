<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layer extends Model
{
    use HasFactory;
    public function layerParameters() {return $this->hasMany(LayerParameter::class);}
}
