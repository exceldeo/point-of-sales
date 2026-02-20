<?php

namespace App\Http\Controllers\Apps;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use App\Support\StockLogContext;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\EmployeeManagementController;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get products
        $products = Product::when(request()->search, function ($products) {
            $products = $products->where('title', 'like', '%' . request()->search . '%');
        })->with('category')->latest()->paginate(15);

        //return inertia
        return Inertia::render('Dashboard/Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //get categories
        $categories = Category::all();
        $users = User::query()
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();
        $employees = (new EmployeeManagementController())->getEmployees();

        //return inertia
        return Inertia::render('Dashboard/Products/Create', [
            'categories' => $categories,
            'employees' => $employees,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /**
         * validate
         */
        $request->validate([
            'barcode' => 'required|unique:products,barcode',
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'stock' => 'required',
            'commissions' => 'nullable|array',
            'commissions.*.user_id' => 'required|integer|distinct|exists:users,id',
            'commissions.*.type' => 'required|in:percentage,nominal',
            'commissions.*.value' => 'required|numeric|min:0',
        ]);
        //upload image
        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());

        StockLogContext::set(null, 'Stok awal produk saat produk dibuat');

        try {
            //create product
            $product = Product::create([
                'image' => $image->hashName(),
                'barcode' => $request->barcode,
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'buy_price' => $request->buy_price,
                'sell_price' => $request->sell_price,
                'stock' => $request->stock,
            ]);

            $product->commissionUsers()->sync($this->commissionSyncPayload($request->input('commissions', [])));
        } finally {
            StockLogContext::clear();
        }

        //redirect
        return to_route('products.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //get categories
        $categories = Category::all();
        $users = User::query()
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        $product->load(['commissionUsers' => fn($query) => $query->select('users.id', 'name', 'email')]);

        $employees = (new EmployeeManagementController())->getEmployees();

        return Inertia::render('Dashboard/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'employees' => $employees,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        /**
         * validate
         */
        $request->validate([
            'barcode' => 'required|unique:products,barcode,' . $product->id,
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'stock' => 'required',
            'commissions' => 'nullable|array',
            'commissions.*.user_id' => 'required|integer|distinct|exists:users,id',
            'commissions.*.type' => 'required|in:percentage,nominal',
            'commissions.*.value' => 'required|numeric|min:0',
        ]);

        $payload = [
            'barcode' => $request->barcode,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'buy_price' => $request->buy_price,
            'sell_price' => $request->sell_price,
            'stock' => $request->stock,
        ];

        //check image update
        if ($request->file('image')) {
            //remove old image
            Storage::disk('local')->delete('public/products/' . basename($product->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());

            $payload['image'] = $image->hashName();
        }

        StockLogContext::set($product, 'Penyesuaian stok dari perubahan data produk');

        try {
            $product->update($payload);
            $product->commissionUsers()->sync($this->commissionSyncPayload($request->input('commissions', [])));
        } finally {
            StockLogContext::clear();
        }

        //redirect
        return to_route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //find by ID
        $product = Product::findOrFail($id);

        //remove image
        Storage::disk('local')->delete('public/products/' . basename($product->image));

        //delete
        $product->delete();

        //redirect
        return back();
    }

    private function commissionSyncPayload(array $commissions): array
    {
        return collect($commissions)
            ->filter(fn($commission) => isset($commission['user_id'], $commission['type'], $commission['value']))
            ->mapWithKeys(fn($commission) => [
                (int) $commission['user_id'] => [
                    'type' => $commission['type'],
                    'value' => (float) $commission['value'],
                ],
            ])
            ->toArray();
    }
}