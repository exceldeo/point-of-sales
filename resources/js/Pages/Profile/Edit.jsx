import AppLayout from "@/Layouts/AppLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import formatCurrency from "@/Utils/formatCurrency";

export default function Edit({ mustVerifyEmail, status, commissions }) {
    return (
        <>
            <Head title="Profile" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Profile
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Kelola informasi akun dan keamanan Anda
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full space-y-6">
                        <div className="p-4 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="p-4 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Riwayat Komisi
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    20 catatan komisi terbaru Anda
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Total Komisi
                                </p>
                                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                    {formatCurrency(
                                        commissions?.total_nominal || 0,
                                    )}
                                </p>
                            </div>
                        </div>

                        {commissions?.items?.length ? (
                            <div className="space-y-3">
                                {commissions.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-950/40"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                    {item.description ||
                                                        "Komisi"}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                    {item.created_at}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                {formatCurrency(item.nominal)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                                Belum ada riwayat komisi.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} />;
