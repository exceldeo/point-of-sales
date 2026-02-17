<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogStock extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'stock_type',
        'model_type',
        'model_id',
        'qty',
        'description',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
