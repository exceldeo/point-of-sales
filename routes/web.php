<?php

use App\Http\Controllers\Apps\CategoryController;
use App\Http\Controllers\Apps\CustomerController;
use App\Http\Controllers\Apps\PaymentSettingController;
use App\Http\Controllers\Apps\ProductController;
use App\Http\Controllers\Apps\StockManagementController;
use App\Http\Controllers\Apps\SupplierController;
use App\Http\Controllers\Apps\StoreSettingController;
use App\Http\Controllers\Apps\TransactionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeManagementController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Reports\ProfitReportController;
use App\Http\Controllers\Reports\SalesReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Enums\PermissionEnums;

Route::get('/', function () {
    if (auth()->check()){
        return redirect()->route('home');
    }
    return redirect()->route('login');
});

Route::group(['prefix' => '', 'middleware' => ['auth']], function () {
    Route::get('/', [DashboardController::class, 'home'])->name('home');
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified', 'permission:'.PermissionEnums::DASHBOARD_ACCESS->value])->name('dashboard');
    Route::get('/permissions', [PermissionController::class, 'index'])->middleware('permission:'.PermissionEnums::PERMISSIONS_ACCESS->value)->name('permissions.index');
    // roles route
    Route::resource('/roles', RoleController::class)
        ->except(['create', 'edit', 'show'])
        ->middlewareFor('index', 'permission:'.PermissionEnums::ROLES_ACCESS->value)
        ->middlewareFor('store', 'permission:'.PermissionEnums::ROLES_CREATE->value)
        ->middlewareFor('update', 'permission:'.PermissionEnums::ROLES_UPDATE->value)
        ->middlewareFor('destroy', 'permission:'.PermissionEnums::ROLES_DELETE->value);
    // users route
    Route::resource('/users', UserController::class)
        ->except('show')
        ->middlewareFor('index', 'permission:'.PermissionEnums::USERS_ACCESS->value)
        ->middlewareFor(['create', 'store'], 'permission:'.PermissionEnums::USERS_CREATE->value)
        ->middlewareFor(['edit', 'update'], 'permission:'.PermissionEnums::USERS_UPDATE->value)
        ->middlewareFor('destroy', 'permission:'.PermissionEnums::USERS_DELETE->value);
    Route::get('/employees-management', [EmployeeManagementController::class, 'index'])
        ->middleware('permission:'.PermissionEnums::EMPLOYEE_MANAGEMENT_ACCESS->value)
        ->name('employee-management.index');
    Route::post('/employees/{employee}/withdraw', [EmployeeManagementController::class, 'withdrawCommission'])
        ->middleware('permission:'.PermissionEnums::EMPLOYEE_MANAGEMENT_ACCESS->value)
        ->name('employee-management.withdraw');

    Route::resource('categories', CategoryController::class)
        ->middlewareFor(['index', 'show'], 'permission:'.PermissionEnums::CATEGORIES_ACCESS->value)
        ->middlewareFor(['create', 'store'], 'permission:'.PermissionEnums::CATEGORIES_CREATE->value)
        ->middlewareFor(['edit', 'update'], 'permission:'.PermissionEnums::CATEGORIES_EDIT->value)
        ->middlewareFor('destroy', 'permission:'.PermissionEnums::CATEGORIES_DELETE->value);
    Route::resource('products', ProductController::class)
        ->middlewareFor(['index', 'show'], 'permission:'.PermissionEnums::PRODUCTS_ACCESS->value)
        ->middlewareFor(['create', 'store'], 'permission:'.PermissionEnums::PRODUCTS_CREATE->value)
        ->middlewareFor(['edit', 'update'], 'permission:'.PermissionEnums::PRODUCTS_EDIT->value)
        ->middlewareFor('destroy', 'permission:'.PermissionEnums::PRODUCTS_DELETE->value);
    Route::resource('customers', CustomerController::class)
        ->middlewareFor(['index', 'show'], 'permission:'.PermissionEnums::CUSTOMERS_ACCESS->value)
        ->middlewareFor(['create', 'store'], 'permission:'.PermissionEnums::CUSTOMERS_CREATE->value)
        ->middlewareFor(['edit', 'update'], 'permission:'.PermissionEnums::CUSTOMERS_EDIT->value)
        ->middlewareFor('destroy', 'permission:'.PermissionEnums::CUSTOMERS_DELETE->value);
    Route::resource('suppliers', SupplierController::class)
        ->middlewareFor(['index', 'show'], 'permission:'.PermissionEnums::SUPPLIERS_ACCESS->value)
        ->middlewareFor(['create', 'store'], 'permission:'.PermissionEnums::SUPPLIERS_CREATE->value)
        ->middlewareFor(['edit', 'update'], 'permission:'.PermissionEnums::SUPPLIERS_EDIT->value)
        ->middlewareFor('destroy', 'permission:'.PermissionEnums::SUPPLIERS_DELETE->value);

    Route::get('/stock-management', [StockManagementController::class, 'index'])
        ->middleware('permission:'.PermissionEnums::STOCK_MANAGEMENT_ACCESS->value)
        ->name('stock-management.index');
    Route::get('/stock-management/create', [StockManagementController::class, 'create'])
        ->middleware('permission:'.PermissionEnums::STOCK_MANAGEMENT_CREATE->value)
        ->name('stock-management.create');
    Route::post('/stock-management', [StockManagementController::class, 'store'])
        ->middleware('permission:'.PermissionEnums::STOCK_MANAGEMENT_CREATE->value)
        ->name('stock-management.store');
    Route::get('/stock-management/{stockTransaction}/edit', [StockManagementController::class, 'edit'])
        ->middleware('permission:'.PermissionEnums::STOCK_MANAGEMENT_EDIT->value)
        ->name('stock-management.edit');
    Route::put('/stock-management/{stockTransaction}', [StockManagementController::class, 'update'])
        ->middleware('permission:'.PermissionEnums::STOCK_MANAGEMENT_EDIT->value)
        ->name('stock-management.update');
    Route::delete('/stock-management/{stockTransaction}', [StockManagementController::class, 'destroy'])
        ->middleware('permission:'.PermissionEnums::STOCK_MANAGEMENT_DELETE->value)
        ->name('stock-management.destroy');

    //route customer history
    Route::get('/customers/{customer}/history', [CustomerController::class, 'getHistory'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('customers.history');

    //route customer store via AJAX (no redirect)
    Route::post('/customers/store-ajax', [CustomerController::class, 'storeAjax'])->middleware('permission:'.PermissionEnums::CUSTOMERS_CREATE->value)->name('customers.storeAjax');

    //route transaction
    Route::get('/transactions', [TransactionController::class, 'index'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.index');

    //route transaction searchProduct
    Route::post('/transactions/searchProduct', [TransactionController::class, 'searchProduct'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.searchProduct');

    //route transaction addToCart
    Route::post('/transactions/addToCart', [TransactionController::class, 'addToCart'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.addToCart');

    //route transaction destroyCart
    Route::delete('/transactions/{cart_id}/destroyCart', [TransactionController::class, 'destroyCart'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.destroyCart');

    //route transaction clearCart
    Route::delete('/transactions/clearCart', [TransactionController::class, 'clearCart'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.clearCart');

    //route transaction updateCart
    Route::patch('/transactions/{cart_id}/updateCart', [TransactionController::class, 'updateCart'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.updateCart');

    //route hold transaction
    Route::post('/transactions/hold', [TransactionController::class, 'holdCart'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.hold');
    Route::post('/transactions/{holdId}/resume', [TransactionController::class, 'resumeCart'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.resume');
    Route::delete('/transactions/{holdId}/clearHold', [TransactionController::class, 'clearHold'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.clearHold');
    Route::get('/transactions/held', [TransactionController::class, 'getHeldCarts'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.held');

    //route transaction store
    Route::post('/transactions/store', [TransactionController::class, 'store'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.store');
    Route::get('/transactions/{invoice}/print', [TransactionController::class, 'print'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.print');
    Route::get('/transactions/history', [TransactionController::class, 'history'])->middleware('permission:'.PermissionEnums::TRANSACTIONS_ACCESS->value)->name('transactions.history');

    Route::get('/settings/payments', [PaymentSettingController::class, 'edit'])->middleware('permission:'.PermissionEnums::SETTINGS_ACCESS->value)->name('settings.payments.edit');
    Route::put('/settings/payments', [PaymentSettingController::class, 'update'])->middleware('permission:'.PermissionEnums::SETTINGS_ACCESS->value)->name('settings.payments.update');
    Route::get('/settings/store', [StoreSettingController::class, 'edit'])->middleware('permission:'.PermissionEnums::SETTINGS_ACCESS->value)->name('settings.store.edit');
    Route::put('/settings/store', [StoreSettingController::class, 'update'])->middleware('permission:'.PermissionEnums::SETTINGS_ACCESS->value)->name('settings.store.update');

    //reports
    Route::get('/reports/sales', [SalesReportController::class, 'index'])->middleware('permission:'.PermissionEnums::REPORTS_ACCESS->value)->name('reports.sales.index');
    Route::get('/reports/profits', [ProfitReportController::class, 'index'])->middleware('permission:'.PermissionEnums::PROFITS_ACCESS->value)->name('reports.profits.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';