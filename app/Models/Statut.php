<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Statut extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function commandes(): HasMany
    {
        return $this->hasMany(Commande::class);
    }
}
