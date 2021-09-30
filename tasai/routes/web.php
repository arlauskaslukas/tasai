<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//users
Route::get('/api/users', [App\Http\Controllers\UserController::class, 'index']);
Route::get('/api/users/{id}', [App\Http\Controllers\UserController::class, 'show']);
Route::post('/api/users/insert', [App\Http\Controllers\UserController::class, 'create']);
Route::get('/api/users/csrf', [App\Http\Controllers\UserController::class, 'csrftoken']);

Route::get('/{route?}', function () {
    return view('app');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
