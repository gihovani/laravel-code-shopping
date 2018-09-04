<?php

namespace CodeShopping\Rules;

use CodeShopping\Firebase\Auth;
use CodeShopping\Models\UserProfile;
use Illuminate\Contracts\Validation\Rule;

class PhoneNumberUnique implements Rule
{
    /**
     * @var null
     */
    private $ignoreUserId;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($ignoreUserId = null)
    {
        $this->ignoreUserId = $ignoreUserId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string $attribute
     * @param  mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $firebaseAuth = app(Auth::class);
        try {
            $phoneNumber = $firebaseAuth->phoneNumber($value);
            $query = UserProfile::where('phone_number', $phoneNumber);

            $profile = $query->first();
            return is_null($profile) || ($this->ignoreUserId != null && $this->ignoreUserId == $profile->user->id);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.phonenumberunique');
    }
}
