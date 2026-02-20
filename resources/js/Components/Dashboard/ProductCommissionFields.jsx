import React from "react";
import Input from "@/Components/Dashboard/Input";

export default function ProductCommissionFields({
    users,
    commissions,
    setData,
    errors,
}) {
    const addCommissionRow = () => {
        setData("commissions", [
            ...commissions,
            { user_id: "", type: "percentage", value: "" },
        ]);
    };

    const removeCommissionRow = (index) => {
        setData(
            "commissions",
            commissions.filter((_, rowIndex) => rowIndex !== index),
        );
    };

    const updateCommissionField = (index, field, value) => {
        setData(
            "commissions",
            commissions.map((item, rowIndex) =>
                rowIndex === index ? { ...item, [field]: value } : item,
            ),
        );
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Komisi Pengguna
                </h3>
                <button
                    type="button"
                    onClick={addCommissionRow}
                    className="px-3 py-2 text-xs rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                >
                    + Tambah Komisi
                </button>
            </div>

            <div className="space-y-3">
                {commissions.map((commission, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
                    >
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                User
                            </label>
                            <select
                                value={commission.user_id}
                                onChange={(e) =>
                                    updateCommissionField(
                                        index,
                                        "user_id",
                                        e.target.value,
                                    )
                                }
                                className="w-full h-11 px-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                            >
                                <option value="">Pilih pengguna</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                            {errors[`commissions.${index}.user_id`] && (
                                <small className="text-xs text-danger-500 dark:text-danger-400">
                                    {errors[`commissions.${index}.user_id`]}
                                </small>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Tipe
                            </label>
                            <select
                                value={commission.type}
                                onChange={(e) =>
                                    updateCommissionField(
                                        index,
                                        "type",
                                        e.target.value,
                                    )
                                }
                                className="w-full h-11 px-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                            >
                                <option value="percentage">Percentage</option>
                                <option value="nominal">Nominal</option>
                            </select>
                            {errors[`commissions.${index}.type`] && (
                                <small className="text-xs text-danger-500 dark:text-danger-400">
                                    {errors[`commissions.${index}.type`]}
                                </small>
                            )}
                        </div>

                        <div className="flex gap-2 items-end">
                            <div className="flex-1">
                                <Input
                                    prefix={
                                        commission.type === "percentage"
                                            ? ""
                                            : "Rp"
                                    }
                                    suffix={
                                        commission.type === "percentage"
                                            ? "%"
                                            : ""
                                    }
                                    type="number"
                                    step="0.01"
                                    label="Nilai"
                                    value={commission.value}
                                    onChange={(e) =>
                                        updateCommissionField(
                                            index,
                                            "value",
                                            e.target.value,
                                        )
                                    }
                                    errors={
                                        errors[`commissions.${index}.value`]
                                    }
                                    placeholder="0"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeCommissionRow(index)}
                                className="h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-danger-500"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}

                {errors.commissions && (
                    <small className="text-xs text-danger-500 dark:text-danger-400">
                        {errors.commissions}
                    </small>
                )}
            </div>
        </div>
    );
}
