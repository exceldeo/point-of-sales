<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\StockTransaction;
use App\Models\Supplier;
use App\Support\StockLogContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StockManagementController extends Controller
{
    public function index()
    {
        $transactions = StockTransaction::query()
            ->with(['pemasok:id,name', 'operatorUser:id,name'])
            ->withCount('items')
            ->when(request()->search, function ($query) {
                $query->whereHas('pemasok', function ($supplierQuery) {
                    $supplierQuery->where('name', 'like', '%' . request()->search . '%');
                })->orWhereHas('operatorUser', function ($userQuery) {
                    $userQuery->where('name', 'like', '%' . request()->search . '%');
                })->orWhere('type', 'like', '%' . request()->search . '%');
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/StockManagement/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/StockManagement/Create', [
            'suppliers' => Supplier::query()->select('id', 'name')->orderBy('name')->get(),
            'products' => Product::query()->select('id', 'title', 'stock')->orderBy('title')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pemasok_id' => ['nullable', 'exists:suppliers,id'],
            'type' => ['required', 'in:stock_in,stock_out'],
            'notes' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id', 'distinct'],
            'items.*.qty' => ['required', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($validated) {
            $transaction = StockTransaction::create([
                'pemasok_id' => $validated['pemasok_id'] ?? null,
                'type' => $validated['type'],
                'operator' => auth()->id(),
                'notes' => $validated['notes'] ?? null,
            ]);

            StockLogContext::set($transaction, 'Stock management: transaksi #' . $transaction->id . ' (' . $transaction->type . ')');

            try {
                foreach ($validated['items'] as $item) {
                    $product = Product::findOrFail($item['product_id']);
                    $qty = (int) $item['qty'];
                    $delta = $validated['type'] === 'stock_in' ? $qty : -$qty;

                    $this->applyProductStockDelta($product, $delta);

                    $transaction->items()->create([
                        'product_id' => $product->id,
                        'qty' => $qty,
                    ]);
                }
            } finally {
                StockLogContext::clear();
            }
        });

        return to_route('stock-management.index');
    }

    public function edit(StockTransaction $stockTransaction)
    {
        $stockTransaction->load(['items']);

        return Inertia::render('Dashboard/StockManagement/Edit', [
            'transaction' => $stockTransaction,
            'suppliers' => Supplier::query()->select('id', 'name')->orderBy('name')->get(),
            'products' => Product::query()->select('id', 'title', 'stock')->orderBy('title')->get(),
        ]);
    }

    public function update(Request $request, StockTransaction $stockTransaction)
    {
        $validated = $request->validate([
            'pemasok_id' => ['nullable', 'exists:suppliers,id'],
            'type' => ['required', 'in:stock_in,stock_out'],
            'notes' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id', 'distinct'],
            'items.*.qty' => ['required', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($validated, $stockTransaction) {
            $stockTransaction->load('items');

            StockLogContext::set($stockTransaction, 'Stock management: rollback update transaksi #' . $stockTransaction->id);

            try {
                foreach ($stockTransaction->items as $oldItem) {
                    $product = Product::findOrFail($oldItem->product_id);
                    $rollbackDelta = $stockTransaction->type === 'stock_in' ? -((int) $oldItem->qty) : (int) $oldItem->qty;
                    $this->applyProductStockDelta($product, $rollbackDelta);
                }

                $stockTransaction->items()->delete();

                $stockTransaction->update([
                    'pemasok_id' => $validated['pemasok_id'] ?? null,
                    'type' => $validated['type'],
                    'notes' => $validated['notes'] ?? null,
                    'operator' => auth()->id(),
                ]);

                StockLogContext::set($stockTransaction, 'Stock management: apply update transaksi #' . $stockTransaction->id . ' (' . $stockTransaction->type . ')');

                foreach ($validated['items'] as $item) {
                    $product = Product::findOrFail($item['product_id']);
                    $qty = (int) $item['qty'];
                    $delta = $validated['type'] === 'stock_in' ? $qty : -$qty;

                    $this->applyProductStockDelta($product, $delta);

                    $stockTransaction->items()->create([
                        'product_id' => $product->id,
                        'qty' => $qty,
                    ]);
                }
            } finally {
                StockLogContext::clear();
            }
        });

        return to_route('stock-management.index');
    }

    public function destroy(StockTransaction $stockTransaction)
    {
        DB::transaction(function () use ($stockTransaction) {
            $stockTransaction->load('items');

            StockLogContext::set($stockTransaction, 'Stock management: rollback delete transaksi #' . $stockTransaction->id);

            try {
                foreach ($stockTransaction->items as $item) {
                    $product = Product::findOrFail($item->product_id);
                    $rollbackDelta = $stockTransaction->type === 'stock_in' ? -((int) $item->qty) : (int) $item->qty;
                    $this->applyProductStockDelta($product, $rollbackDelta);
                }

                $stockTransaction->delete();
            } finally {
                StockLogContext::clear();
            }
        });

        return back();
    }

    private function applyProductStockDelta(Product $product, int $delta): void
    {
        $newStock = (int) $product->stock + $delta;

        if ($newStock < 0) {
            throw ValidationException::withMessages([
                'items' => 'Stok produk "' . $product->title . '" tidak mencukupi untuk operasi ini.',
            ]);
        }

        $product->stock = $newStock;
        $product->save();
    }
}
