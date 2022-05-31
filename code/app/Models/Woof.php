<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Woof extends Model{
    protected $table="woof";
    protected $fillable = ['title', 'user_id', 'text', 'upvotes', 'downvotes'];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
?>