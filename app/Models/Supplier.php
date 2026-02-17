<?php

namespace App\Models;

use App\Models\StockTransaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'no_telp',
        'address',
    ];

    public function stockTransactions()
    {
        return $this->hasMany(StockTransaction::class, 'pemasok_id');
    }
}
