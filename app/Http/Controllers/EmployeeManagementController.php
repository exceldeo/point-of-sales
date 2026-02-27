<?php

namespace App\Http\Controllers;

use App\Models\EmployeeRole;
use App\Models\LogCommission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class EmployeeManagementController extends Controller
{
    public function index()
    {
        $filters = [
            'search' => request('search'),
        ];

        $employeeRoles = EmployeeRole::query()
            ->with('permissionGroup')
            ->select('id', 'permission_group_id')
            ->get();

        $employees = User::query()->with('roles:id,name')
            ->whereHas('roles', function ($query) use ($employeeRoles) {
                $query->whereIn('id', $employeeRoles->pluck('permission_group_id'));
            })
            ->when($filters['search'], function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->with('logCommissions:id,user_id,nominal')
            ->select('id', 'name', 'email')
            ->latest()
            ->paginate(20);

        $permissionGroups = Role::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'permissionGroups' => $permissionGroups,
            'employeeRoles' => $employeeRoles,
            'filters' => $filters,
        ]);
    }

    public function updatePermissionGroup(Request $request)
    {
        $data = $request->validate([
            'selectedPermissionGroup' => ['required', 'array'],
        ]);

        DB::transaction(function () use ($data) {
            // update employee role data. if employee role data not exist, create new one and if not in selectedPermissionGroup, delete employee role data
            EmployeeRole::query()->whereNotIn('permission_group_id', $data['selectedPermissionGroup'])->delete();
            foreach ($data['selectedPermissionGroup'] as $permissionGroupId) {
                EmployeeRole::query()->updateOrCreate(
                    ['permission_group_id' => $permissionGroupId]
                );
            }
        });

        return back();
    }

    public function getEmployees($keyword = null)
    {
        $employeeRoles = EmployeeRole::query()
            ->with('permissionGroup')
            ->select('id', 'permission_group_id')
            ->get();

        $employees = User::query()->with('roles:id,name')
            ->withSum('logCommissions as total_commission', 'nominal')
            ->whereHas('roles', function ($query) use ($employeeRoles) {
                $query->whereIn('id', $employeeRoles->pluck('permission_group_id'));
            })
            ->when($keyword, function ($query, $keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', '%' . $keyword . '%')
                        ->orWhere('email', 'like', '%' . $keyword . '%');
                });
            })
            ->select('id', 'name', 'email')
            ->latest()
            ->get();

        return $employees;
    }

    public function getEmployeeRoles()
    {
        $employeeRoles = EmployeeRole::query()
            ->with('permissionGroup')
            ->select('id', 'permission_group_id')
            ->get();

        return $employeeRoles;
    }

    public function withdrawCommission(User $employee)
    {
        $outstandingCommission = (int) $employee->logCommissions()->sum('nominal');

        if ($outstandingCommission <= 0) {
            return back()->withErrors([
                'withdraw' => 'Komisi karyawan tidak tersedia untuk withdraw.',
            ]);
        }

        LogCommission::query()->create([
            'user_id' => $employee->id,
            'nominal' => $outstandingCommission * -1,
            'description' => 'Withdraw komisi karyawan',
        ]);

        return back();
    }
}