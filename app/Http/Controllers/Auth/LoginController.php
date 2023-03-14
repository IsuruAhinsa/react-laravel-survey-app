<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse();
        }

        return $this->sendFailedLoginResponse();
    }

    protected function attemptLogin($request)
    {
        return auth()->guard()->attempt($this->credentials($request), $request->boolean('remember'));
    }

    protected function credentials($request)
    {
        return $request->only('email', 'password');
    }

    protected function sendLoginResponse()
    {
        $user = auth()->guard()->user();

        $token = $user->createToken('basic')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * @throws ValidationException
     */
    protected function sendFailedLoginResponse()
    {
        throw ValidationException::withMessages([
            'email' => [trans('auth.failed')]
        ]);
    }

    public function logout()
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();
        return response([
            'success' => true,
        ]);
    }
}
