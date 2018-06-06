<?php

namespace CodeShopping\Providers;

use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'CodeShopping\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();

        Route::bind('category', function ($value){
            $collection = Category::whereId($value)->orWhere('slug', $value)->get();
            return $collection->first();
        });
        Route::bind('product', function ($value){
            $query = Product::query();
            $query = $this->onlyTrashedIfRequested($query);
            $collection = $query->whereId($value)->orWhere('slug', $value)->get();
            return $collection->first();
        });
    }

    private function onlyTrashedIfRequested(Builder $builder)
    {
        if (\Request::get('trashed') == 1) {
            $builder = $builder->onlyTrashed();
        }
        return $builder;
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }
}
