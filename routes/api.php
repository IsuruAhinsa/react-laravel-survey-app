<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [DashboardController::class, 'getAuthenticatedUser']);
    Route::apiResource('surveys', SurveyController::class);
    Route::post('/logout', [LoginController::class, 'logout']);
});

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/survey/{survey:slug}', [SurveyController::class, 'getBySlug']);
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
