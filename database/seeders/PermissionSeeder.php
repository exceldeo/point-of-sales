<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // dashboard permissions
        Permission::create(['name' => 'dashboard-access']);

        // users permissions
        Permission::create(['name' => 'users-access']);
        Permission::create(['name' => 'users-create']);
        Permission::create(['name' => 'users-update']);
        Permission::create(['name' => 'users-delete']);

        // roles permissions
        Permission::create(['name' => 'roles-access']);
        Permission::create(['name' => 'roles-create']);
        Permission::create(['name' => 'roles-update']);
        Permission::create(['name' => 'roles-delete']);

        // permissions permissions
        Permission::create(['name' => 'permissions-access']);
        Permission::create(['name' => 'permissions-create']);
        Permission::create(['name' => 'permissions-update']);
        Permission::create(['name' => 'permissions-delete']);

        //permission categories
        Permission::create(['name' => 'categories-access']);
        Permission::create(['name' => 'categories-create']);
        Permission::create(['name' => 'categories-edit']);
        Permission::create(['name' => 'categories-delete']);

        //permission products
        Permission::create(['name' => 'products-access']);
        Permission::create(['name' => 'products-create']);
        Permission::create(['name' => 'products-edit']);
        Permission::create(['name' => 'products-delete']);

        //permission customers
        Permission::create(['name' => 'customers-access']);
        Permission::create(['name' => 'customers-create']);
        Permission::create(['name' => 'customers-edit']);
        Permission::create(['name' => 'customers-delete']);

        //permission suppliers
        Permission::create(['name' => 'suppliers-access']);
        Permission::create(['name' => 'suppliers-create']);
        Permission::create(['name' => 'suppliers-edit']);
        Permission::create(['name' => 'suppliers-delete']);

        //permission stock management
        Permission::create(['name' => 'stock-management-access']);
        Permission::create(['name' => 'stock-management-create']);
        Permission::create(['name' => 'stock-management-edit']);
        Permission::create(['name' => 'stock-management-delete']);

        //permission transactions
        Permission::create(['name' => 'transactions-access']);

        // permission reports
        Permission::create(['name' => 'reports-access']);
        Permission::create(['name' => 'profits-access']);

        // payment settings
        Permission::create(['name' => 'payment-settings-access']);
    }
}