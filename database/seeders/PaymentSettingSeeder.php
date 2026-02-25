<?php

namespace Database\Seeders;

use App\Models\PaymentSetting;
use Illuminate\Database\Seeder;
use App\Enums\PaymentMethodEnums;

class PaymentSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PaymentSetting::firstOrCreate([], [
            'default_gateway' => PaymentMethodEnums::CASH->value,
            'midtrans_enabled' => false,
            'xendit_enabled' => false,
        ]);
    }
}
