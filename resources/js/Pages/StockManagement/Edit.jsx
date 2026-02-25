import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Common/Input";
import Textarea from "@/Components/Common/TextArea";
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Edit({ transaction, suppliers, products }) {
    const { errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        pemasok_id: transaction.pemasok_id || "",
        type: transaction.type,
        notes: transaction.notes || "",
        items: transaction.items.map((item) => ({
            product_id: String(item.product_id),
            qty: item.qty,
        })),
        _method: "PUT",
    });

    const addItem = () => {
        setData("items", [...data.items, { product_id: "", qty: 1 }]);
    };

    const removeItem = (index) => {
        if (data.items.length === 1) return;
        setData(
            "items",
            data.items.filter((_, i) => i !== index),
        );
    };

    const updateItem = (index, field, value) => {
        const nextItems = [...data.items];
        nextItems[index] = { ...nextItems[index], [field]: value };
        setData("items", nextItems);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("stock-management.update", transaction.id), {
            onSuccess: () =>
                toast.success("Transaksi stok berhasil diperbarui"),
            onError: () => toast.error("Gagal memperbarui transaksi stok"),
        });
    };

    return (
        <>
            <Head title="Edit Transaksi Stok" />

            <div className="mb-6">
                <Link
                    href={route("stock-management.index")}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 mb-3"
                >
                    <IconArrowLeft size={16} />
                    Kembali ke Stock Management
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Edit Transaksi Stok
                </h1>
            </div>

            <form onSubmit={submit} className="max-w-4xl space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Tipe Transaksi
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className="w-full h-11 px-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                            >
                                <option value="stock_in">Stock In</option>
                                <option value="stock_out">Stock Out</option>
                            </select>
                            {errors.type && (
                                <small className="text-xs text-danger-500">
                                    {errors.type}
                                </small>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Pemasok (opsional)
                            </label>
                            <select
                                value={data.pemasok_id}
                                onChange={(e) =>
                                    setData("pemasok_id", e.target.value)
                                }
                                className="w-full h-11 px-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                            >
                                <option value="">Tanpa pemasok</option>
                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                            {errors.pemasok_id && (
                                <small className="text-xs text-danger-500">
                                    {errors.pemasok_id}
                                </small>
                            )}
                        </div>
                    </div>

                    <Textarea
                        label="Catatan"
                        placeholder="Catatan transaksi stok"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        errors={errors.notes}
                        rows={3}
                    />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Item Produk
                        </h2>
                        <button
                            type="button"
                            onClick={addItem}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm"
                        >
                            <IconPlus size={16} /> Tambah Item
                        </button>
                    </div>

                    <div className="space-y-3">
                        {data.items.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
                            >
                                <div className="md:col-span-8 flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Produk
                                    </label>
                                    <select
                                        value={item.product_id}
                                        onChange={(e) =>
                                            updateItem(
                                                index,
                                                "product_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full h-11 px-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                    >
                                        <option value="">Pilih produk</option>
                                        {products.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.title} (stok:{" "}
                                                {product.stock})
                                            </option>
                                        ))}
                                    </select>
                                    {errors[`items.${index}.product_id`] && (
                                        <small className="text-xs text-danger-500">
                                            {
                                                errors[
                                                    `items.${index}.product_id`
                                                ]
                                            }
                                        </small>
                                    )}
                                </div>

                                <div className="md:col-span-3">
                                    <Input
                                        label="Qty"
                                        type="number"
                                        min="1"
                                        value={item.qty}
                                        onChange={(e) =>
                                            updateItem(
                                                index,
                                                "qty",
                                                e.target.value,
                                            )
                                        }
                                        errors={errors[`items.${index}.qty`]}
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="w-full h-11 rounded-xl bg-danger-100 text-danger-600 hover:bg-danger-200 inline-flex items-center justify-center"
                                    >
                                        <IconTrash size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {errors.items && (
                        <small className="text-xs text-danger-500 mt-2 block">
                            {errors.items}
                        </small>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Link
                        href={route("stock-management.index")}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors disabled:opacity-50"
                    >
                        <IconDeviceFloppy size={18} />
                        {processing ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </form>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} />;
