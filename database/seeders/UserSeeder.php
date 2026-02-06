<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
        ]);

        // get admin role
        $role = Role::where('name', 'super-admin')->first();

        // get all permissions
        $permissions = Permission::all();

        // assign role to user
        $user->syncPermissions($permissions);

        // assign a role to user
        $user->assignRole($role);

        $kasir = User::create([
            'name' => 'Kasir',
            'email' => 'kasir@gmail.com',
            'password' => bcrypt('kasir'),
        ]);

        // get kasir role
        $kasirRole = Role::where('name', 'kasir')->first();
        
        // assign a role to kasir
        $kasir->assignRole($kasirRole);
    }
}