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
    Route::name('login_vendor')->post('login_vendor', 'AuthController@loginFirebase');
    Route::name('refresh')->post('refresh', 'AuthController@refresh');
    Route::name('customers.phone_numbers')
        ->post('customers/phone_numbers', 'CustomerController@requestPhoneNumberUpdate');
    Route::name('customers.update_phone_number')
        ->patch('customers/phone_numbers/{token}', 'CustomerController@updatePhoneNumber');
    Route::name('customers')->post('customers', 'CustomerController@store');

    Route::group(['middleware' => ['auth:api']], function () {
//    Route::group(['middleware' => ['auth:api', 'jwt.refresh']], function () {
        Route::name('profile')->patch('profile', 'UserProfileController@update');

        Route::group(['middleware' => ['can:is_seller']], function () {
            Route::name('logout')->post('logout', 'AuthController@logout');
            Route::name('me')->get('me', 'AuthController@me');
            Route::patch('products/{product}/restore', 'ProductController@restore');
            Route::resource('products', 'ProductController', [
                'except' => [
                    'create',
                    'edit'
                ]
            ]);
            Route::resource('categories', 'CategoryController', [
                'except' => [
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
            Route::patch('users/{user}/restore', 'UserController@restore');
            Route::resource('users', 'UserController', [
                'except' => [
                    'create',
                    'edit'
                ]
            ]);

            Route::resource('chat_groups', 'ChatGroupController', [
                'except' => [
                    'create',
                    'edit'
                ]
            ]);

            Route::resource('chat_groups.users', 'ChatGroupUserController', [
                'only' => [
                    'index',
                    'store',
                    'destroy'
                ]
            ]);

        });
    });
});