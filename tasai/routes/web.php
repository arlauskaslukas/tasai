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

//REMINDER FOR MYSELF: CSRF IS FOKIN DISABLED.
//ENABLE WHEN POSTING INTO PRODUCTION OR YOU ARE A SHIT DEV

//Public routes
Route::get('/api/users/{id}', [App\Http\Controllers\UserController::class, 'show']);

Route::get('/api/progresstrackers', [App\Http\Controllers\ProgressTrackerController::class, 'index']);
Route::get('/api/progresstrackers/{id}', [App\Http\Controllers\ProgressTrackerController::class, 'show']);

Route::get('/api/courses', [App\Http\Controllers\CourseController::class, 'index']);
Route::get('/api/courses/{id}', [App\Http\Controllers\CourseController::class, 'show']);
Route::get('/api/courses/{course_id}/topics', [App\Http\Controllers\CourseController::class, 'course_topics']);
Route::get('api/courses/{course_id}/assignments', [App\Http\Controllers\CourseController::class, 'course_assignments']);

Route::get('/api/topics', [App\Http\Controllers\TopicController::class, 'index']);
Route::get('/api/topics/{id}', [App\Http\Controllers\TopicController::class, 'show']);

Route::get('/api/assignments', [App\Http\Controllers\AssignmentController::class, 'index']);
Route::get('/api/assignments/{id}', [App\Http\Controllers\AssignmentController::class, 'show']);

Route::get('/api/attendances', [App\Http\Controllers\AttendanceEntryController::class, 'index']);
Route::get('/api/attendances/{id}', [App\Http\Controllers\AttendanceEntryController::class, 'show']);

Route::get('/api/timetables', [App\Http\Controllers\TimetableEntryController::class, 'index']);
Route::get('/api/timetables/{id}', [App\Http\Controllers\TimetableEntryController::class, 'show']);

Route::get('/api/assignmententries', [App\Http\Controllers\AssignmentEntryController::class, 'index']);
Route::get('/api/assignmententries/{id}', [App\Http\Controllers\AssignmentEntryController::class, 'show']);

Route::get('/api/media', [App\Http\Controllers\MediaController::class, 'index']);
Route::get('/api/media/{id}', [App\Http\Controllers\MediaController::class, 'show']);

//auth routes
Route::post('/api/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/api/login', [\App\Http\Controllers\AuthController::class, 'login']);

//protected routes
Route::group(['middleware'=>['auth:sanctum']], function(){
    //auth functions
    Route::post('/api/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('/api/refreshtoken', [\App\Http\Controllers\AuthController::class, 'refresh']);
    //other functions available to user
    Route::post('/api/assignmententries', [App\Http\Controllers\AssignmentEntryController::class, 'store']);
    Route::put('/api/assignmententries', [App\Http\Controllers\AssignmentEntryController::class, 'update']);
    Route::delete('/api/assignmententries', [App\Http\Controllers\AssignmentEntryController::class, 'destroy']);
    Route::post('/api/attendances', [App\Http\Controllers\AttendanceEntryController::class, 'store']);
    Route::put('/api/attendances', [App\Http\Controllers\AttendanceEntryController::class, 'update']);
    Route::post('/api/progresstrackers', [App\Http\Controllers\ProgressTrackerController::class, 'store']);
    Route::put('/api/progresstrackers/', [App\Http\Controllers\ProgressTrackerController::class, 'update']);
    Route::get('/api/users/{user_id}/progresstrackers', [App\Http\Controllers\UserController::class, 'progress_trackers']);
    Route::get('/api/users/{user_id}/courseprogress/{course_id}', [App\Http\Controllers\UserController::class, 'course_progress']);
    //admin-protected routes
    Route::group(['middleware'=>['admin']], function() {
        Route::post('/api/timetables', [App\Http\Controllers\TimetableEntryController::class, 'store']);
        Route::put('/api/timetables', [App\Http\Controllers\TimetableEntryController::class, 'update']);
        Route::delete('/api/timetables', [App\Http\Controllers\TimetableEntryController::class, 'destroy']);
        Route::post('/api/topics', [App\Http\Controllers\TopicController::class, 'store']);
        Route::put('/api/topics', [App\Http\Controllers\TopicController::class, 'update']);
        Route::delete('/api/topics', [App\Http\Controllers\TopicController::class, 'destroy']);
        Route::delete('/api/progresstrackers', [App\Http\Controllers\ProgressTrackerController::class, 'destroy']);
        Route::get('/api/recentjoins', [App\Http\Controllers\ProgressTrackerController::class, 'recentJoins']);
        Route::post('/api/assignments', [App\Http\Controllers\AssignmentController::class, 'store']);
        Route::put('/api/assignments', [App\Http\Controllers\AssignmentController::class, 'update']);
        Route::delete('/api/assignments', [App\Http\Controllers\AssignmentController::class, 'destroy']);
        Route::post('/api/users', [App\Http\Controllers\UserController::class, 'store']);
        Route::put('/api/users', [App\Http\Controllers\UserController::class, 'update']);
        Route::delete('/api/users', [App\Http\Controllers\UserController::class, 'destroy']);
        Route::post('/api/media', [App\Http\Controllers\MediaController::class, 'store']);
        Route::put('/api/media', [App\Http\Controllers\MediaController::class, 'update']);
        Route::delete('/api/media', [App\Http\Controllers\MediaController::class, 'destroy']);
        Route::delete('/api/attendances', [App\Http\Controllers\AttendanceEntryController::class, 'destroy']);
        Route::post('/api/courses', [App\Http\Controllers\CourseController::class, 'store']);
        Route::put('/api/courses', [App\Http\Controllers\CourseController::class, 'update']);
        Route::delete('/api/courses/{id}', [App\Http\Controllers\CourseController::class, 'destroy']);
        Route::get('/api/users', [App\Http\Controllers\UserController::class, 'index']);
        Route::get('/api/blockedusers', [App\Http\Controllers\UserController::class, 'getBlockedUsers']);
        Route::post('/api/getlasttopicorder', [App\Http\Controllers\TopicController::class, 'getAvailableTopicOrder']);
        Route::post('/api/restoreuser', [App\Http\Controllers\UserController::class, 'restoreBlocked']);
    });
});

//for all other routes - 404 not found
Route::get('/api/{route?}', function () {
    return response('', 404);
});
Route::post('/api/{route?}', function () {
    return response('', 404);
});
Route::put('/api/{route?}', function () {
    return response('', 404);
});
Route::post('/api/{route?}', function () {
    return response('', 404);
});
Route::delete('/api/{route?}', function () {
    return response('', 404);
});


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
