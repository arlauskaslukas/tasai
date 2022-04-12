<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayerParameter extends Model
{
    use HasFactory;
    public function layer() {return $this->belongsTo(Layer::class);}
}
