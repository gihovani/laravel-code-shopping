<?php

namespace CodeShopping\Providers;

use CodeShopping\Models\ProductOutput;
use CodeShopping\Observers\ProductInputObserver;
use CodeShopping\Models\ProductInput;
use CodeShopping\Observers\ProductOutputObserver;
use Illuminate\Support\ServiceProvider;
use Kreait\Firebase;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Schema::defaultStringLength(191);
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
        $this->app->bind(Firebase::class, function () {
            $serviceAccount = Firebase\ServiceAccount::fromJsonFile(base_path('firebase-admin.json'));
            return (new Firebase\Factory())->withServiceAccount($serviceAccount)->create();
        });
    }
}
