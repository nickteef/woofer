<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Ratings extends Model{
    protected $table="ratings";
    protected $fillable = ['userId', 'woofId', 'upvoted', 'downvoted'];
    public function user(){
        return $this->belongsTo(User::class);
    }
	public function woof(){
		return $this->belongsTo(Woof::class);
	}
}
?>