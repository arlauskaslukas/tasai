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

//REMINDER FOR MYSELF: CSRF IS FOKIN DISABLED. ENABLE WHEN POSTING INTO PRODUCTION OR YOU ARE A SHIT DEVd
//users
Route::get('/api/users', [App\Http\Controllers\UserController::class, 'index']);
Route::get('/api/users/{id}', [App\Http\Controllers\UserController::class, 'show']);
Route::post('/api/users/insert', [App\Http\Controllers\UserController::class, 'create']);
Route::delete('/api/users/delete', [App\Http\Controllers\UserController::class, 'destroy']);

Route::get('/api/progresstrackers', [App\Http\Controllers\ProgressTrackerController::class,'index']);
Route::get('/api/progresstrackers/{id}', [App\Http\Controllers\ProgressTrackerController::class,'show']);
Route::post('/api/progresstrackers', [App\Http\Controllers\ProgressTrackerController::class,'store']);
Route::post('/api/progresstrackers/update', [App\Http\Controllers\ProgressTrackerController::class,'update']);
Route::delete('/api/progresstrackers/', [App\Http\Controllers\ProgressTrackerController::class,'destroy']);

Route::get('/api/courses',[App\Http\Controllers\CourseController::class,'index']);
Route::get('/api/courses/{id}',[App\Http\Controllers\CourseController::class,'show']);
Route::post('/api/courses/',[App\Http\Controllers\CourseController::class,'store']);
Route::post('/api/courses/update',[App\Http\Controllers\CourseController::class,'update']);
Route::delete('/api/courses/',[App\Http\Controllers\CourseController::class,'destroy']);

Route::get('/api/topics',[App\Http\Controllers\TopicController::class,'index']);
Route::get('/api/topics/{id}',[App\Http\Controllers\TopicController::class,'show']);
Route::post('/api/topics/',[App\Http\Controllers\TopicController::class,'store']);
Route::post('/api/topics/update',[App\Http\Controllers\TopicController::class,'update']);
Route::delete('/api/topics/',[App\Http\Controllers\TopicController::class,'destroy']);

Route::get('/api/assignments',[App\Http\Controllers\AssignmentController::class,'index']);
Route::get('/api/assignments/{id}',[App\Http\Controllers\AssignmentController::class,'show']);
Route::post('/api/assignments/',[App\Http\Controllers\AssignmentController::class,'store']);
Route::post('/api/assignments/update',[App\Http\Controllers\AssignmentController::class,'update']);
Route::delete('/api/assignments/',[App\Http\Controllers\AssignmentController::class,'destroy']);

Route::get('/api/attendances',[App\Http\Controllers\AttendanceEntryController::class,'index']);
Route::get('/api/attendances/{id}',[App\Http\Controllers\AttendanceEntryController::class,'show']);
Route::post('/api/attendances/',[App\Http\Controllers\AttendanceEntryController::class,'store']);
Route::post('/api/attendances/update',[App\Http\Controllers\AttendanceEntryController::class,'update']);
Route::delete('/api/attendances/',[App\Http\Controllers\AttendanceEntryController::class,'destroy']);

Route::get('/api/timetables',[App\Http\Controllers\TimetableEntryController::class,'index']);
Route::get('/api/timetables/{id}',[App\Http\Controllers\TimetableEntryController::class,'show']);
Route::post('/api/timetables/',[App\Http\Controllers\TimetableEntryController::class,'store']);
Route::post('/api/timetables/update',[App\Http\Controllers\TimetableEntryController::class,'update']);
Route::delete('/api/timetables/',[App\Http\Controllers\TimetableEntryController::class,'destroy']);

Route::get('/api/assignmententries',[App\Http\Controllers\AssignmentEntryController::class,'index']);
Route::get('/api/assignmententries/{id}',[App\Http\Controllers\AssignmentEntryController::class,'show']);
Route::post('/api/assignmententries/',[App\Http\Controllers\AssignmentEntryController::class,'store']);
Route::post('/api/assignmententries/update',[App\Http\Controllers\AssignmentEntryController::class,'update']);
Route::delete('/api/assignmententries/',[App\Http\Controllers\AssignmentEntryController::class,'destroy']);

Route::get('/api/media',[App\Http\Controllers\MediaController::class,'index']);
Route::get('/api/media/{id}',[App\Http\Controllers\MediaController::class,'show']);
Route::post('/api/media/',[App\Http\Controllers\MediaController::class,'store']);
Route::post('/api/media/update',[App\Http\Controllers\MediaController::class,'update']);
Route::delete('/api/media/',[App\Http\Controllers\MediaController::class,'destroy']);


Route::get('/{route?}', function () {
    return view('app');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
