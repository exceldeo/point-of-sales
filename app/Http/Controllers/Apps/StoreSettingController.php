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
            'store_footer' => null,
            'is_edited' => false,
        ]);

        return Inertia::render('Settings/Store', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request)
    {
        $setting = StoreSetting::firstOrCreate([], [
            'store_name' => 'TOKO ANDA',
            'store_address' => null,
            'store_phone' => null,
            'store_footer' => null,
            'is_edited' => false,
        ]);

        $data = $request->validate([
            'store_name' => ['required', 'string', 'max:255'],
            'store_address' => ['nullable', 'string'],
            'store_phone' => ['nullable', 'string', 'max:50'],
            'store_footer' => ['nullable', 'string'],
        ]);

        if ($setting->is_edited) {
            unset($data['store_name']);
        } elseif (($data['store_name'] ?? null) !== $setting->store_name) {
            $data['is_edited'] = true;
        }

        $setting->update($data);

        return redirect()
            ->route('settings.store.edit')
            ->with('success', 'Pengaturan toko berhasil disimpan.');
    }
}
