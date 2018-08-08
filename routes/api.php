<?php
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
Route::group([
    'namespace' => 'Api',
    'as' => 'api.'
], function () {
    Route::name('login')->post('login', 'AuthController@login');
    Route::name('refresh')->post('refresh', 'AuthController@refresh');
    Route::name('products.index')->get('products', 'ProductController@index')->middleware('auth:api');

    Route::group(['middleware' => ['auth:api', 'jwt.refresh']], function () {
//    Route::group([], function () {
        Route::name('logout')->post('logout', 'AuthController@logout');
        Route::name('me')->get('me', 'AuthController@me');
        Route::patch('products/{product}/restore', 'ProductController@restore');
        Route::resource('products', 'ProductController', [
            'except' => [
                'index',
                'create',
                'edit'
            ]
        ]);
        Route::resource('products.categories', 'ProductCategoryController', [
            'only' => [
                'index',
                'store',
                'destroy'
            ]
        ]);
        Route::resource('products.photos', 'ProductPhotoController', [
            'except' => [
                'create',
                'edit'
            ]
        ]);
        Route::resource('product_inputs', 'ProductInputController', [
            'only' => [
                'store',
                'index',
                'show'
            ]
        ]);
        Route::resource('product_outputs', 'ProductOutputController', [
            'only' => [
                'store',
                'index',
                'show'
            ]
        ]);
        Route::resource('categories', 'CategoryController', [
            'except' => [
                'create',
                'edit'
            ]
        ]);
        Route::patch('users/{user}/restore', 'UserController@restore');
        Route::resource('users', 'UserController', [
            'except' => [
                'create',
                'edit'
            ]
        ]);

    });
});