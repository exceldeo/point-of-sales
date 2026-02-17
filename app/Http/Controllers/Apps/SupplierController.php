<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::when(request()->search, function ($suppliers) {
            $suppliers = $suppliers->where('name', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        return Inertia::render('Dashboard/Suppliers/Index', [
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Suppliers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required',
            'no_telp' => 'required|unique:suppliers',
            'address' => 'required',
        ]);

        Supplier::create([
            'name'    => $request->name,
            'no_telp' => $request->no_telp,
            'address' => $request->address,
        ]);

        return to_route('suppliers.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Dashboard/Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $request->validate([
            'name'    => 'required',
            'no_telp' => 'required|unique:suppliers,no_telp,' . $supplier->id,
            'address' => 'required',
        ]);

        $supplier->update([
            'name'    => $request->name,
            'no_telp' => $request->no_telp,
            'address' => $request->address,
        ]);

        return to_route('suppliers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);

        $supplier->delete();

        return back();
    }
}