import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useMemo, useRef } from "react";

export default function Index() {
    return (
        <>
            <Head title="Home" />
            <div className="flex flex-col items-center justify-center h-full gap-6">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Selamat Datang di Point of Sales
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400">
                    Gunakan menu navigasi untuk mengelola toko Anda
                </p>
            </div>
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} />;