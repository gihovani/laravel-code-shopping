<?php

namespace CodeShopping\Firebase;


use Kreait\Firebase;

trait FirebaseSync
{
    public static function bootFirebaseSync()
    {
        static::created(function ($model) {
            $model->syncFbCreate();
        });

        static::updated(function ($model) {
            $model->syncFbUpdate();
        });

        static::deleted(function ($model) {
            $model->syncFbRemove();
        });
    }

    protected function syncFbCreate()
    {
        $this->syncFbSet();
    }

    protected function syncFbUpdate()
    {
        $this->syncFbSet();
    }

    protected function syncFbSet()
    {
        $this->getModalReference()->update($this->toArray());
    }

    protected function syncFbRemove()
    {
        $this->getModalReference()->remove();
    }

    protected function getModalReference(): Firebase\Database\Reference
    {
        $path = '/' . $this->getTable() . '/' . $this->getKey();
        return $this->getFirebaseDatabase()->getReference($path);
    }

    protected function getFirebaseDatabase(): Firebase\Database
    {
        $firebase = app(Firebase::class);
        return $firebase->getDatabase();
    }
}