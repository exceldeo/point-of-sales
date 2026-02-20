<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $editableUser = $this->route('user');

        $emailUniqueRule = Rule::unique(User::class, 'email');

        if ($editableUser instanceof User) {
            $emailUniqueRule->ignore($editableUser->id);
        }

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', $emailUniqueRule],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            
        ];
    }
}