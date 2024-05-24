<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Events\CoordinateSent;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/courier', function () {
        return inertia('Courier');
    })->name('courier');

    Route::post('/courier', function (Request $request) {
        $coordinates = $request->all();

        CoordinateSent::dispatch($coordinates['lat'], $coordinates['lng']);
    })->name('courier.coords');

    Route::get('/admin', function () {
        return inertia('Admin');
    })->name('admin');
});

require __DIR__ . '/auth.php';
