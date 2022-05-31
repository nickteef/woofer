<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Woof;
use App\Models\Ratings;

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

Auth::routes();

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware('auth')->post("woof", function(Request $request){
	$user = $request->user();
	$woof = new Woof();
	$woof->title = $request->input("title");
	$woof->text = $request->input("text");
	$woof->user_id = $user->id;
	$woof->upvotes = 0;
	$woof->downvotes = 0;
	$woof->save();
	return $woof;
});

Route::middleware("auth")->post("upwoof",function(Request $request){
	$rating = Ratings::where("userId",$request->user()->id)->where("woofId",$request->input("woof_id"))->first();
	if($rating == null){
		$rating = new Ratings();
		$rating->userId = $request->user()->id;
		$rating->woofId = $request->input("woof_id");
		$rating->upvoted = 1;
	}
	$rating->upvoted = !$rating->upvoted;
	$rating->downvoted = 0;
	$rating->save();
	return $rating;
});

Route::middleware("auth")->post("downwoof",function(Request $request){
	$rating = Ratings::where("userId",$request->user()->id)->where("woofId",$request->input("woof_id"))->first();
	if($rating == null){
		$rating = new Ratings();
		$rating->userId = $request->user()->id;
		$rating->woofId = $request->input("woof_id");
		$rating->downvoted = 1;
	}
	$rating->downvoted = !$rating->downvoted;
	$rating->upvoted = 0;
	$rating->save();
	return $rating;
});

Route::middleware("auth")->post("isupwoofed",function(Request $request){
	$isWoofed = Ratings::where("userId",$request->user()->id)->where("woofId",$request->input("woof_id"))->where("upvoted",1)->first();
	return $isWoofed == null ? 0 : 1;
});

Route::middleware("auth")->post("isdownwoofed",function(Request $request){
	$isWoofed = Ratings::where("userId",$request->user()->id)->where("woofId",$request->input("woof_id"))->where("downvoted",1)->first();
	return $isWoofed == null ? 0 : 1;
});

Route::middleware("auth")->get("woof/{id}/delete",function(Request $request, $id){
	$woof = Woof::find($id);
	$woof->delete();
	return $woof;
});


Route::middleware("auth")->post("woof/{id}/edit",function(Request $request, $id){
	$woof = Woof::find($id);
	$woof->title = $request->input("title");
	$woof->text = $request->input("text");
	$woof->save();
	return $woof;
});


Route::middleware("auth")->post("/user/id",function(Request $request){
	return $request->user()->id;
});
