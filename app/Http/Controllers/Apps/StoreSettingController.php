<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreSettingController extends Controller
{
    public function edit()
    {
        $setting = StoreSetting::firstOrCreate([], [
            'store_name' => 'TOKO ANDA',
            'store_address' => null,
            'store_phone' => null,
        ]);

        return Inertia::render('Dashboard/Settings/Store', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request)
    {
        $setting = StoreSetting::firstOrCreate([], [
            'store_name' => 'TOKO ANDA',
            'store_address' => null,
            'store_phone' => null,
        ]);

        $data = $request->validate([
            'store_name' => ['required', 'string', 'max:255'],
            'store_address' => ['nullable', 'string'],
            'store_phone' => ['nullable', 'string', 'max:50'],
        ]);

        $setting->update($data);

        return redirect()
            ->route('settings.store.edit')
            ->with('success', 'Pengaturan toko berhasil disimpan.');
    }
}
