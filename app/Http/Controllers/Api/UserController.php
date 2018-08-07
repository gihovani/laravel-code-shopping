<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Events\UserCreatedEvent;
use CodeShopping\Http\Filters\UserFilter;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use CodeShopping\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;

class UserController extends Controller
{
    use OnlyTrashed;

    public function index()
    {
        /** @var UserFilter $filter */
        $filter = app(UserFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = User::filtered($filter);

        $query = $this->onlyTrashedIfRequested($filterQuery);
        $users = $query->paginate();
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        $user->refresh();
        event(new UserCreatedEvent($user));
        return response()->json(new UserResource($user), 201);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }

    public function restore(User $user)
    {
        $user->restore();
        return response()->json([], 204);
    }
}
