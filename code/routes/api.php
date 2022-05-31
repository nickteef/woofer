<?php

use App\Models\Ratings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Woof;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('woofs', function (Request $request) {
    return Woof::orderBy('created_at', 'desc')->get();
});

Route::get("woof/{id}", function($id){
	return Woof::find($id);
});

Route::get("woof/search/{search}",function(Request $request, $search){
	return Woof::where("title","like","%$search%")
			->orWhere("text","like","%$search%")
			->get();
});

Route::get("user/{id}",function(Request $request, $id){
	return User::find($id);
});

Route::get("woof/count/up/{id}",function(Request $request,$id){
	return Ratings::where("woofId",$id)->where("upvoted",1)->count();
});
Route::get("woof/count/down/{id}",function(Request $request,$id){
	return Ratings::where("woofId",$id)->where("downvoted",1)->count();
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
