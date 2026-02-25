<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Enums\PermissionEnums;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // Refactor the RoleSeeder to improve readability and avoid repetitive code
    public function run(): void
    {
        // Create super-admin role with all permissions
        $superAdminRole = Role::create(['name' => 'super-admin']);
        $allPermissions  = Permission::all();
        $superAdminRole->givePermissionTo($allPermissions);

        // Create cashier role with basic permissions for public registration
        $cashierRole        = Role::create(['name' => 'kasir']);
        $cashierPermissions = Permission::whereIn('name', [
            PermissionEnums::TRANSACTIONS_ACCESS->value,
            PermissionEnums::CUSTOMERS_ACCESS->value,
            PermissionEnums::CUSTOMERS_CREATE->value,
            PermissionEnums::STOCK_MANAGEMENT_ACCESS->value
        ])->get();
        $cashierRole->givePermissionTo($cashierPermissions);
    }

    private function createRoleWithPermissions($roleName, $permissionNamePattern)
    {
        $permissions = Permission::where('name', 'like', $permissionNamePattern)->get();
        $role        = Role::create(['name' => $roleName]);
        $role->givePermissionTo($permissions);
    }
}