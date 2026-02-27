import React, { useState } from "react";
import Input from "@/Components/Common/Input";
import Swal from "sweetalert2";

export default function ProductCommissionFields({
    users,
    employeeRoles = [],
    commissions,
    setData,
    errors,
}) {
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [bulkType, setBulkType] = useState("percentage");
    const [bulkValue, setBulkValue] = useState("");
    const [applyTarget, setApplyTarget] = useState("all");
    const [selectedRows, setSelectedRows] = useState([]);
    const [isToolsExpanded, setIsToolsExpanded] = useState(false);

    const addCommissionRow = () => {
        setData("commissions", [
            ...commissions,
            { user_id: "", type: "percentage", value: "" },
        ]);
    };

    const addEmployeesByRole = () => {
        if (!selectedRoleId) return;

        const existingUserIds = new Set(
            commissions.map((commission) => String(commission.user_id || "")),
        );

        const usersByRole = users.filter((user) =>
            (user.roles || []).some(
                (role) => String(role.id) === selectedRoleId,
            ),
        );

        const rowsToAdd = usersByRole
            .filter((user) => !existingUserIds.has(String(user.id)))
            .map((user) => ({
                user_id: String(user.id),
                type: bulkType,
                value: bulkValue,
            }));

        if (rowsToAdd.length > 0) {
            setData("commissions", [...commissions, ...rowsToAdd]);
        }

        setSelectedRoleId("");

        if (rowsToAdd.length === 0) {
            Swal.fire({
                title: "Info",
                text: "Semua pengguna dengan role tersebut sudah ditambahkan.",
                icon: "info",
                confirmButtonColor: "#6366f1",
            });
        } else {
            Swal.fire({
                title: "Berhasil",
                text: `${rowsToAdd.length} pengguna berhasil ditambahkan.`,
                icon: "success",
                confirmButtonColor: "#6366f1",
            });
        }
    };

    const removeCommissionRow = (index) => {
        setData(
            "commissions",
            commissions.filter((_, rowIndex) => rowIndex !== index),
        );
        setSelectedRows((prev) =>
            prev.filter((rowIndex) => rowIndex !== index),
        );

        Swal.fire({
            title: "Berhasil",
            text: "Komisi berhasil dihapus.",
            icon: "success",
            confirmButtonColor: "#6366f1",
        });
    };

    const updateCommissionField = (index, field, value) => {
        setData(
            "commissions",
            commissions.map((item, rowIndex) =>
                rowIndex === index ? { ...item, [field]: value } : item,
            ),
        );
    };

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

        Swal.fire({
            title: "Berhasil",
            text: "Komisi massal berhasil diterapkan.",
            icon: "success",
            confirmButtonColor: "#6366f1",
        });
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
                                Tambah berdasarkan role karyawan
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={selectedRoleId}
                                    onChange={(e) =>
                                        setSelectedRoleId(e.target.value)
                                    }
                                    className="flex-1 h-11 px-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                                >
                                    <option value="">Pilih role</option>
                                    {employeeRoles.map((role) => (
                                        <option
                                            key={role?.permission_group_id}
                                            value={role?.permission_group_id}
                                        >
                                            {role?.permission_group?.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={addEmployeesByRole}
                                    className="px-3 h-11 text-sm rounded-xl bg-primary-500 text-white hover:bg-primary-600"
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>

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
                        </div>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900/70">
                        <tr>
                            <th className="w-14 px-3 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedRows.length ===
                                            commissions.length &&
                                        commissions.length > 0
                                    }
                                    onChange={() => {
                                        if (
                                            selectedRows.length ===
                                            commissions.length
                                        ) {
                                            setSelectedRows([]);
                                        } else {
                                            setSelectedRows(
                                                commissions.map(
                                                    (_, index) => index,
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
                            <th className="w-24 px-3 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {commissions.map((commission, index) => (
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
                                        {users
                                            .filter(
                                                (user) =>
                                                    String(user.id) ===
                                                        String(
                                                            commission.user_id,
                                                        ) ||
                                                    !commissions.some(
                                                        (c, i) =>
                                                            i !== index &&
                                                            String(
                                                                c.user_id,
                                                            ) ===
                                                                String(user.id),
                                                    ),
                                            )
                                            .map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name} ({user.email})
                                                </option>
                                            ))}
                                    </select>
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
                                <td className="px-3 py-3 align-top">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeCommissionRow(index)
                                        }
                                        className="h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-danger-500"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
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
