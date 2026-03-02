<?php

namespace App\Enums;

enum PermissionEnums: string
{
    // profile permission
    case PROFILE_ACCESS = 'profile-access';
    // dashboard permission
    case DASHBOARD_ACCESS = 'dashboard-access';
    // users permission
    case USERS_ACCESS = 'users-access';
    case USERS_CREATE = 'users-create';
    case USERS_UPDATE = 'users-update';
    case USERS_DELETE = 'users-delete';
    // roles permission
    case ROLES_ACCESS = 'roles-access';
    case ROLES_CREATE = 'roles-create';
    case ROLES_UPDATE = 'roles-update';
    case ROLES_DELETE = 'roles-delete';
    // permissions permission
    case PERMISSIONS_ACCESS = 'permissions-access';
    // categories permission
    case CATEGORIES_ACCESS = 'categories-access';
    case CATEGORIES_CREATE = 'categories-create';
    case CATEGORIES_EDIT = 'categories-edit';
    case CATEGORIES_DELETE = 'categories-delete';
    // products permission
    case PRODUCTS_ACCESS = 'products-access';
    case PRODUCTS_CREATE = 'products-create';
    case PRODUCTS_EDIT = 'products-edit';
    case PRODUCTS_DELETE = 'products-delete';
    // customers permission
    case CUSTOMERS_ACCESS = 'customers-access';
    case CUSTOMERS_CREATE = 'customers-create';
    case CUSTOMERS_EDIT = 'customers-edit';
    case CUSTOMERS_DELETE = 'customers-delete';
    // suppliers permission
    case SUPPLIERS_ACCESS = 'suppliers-access';
    case SUPPLIERS_CREATE = 'suppliers-create';
    case SUPPLIERS_EDIT = 'suppliers-edit';
    case SUPPLIERS_DELETE = 'suppliers-delete';
    // stock management permission
    case STOCK_MANAGEMENT_ACCESS = 'stock-management-access';
    case STOCK_MANAGEMENT_CREATE = 'stock-management-create';
    case STOCK_MANAGEMENT_EDIT = 'stock-management-edit';
    case STOCK_MANAGEMENT_DELETE = 'stock-management-delete';
    // transactions permission
    case TRANSACTIONS_ACCESS = 'transactions-access';
    // reports permission
    case REPORTS_ACCESS = 'reports-access';
    case PROFITS_ACCESS = 'profits-access';
    // settings permission
    case SETTINGS_ACCESS = 'settings-access';
    // employee managements permission
    case EMPLOYEE_MANAGEMENT_ACCESS = 'employee-management-access';
    case EMPLOYEE_MANAGEMENT_CHANGE = 'employee-management-change';

    public function label(): string
    {
        return match ($this) {
            self::PROFILE_ACCESS => 'Akses Profil',
            self::DASHBOARD_ACCESS => 'Akses Dashboard',
            self::USERS_ACCESS => 'Akses Pengguna',
            self::USERS_CREATE => 'Buat Pengguna',
            self::USERS_UPDATE => 'Perbarui Pengguna',
            self::USERS_DELETE => 'Hapus Pengguna',
            self::ROLES_ACCESS => 'Akses Peran',
            self::ROLES_CREATE => 'Buat Peran',
            self::ROLES_UPDATE => 'Perbarui Peran',
            self::ROLES_DELETE => 'Hapus Peran',
            self::CATEGORIES_ACCESS => 'Akses Kategori',
            self::CATEGORIES_CREATE => 'Buat Kategori',
            self::CATEGORIES_EDIT => 'Edit Kategori',
            self::CATEGORIES_DELETE => 'Hapus Kategori',
            self::PRODUCTS_ACCESS => 'Akses Produk',
            self::PRODUCTS_CREATE => 'Buat Produk',
            self::PRODUCTS_EDIT => 'Edit Produk',
            self::PRODUCTS_DELETE => 'Hapus Produk',
            self::CUSTOMERS_ACCESS => 'Akses Pelanggan',
            self::CUSTOMERS_CREATE => 'Buat Pelanggan',
            self::CUSTOMERS_EDIT => 'Edit Pelanggan',
            self::CUSTOMERS_DELETE => 'Hapus Pelanggan',
            self::SUPPLIERS_ACCESS => 'Akses Pemasok',
            self::SUPPLIERS_CREATE => 'Buat Pemasok',
            self::SUPPLIERS_EDIT => 'Edit Pemasok',
            self::SUPPLIERS_DELETE => 'Hapus Pemasok',
            self::STOCK_MANAGEMENT_ACCESS => 'Akses Manajemen Stok',
            self::STOCK_MANAGEMENT_CREATE => 'Buat Manajemen Stok',
            self::STOCK_MANAGEMENT_EDIT => 'Edit Manajemen Stok',
            self::STOCK_MANAGEMENT_DELETE => 'Hapus Manajemen Stok',
            self::TRANSACTIONS_ACCESS => 'Akses Transaksi',
            self::REPORTS_ACCESS => 'Akses Laporan',
            self::PROFITS_ACCESS => 'Akses Keuntungan',
            self::SETTINGS_ACCESS => 'Akses Pengaturan',
            self::EMPLOYEE_MANAGEMENT_ACCESS => 'Akses Manajemen Karyawan',
            self::EMPLOYEE_MANAGEMENT_CHANGE => 'Ubah Manajemen Karyawan',
        };
    }

    public function router(): string
    {
        return match ($this) {
            self::PROFILE_ACCESS => 'profile.edit',
            self::DASHBOARD_ACCESS => 'dashboard',
            self::USERS_ACCESS => 'users.index',
            self::ROLES_ACCESS => 'roles.index',
            self::CATEGORIES_ACCESS => 'categories.index',
            self::PRODUCTS_ACCESS => 'products.index',
            self::CUSTOMERS_ACCESS => 'customers.index',
            self::SUPPLIERS_ACCESS => 'suppliers.index',
            self::STOCK_MANAGEMENT_ACCESS => 'stock-management.index',
            self::TRANSACTIONS_ACCESS => 'transactions.index',
            self::REPORTS_ACCESS => 'reports.sales.index',
            self::PROFITS_ACCESS => 'reports.profits.index',
            self::EMPLOYEE_MANAGEMENT_ACCESS => 'employee-management.index',
        };
    }

    public static function options(): array
    {
        return array_map(fn ($type) => [
            'value' => $type->value,
            'label' => $type->label(),
        ], self::cases());
    }

    public static function getLabelByValue(string $value): ?string
    {
        return self::tryFrom($value)?->label();
    }

    public static function getRouterByValue(string $value): ?string
    {
        return self::tryFrom($value)?->router();
    }
}