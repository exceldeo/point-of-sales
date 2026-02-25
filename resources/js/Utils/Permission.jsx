import { usePage } from "@inertiajs/react";

export default function hasAnyPermission(permissions) {

    // destruct auth from usepage props
    const { auth } = usePage().props

    // get all permissions from props auth.permissions
    let allPermissions = auth.permissions;

    // define has permission is false
    let hasPermission = false;

    // loop permissions
    permissions.forEach(function (item) {
        // do it if permission is match with key
        if (allPermissions[item])
            // assign hasPermission to true
            hasPermission = true;
    });

    // return has permissions
    return hasPermission;
}

export const permissionEnums = {
    DASHBOARD_ACCESS: 'dashboard-access',
    USERS_ACCESS: 'users-access',
    USERS_CREATE: 'users-create',
    USERS_UPDATE: 'users-update',
    USERS_DELETE: 'users-delete',
    ROLES_ACCESS: 'roles-access',
    ROLES_CREATE: 'roles-create',
    ROLES_UPDATE: 'roles-update',
    ROLES_DELETE: 'roles-delete',
    PERMISSIONS_ACCESS: 'permissions-access',
    CATEGORIES_ACCESS: 'categories-access',
    CATEGORIES_CREATE: 'categories-create',
    CATEGORIES_EDIT: 'categories-edit',
    CATEGORIES_DELETE: 'categories-delete',
    PRODUCTS_ACCESS: 'products-access',
    PRODUCTS_CREATE: 'products-create',
    PRODUCTS_EDIT: 'products-edit',
    PRODUCTS_DELETE: 'products-delete',
    CUSTOMERS_ACCESS: 'customers-access',
    CUSTOMERS_CREATE: 'customers-create',
    CUSTOMERS_EDIT: 'customers-edit',
    CUSTOMERS_DELETE: 'customers-delete',
    SUPPLIERS_ACCESS: 'suppliers-access',
    SUPPLIERS_CREATE: 'suppliers-create',
    SUPPLIERS_EDIT: 'suppliers-edit',
    SUPPLIERS_DELETE: 'suppliers-delete',
    STOCK_MANAGEMENT_ACCESS: 'stock-management-access',
    STOCK_MANAGEMENT_CREATE: 'stock-management-create',
    STOCK_MANAGEMENT_EDIT: 'stock-management-edit',
    STOCK_MANAGEMENT_DELETE: 'stock-management-delete',
    TRANSACTIONS_ACCESS: 'transactions-access',
    REPORTS_ACCESS: 'reports-access',
    PROFITS_ACCESS: 'profits-access',
    SETTINGS_ACCESS: 'settings-access',
    EMPLOYEE_MANAGEMENT_ACCESS: 'employee-management-access',
    EMPLOYEE_MANAGEMENT_CHANGE: 'employee-management-change',
}