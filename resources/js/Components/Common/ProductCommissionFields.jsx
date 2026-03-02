import React, { useEffect, useMemo, useState } from "react";
import Input from "@/Components/Common/Input";
import toast from "react-hot-toast";

export default function ProductCommissionFields({
    users,
    commissions,
    setData,
    errors,
}) {
    const [bulkType, setBulkType] = useState("percentage");
    const [bulkValue, setBulkValue] = useState("");
    const [applyTarget, setApplyTarget] = useState("all");
    const [selectedRows, setSelectedRows] = useState([]);
    const [isToolsExpanded, setIsToolsExpanded] = useState(false);
    const [search, setSearch] = useState("");

    const usersById = useMemo(
        () => new Map(users.map((user) => [String(user.id), user])),
        [users],
    );

    useEffect(() => {
        const commissionByUserId = new Map(
            commissions.map((commission) => [
                String(commission.user_id),
                commission,
            ]),
        );

        const normalizedCommissions = users.map((user) => {
            const existing = commissionByUserId.get(String(user.id));

            return {
                user_id: String(user.id),
                type: existing?.type || "percentage",
                value: existing?.value ?? "",
            };
        });

        const isSame =
            normalizedCommissions.length === commissions.length &&
            normalizedCommissions.every((item, index) => {
                const current = commissions[index];

                return (
                    String(current?.user_id || "") === String(item.user_id) &&
                    String(current?.type || "") === String(item.type) &&
                    String(current?.value ?? "") === String(item.value ?? "")
                );
            });

        if (!isSame) {
            setData("commissions", normalizedCommissions);
        }
    }, [users, commissions, setData]);

    useEffect(() => {
        setSelectedRows((prev) =>
            prev.filter((rowIndex) => rowIndex < commissions.length),
        );
    }, [commissions.length]);

    const updateCommissionField = (index, field, value) => {
        setData(
            "commissions",
            commissions.map((item, rowIndex) =>
                rowIndex === index ? { ...item, [field]: value } : item,
            ),
        );
    };

    const filteredRows = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return commissions
            .map((commission, index) => ({
                commission,
                index,
                user: usersById.get(String(commission.user_id)),
            }))
            .filter(({ user }) => {
                if (!keyword) return true;

                const name = String(user?.name || "").toLowerCase();
                const email = String(user?.email || "").toLowerCase();

                return name.includes(keyword) || email.includes(keyword);
            });
    }, [commissions, usersById, search]);

    const toggleSelectedRow = (index) => {
        setSelectedRows((prev) =>
            prev.includes(index)
                ? prev.filter((rowIndex) => rowIndex !== index)
                : [...prev, index],
        );
    };

    const applyBulkCommission = () => {
        if (bulkValue === "") return;

        const targetRows =
            applyTarget === "selected"
                ? new Set(selectedRows)
                : new Set(commissions.map((_, index) => index));

        setData(
            "commissions",
            commissions.map((item, index) =>
                targetRows.has(index)
                    ? {
                          ...item,
                          type: bulkType,
                          value: bulkValue,
                      }
                    : item,
            ),
        );

        toast.success("Komisi massal berhasil diterapkan.");
    };

    const resetCommissionValues = () => {
        setData(
            "commissions",
            commissions.map((item) => ({
                ...item,
                value: "",
            })),
        );

        toast.success("Semua nilai komisi berhasil di-reset.");
    };

    const setZeroCommission = () => {
        const targetRows =
            applyTarget === "selected"
                ? new Set(selectedRows)
                : new Set(commissions.map((_, index) => index));

        if (applyTarget === "selected" && targetRows.size === 0) {
            toast.error("Pilih minimal satu baris terlebih dahulu.");
            return;
        }

        setData(
            "commissions",
            commissions.map((item, index) =>
                targetRows.has(index)
                    ? {
                          ...item,
                          value: "0",
                      }
                    : item,
            ),
        );

        toast.success(
            applyTarget === "selected"
                ? "Komisi terpilih diubah ke 0."
                : "Semua komisi diubah ke 0.",
        );
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Komisi Pengguna
                </h3>
            </div>

            <div className="mb-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <div className="p-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Pengaturan cepat komisi
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsToolsExpanded((prev) => !prev)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        {isToolsExpanded ? "Sembunyikan" : "Tampilkan"}
                    </button>
                </div>

                {isToolsExpanded && (
                    <div className="grid grid-cols-1 gap-3 px-3 pb-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Update komisi massal
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                                <select
                                    value={bulkType}
                                    onChange={(e) =>
                                        setBulkType(e.target.value)
                                    }
                                    className="h-11 px-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                                >
                                    <option value="percentage">%</option>
                                    <option value="nominal">Rp</option>
                                </select>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={bulkValue}
                                    onChange={(e) =>
                                        setBulkValue(e.target.value)
                                    }
                                    placeholder="Nilai"
                                    className="h-11 px-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                                />
                                <select
                                    value={applyTarget}
                                    onChange={(e) =>
                                        setApplyTarget(e.target.value)
                                    }
                                    className="h-11 px-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                                >
                                    <option value="all">Semua</option>
                                    <option value="selected">Terpilih</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={applyBulkCommission}
                                    className="h-11 px-3 text-sm rounded-xl bg-primary-500 text-white hover:bg-primary-600"
                                >
                                    Terapkan
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={resetCommissionValues}
                                    className="h-11 px-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Reset semua nilai
                                </button>
                                <button
                                    type="button"
                                    onClick={setZeroCommission}
                                    className="h-11 px-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    Set 0 (
                                    {applyTarget === "selected"
                                        ? "Terpilih"
                                        : "Semua"}
                                    )
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Cari karyawan
                    </label>
                    <Input
                        type="text"
                        label=""
                        placeholder="Cari nama atau email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900/70">
                        <tr>
                            <th className="w-14 px-3 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={
                                        filteredRows.length > 0 &&
                                        filteredRows.every(({ index }) =>
                                            selectedRows.includes(index),
                                        )
                                    }
                                    onChange={() => {
                                        const visibleIndexes = filteredRows.map(
                                            ({ index }) => index,
                                        );
                                        const isAllVisibleSelected =
                                            visibleIndexes.length > 0 &&
                                            visibleIndexes.every((index) =>
                                                selectedRows.includes(index),
                                            );

                                        if (isAllVisibleSelected) {
                                            setSelectedRows((prev) =>
                                                prev.filter(
                                                    (index) =>
                                                        !visibleIndexes.includes(
                                                            index,
                                                        ),
                                                ),
                                            );
                                        } else {
                                            setSelectedRows((prev) =>
                                                Array.from(
                                                    new Set([
                                                        ...prev,
                                                        ...visibleIndexes,
                                                    ]),
                                                ),
                                            );
                                        }
                                    }}
                                    className="mt-2 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                                />
                            </th>
                            <th className="px-3 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                                User
                            </th>
                            <th className="w-44 px-3 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                                Tipe
                            </th>
                            <th className="w-52 px-3 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                                Nilai
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {filteredRows.map(({ commission, index, user }) => (
                            <tr key={index}>
                                <td className="px-3 py-3 align-top">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(index)}
                                        onChange={() =>
                                            toggleSelectedRow(index)
                                        }
                                        className="mt-2 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                                    />
                                </td>
                                <td className="px-3 py-3 align-top">
                                    <div className="h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center">
                                        <span className="truncate">
                                            {user?.name || "-"} (
                                            {user?.email || "-"})
                                        </span>
                                    </div>
                                    {errors[`commissions.${index}.user_id`] && (
                                        <small className="mt-1 block text-xs text-danger-500 dark:text-danger-400">
                                            {
                                                errors[
                                                    `commissions.${index}.user_id`
                                                ]
                                            }
                                        </small>
                                    )}
                                </td>
                                <td className="px-3 py-3 align-top">
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
                                        <option value="percentage">
                                            Percentage
                                        </option>
                                        <option value="nominal">Nominal</option>
                                    </select>
                                    {errors[`commissions.${index}.type`] && (
                                        <small className="mt-1 block text-xs text-danger-500 dark:text-danger-400">
                                            {
                                                errors[
                                                    `commissions.${index}.type`
                                                ]
                                            }
                                        </small>
                                    )}
                                </td>
                                <td className="px-3 py-3 align-top">
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
                                        label=""
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
                                </td>
                            </tr>
                        ))}

                        {filteredRows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-3 py-6 text-center text-sm text-slate-500 dark:text-slate-400"
                                >
                                    Tidak ada data karyawan yang sesuai
                                    pencarian.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {errors.commissions && (
                    <small className="block p-3 text-xs text-danger-500 dark:text-danger-400">
                        {errors.commissions}
                    </small>
                )}
            </div>
        </div>
    );
}
