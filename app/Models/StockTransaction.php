<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'pemasok_id',
        'type',
        'operator',
        'notes',
    ];

    public function pemasok()
    {
        return $this->belongsTo(Supplier::class, 'pemasok_id');
    }

    public function operatorUser()
    {
        return $this->belongsTo(User::class, 'operator');
    }

    public function items()
    {
        return $this->hasMany(StockTransactionItem::class);
    }
}
