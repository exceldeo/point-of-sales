<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class EmployeeRole extends Model
{
    use HasFactory;

    protected $fillable = [
        'permission_group_id',
    ];

    public function permissionGroup()
    {
        return $this->belongsTo(Role::class, 'permission_group_id');
    }
}