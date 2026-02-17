<?php

namespace Database\Seeders;

use App\Models\StoreSetting;
use Illuminate\Database\Seeder;

class StoreSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StoreSetting::firstOrCreate([], [
            'store_name' => 'TOKO ANDA',
            'store_address' => null,
            'store_phone' => null,
        ]);
    }
}
