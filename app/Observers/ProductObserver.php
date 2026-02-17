<?php

namespace App\Observers;

use App\Models\LogStock;
use App\Models\Product;
use App\Support\StockLogContext;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        $initialQty = (int) $product->stock;

        if ($initialQty === 0) {
            return;
        }

        LogStock::create([
            'product_id'  => $product->id,
            'stock_type'  => $initialQty > 0 ? 'stock_in' : 'stock_out',
            'model_type'  => StockLogContext::modelType() ?? Product::class,
            'model_id'    => StockLogContext::modelId() ?? (int) $product->id,
            'qty'         => $initialQty,
            'description' => StockLogContext::description() ?? 'Initial stock saat produk dibuat',
        ]);
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        if (! $product->wasChanged('stock')) {
            return;
        }

        $before = (int) $product->getOriginal('stock');
        $after  = (int) $product->stock;
        $qty    = $after - $before;

        if ($qty === 0) {
            return;
        }

        LogStock::create([
            'product_id'  => $product->id,
            'stock_type'  => $qty > 0 ? 'stock_in' : 'stock_out',
            'model_type'  => StockLogContext::modelType() ?? Product::class,
            'model_id'    => StockLogContext::modelId() ?? (int) $product->id,
            'qty'         => $qty,
            'description' => StockLogContext::description() ?? 'Penyesuaian stok produk',
        ]);
    }
}
