import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import {
    IconCirclePlus,
    IconPencilCog,
    IconArrowsUpDown,
    IconDatabaseOff,
    IconTrash,
    IconTrendingDown,
    IconTrendingUp,
} from "@tabler/icons-react";
import hasAnyPermission from "@/Utils/Permission";
import Search from "@/Components/Common/Search";
import Table from "@/Components/Common/Table";
import Pagination from "@/Components/Common/Pagination";
import Button from "@/Components/Common/Button";

export default function Index({ transactions }) {
    return (
        <>
            <Head title="Stock Management" />

            <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <IconArrowsUpDown
                                size={28}
                                className="text-primary-500"
                            />
                            Stock Management
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {transactions.total || 0} transaksi stok tercatat
                        </p>
                    </div>
                    {hasAnyPermission(["stock-management-create"]) && (
                        <Link
                            href={route("stock-management.create")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium"
                        >
                            <IconCirclePlus size={18} />
                            Tambah Transaksi Stok
                        </Link>
                    )}
                </div>
            </div>

            <div className="mb-4 w-full sm:w-80">
                <Search
                    url={route("stock-management.index")}
                    placeholder="Cari supplier/operator/type..."
                />
            </div>

            {transactions.data.length > 0 ? (
                <Table.Card title={"Data Transaksi Stok"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className="w-10">No</Table.Th>
                                <Table.Th>Tipe</Table.Th>
                                <Table.Th>Pemasok</Table.Th>
                                <Table.Th>Operator</Table.Th>
                                <Table.Th>Item</Table.Th>
                                <Table.Th>Catatan</Table.Th>
                                <Table.Th></Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {transactions.data.map((item, i) => (
                                <tr key={item.id}>
                                    <Table.Td className="text-center">
                                        {++i +
                                            (transactions.current_page - 1) *
                                                transactions.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                item.type === "stock_in"
                                                    ? "bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-400"
                                                    : "bg-danger-100 text-danger-700 dark:bg-danger-900/40 dark:text-danger-400"
                                            }`}
                                        >
                                            {item.type === "stock_in" ? (
                                                <IconTrendingUp size={14} />
                                            ) : (
                                                <IconTrendingDown size={14} />
                                            )}
                                            {item.type}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        {item.pemasok?.name || "-"}
                                    </Table.Td>
                                    <Table.Td>
                                        {item.operator_user?.name || "-"}
                                    </Table.Td>
                                    <Table.Td>{item.items_count}</Table.Td>
                                    <Table.Td>
                                        <p className="line-clamp-1">
                                            {item.notes || "-"}
                                        </p>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2 justify-end">
                                            {hasAnyPermission([
                                                "stock-management-edit",
                                            ]) && (
                                                <Button
                                                    type={"edit"}
                                                    icon={
                                                        <IconPencilCog
                                                            size={16}
                                                            strokeWidth={1.5}
                                                        />
                                                    }
                                                    className={
                                                        "border bg-warning-100 border-warning-200 text-warning-600 hover:bg-warning-200 dark:bg-warning-900/50 dark:border-warning-800 dark:text-warning-400"
                                                    }
                                                    href={route(
                                                        "stock-management.edit",
                                                        item.id,
                                                    )}
                                                />
                                            )}
                                            {hasAnyPermission([
                                                "stock-management-delete",
                                            ]) && (
                                                <Button
                                                    type={"delete"}
                                                    icon={
                                                        <IconTrash
                                                            size={16}
                                                            strokeWidth={1.5}
                                                        />
                                                    }
                                                    className={
                                                        "border bg-danger-100 border-danger-200 text-danger-600 hover:bg-danger-200 dark:bg-danger-900/50 dark:border-danger-800 dark:text-danger-400"
                                                    }
                                                    url={route(
                                                        "stock-management.destroy",
                                                        item.id,
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <IconDatabaseOff
                            size={32}
                            className="text-slate-400"
                            strokeWidth={1.5}
                        />
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-1">
                        Belum Ada Transaksi Stok
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Data akan muncul setelah transaksi stok dibuat.
                    </p>
                </div>
            )}

            {transactions.last_page !== 1 && (
                <Pagination links={transactions.links} />
            )}
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} />;
