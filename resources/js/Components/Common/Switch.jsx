export default function Switch({
    label,
    checked = false,
    onChange,
    errors,
    disabled = false,
}) {
    return (
        <div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-label={label}
                    disabled={disabled}
                    onClick={() => onChange?.(!checked)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                        checked
                            ? "bg-primary-500"
                            : "bg-slate-200 dark:bg-slate-700"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                            checked ? "translate-x-5" : "translate-x-0.5"
                        }`}
                    />
                </button>

                {label && (
                    <label className="text-sm text-gray-700 dark:text-gray-400">
                        {label}
                    </label>
                )}
            </div>

            {errors && <small className="text-xs text-red-500">{errors}</small>}
        </div>
    );
}
