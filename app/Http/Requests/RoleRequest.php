<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class RoleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $role = $this->route('role');
        $roleId = $role?->id;

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Role::class, 'name')->ignore($roleId),
            ],
            'selectedPermission' => ['required', 'array', 'min:1'],
            'selectedPermission.*' => ['required', 'integer', 'exists:permissions,id'],
        ];
    }
}
