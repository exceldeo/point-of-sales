<?php

namespace App\Enums;

enum PaymentMethodEnums: string
{
    case CASH = 'cash';
    case QR_CODE = 'qrcode';

    public function label(): string
    {
        return match ($this) {
            self::CASH => 'Tunai',
            self::QR_CODE => 'QRIS',
        };
    }

    public static function options(): array
    {
        return array_map(fn ($type) => [
            'value' => $type->value,
            'label' => $type->label(),
        ], self::cases());
    }

    public static function getLabelByValue(string $value): ?string
    {
        return self::tryFrom($value)?->label();
    }

    public static function getAllOptionsValues(): array
    {
        return array_column(self::options(), 'value');
    }
}