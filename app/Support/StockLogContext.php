<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Model;

class StockLogContext
{
    protected static ?string $modelType = null;
    protected static ?int $modelId = null;
    protected static ?string $description = null;

    public static function set(?Model $model = null, ?string $description = null): void
    {
        static::$modelType   = $model ? $model::class : null;
        static::$modelId     = $model?->getKey() ? (int) $model->getKey() : null;
        static::$description = $description;
    }

    public static function clear(): void
    {
        static::$modelType   = null;
        static::$modelId     = null;
        static::$description = null;
    }

    public static function modelType(): ?string
    {
        return static::$modelType;
    }

    public static function modelId(): ?int
    {
        return static::$modelId;
    }

    public static function description(): ?string
    {
        return static::$description;
    }
}
