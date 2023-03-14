<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getAuthenticatedUser(Request $request)
    {
        return response($request->user());
    }
}
