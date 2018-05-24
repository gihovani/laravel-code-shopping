<?php

namespace CodeShopping\Providers;

use CodeShopping\Models\ProductOutput;
use CodeShopping\Observers\ProductInputObserver;
use CodeShopping\Models\ProductInput;
use CodeShopping\Observers\ProductOutputObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ProductInput::observe(ProductInputObserver::class);
        ProductOutput::observe(ProductOutputObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
