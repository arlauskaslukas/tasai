<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayerParameter extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "type",
        "value",
        "layer_id"
    ];

    public function layer() {return $this->belongsTo(Layer::class);}
}
