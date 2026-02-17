<?php

namespace App\Http\Controllers;

use App\Models\EmployeeRole;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class EmployeeManagementController extends Controller
{
    public function index()
    {
        $filters = [
            'search' => request('search'),
        ];

        $employeeRoleIds = EmployeeRole::query()
            ->whereNotNull('permission_group_id')
            ->pluck('permission_group_id')
            ->map(fn($id) => (int) $id)
            ->unique()
            ->values();

        $employees = User::query()
            ->when($filters['search'], function ($users, $search) {
                $users->where('name', 'like', '%' . $search . '%');
            })
            ->when($employeeRoleIds->isNotEmpty(), function ($users) use ($employeeRoleIds) {
                $users->whereHas('roles', function ($roles) use ($employeeRoleIds) {
                    $roles->whereIn('roles.id', $employeeRoleIds->all());
                });
            })
            ->with(['roles:id,name'])
            ->latest()
            ->paginate(5)
            ->through(function ($user) use ($employeeRoleIds) {
                $matchedPermissionGroupIds = collect($user->roles)
                    ->pluck('id')
                    ->map(fn($id) => (int) $id)
                    ->intersect($employeeRoleIds)
                    ->values();

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'roles' => $user->roles,
                    'permission_group_ids' => $matchedPermissionGroupIds,
                ];
            });

        $employeeRoles = EmployeeRole::query()
            ->with('permissionGroup:id,name')
            ->select('id', 'permission_group_id')
            ->get();

        $permissionGroups = Role::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('Dashboard/Employees/Index', [
            'employees' => $employees,
            'permissionGroups' => $permissionGroups,
            'employeeRoles' => $employeeRoles,
            'employeeRoleIds' => $employeeRoleIds,
            'filters' => $filters,
        ]);
    }

    public function updatePermissionGroup(Request $request)
    {
        $data = $request->validate([
            'selectedPermissionGroup' => ['required', 'array'],
            'selectedPermissionGroup.*' => ['required', 'integer', 'exists:roles,id'],
        ]);

        $incomingIds = collect($data['selectedPermissionGroup'])
            ->map(fn($id) => (int) $id)
            ->unique()
            ->values();

        $currentIds = EmployeeRole::query()
            ->pluck('permission_group_id')
            ->map(fn($id) => (int) $id)
            ->unique()
            ->values();

        $toDelete = $currentIds->diff($incomingIds)->values();
        $toInsert = $incomingIds->diff($currentIds)->values();

        if ($toDelete->isNotEmpty()) {
            EmployeeRole::query()
                ->whereIn('permission_group_id', $toDelete->all())
                ->delete();
        }

        foreach ($toInsert as $permissionGroupId) {
            EmployeeRole::create([
                'permission_group_id' => $permissionGroupId,
            ]);
        }

        return back();
    }
}