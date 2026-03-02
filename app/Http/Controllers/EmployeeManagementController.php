<?php

namespace App\Http\Controllers;

use App\Models\LogCommission;
use App\Models\User;
use Inertia\Inertia;

class EmployeeManagementController extends Controller
{
    public function index()
    {
        $filters = [
            'search' => request('search'),
        ];

        $employees = User::query()->with('roles:id,name')
            ->where('is_employee', true)
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

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'filters' => $filters,
        ]);
    }

    public function getEmployees($keyword = null)
    {
        $employees = User::query()->with('roles:id,name')
            ->withSum('logCommissions as total_commission', 'nominal')
            ->where('is_employee', true)
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

    public function withdrawCommission(User $employee)
    {
        if (!$employee->is_employee) {
            return back()->withErrors([
                'withdraw' => 'User bukan karyawan.',
            ]);
        }

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