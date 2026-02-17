import React, { useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Input from "@/Components/Dashboard/Input";
import Textarea from "@/Components/Dashboard/TextArea";
import { IconBuildingStore, IconDeviceFloppy } from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Store({ setting }) {
    const { flash } = usePage().props;

    const { data, setData, put, errors, processing } = useForm({
        store_name: setting?.store_name ?? "TOKO ANDA",
        store_address: setting?.store_address ?? "",
        store_phone: setting?.store_phone ?? "",
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("settings.store.update"), { preserveScroll: true });
    };

    return (
        <>
            <Head title="Pengaturan Toko" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <IconBuildingStore size={28} className="text-primary-500" />
                    Pengaturan Toko
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Data toko untuk ditampilkan pada nota / struk
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                    <Input
                        label="Nama Toko"
                        type="text"
                        value={data.store_name}
                        onChange={(e) => setData("store_name", e.target.value)}
                        errors={errors?.store_name}
                        placeholder="Masukkan nama toko"
                    />

                    <Textarea
                        label="Alamat Toko"
                        value={data.store_address}
                        onChange={(e) =>
                            setData("store_address", e.target.value)
                        }
                        errors={errors?.store_address}
                        placeholder="Masukkan alamat toko"
                        rows={3}
                    />

                    <Input
                        label="No. Telepon Toko"
                        type="text"
                        value={data.store_phone}
                        onChange={(e) => setData("store_phone", e.target.value)}
                        errors={errors?.store_phone}
                        placeholder="08xxxxxxxxxx"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors disabled:opacity-50"
                    >
                        <IconDeviceFloppy size={18} />
                        {processing ? "Menyimpan..." : "Simpan Pengaturan"}
                    </button>
                </div>
            </form>
        </>
    );
}

Store.layout = (page) => <DashboardLayout children={page} />;
