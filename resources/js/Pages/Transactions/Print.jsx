import React from "react";
import { Head } from "@inertiajs/react";
import PrintPreview from "@/Components/Receipt/PrintPreview";

export default function Print({ transaction, storeSetting, backUrl = null }) {
    return (
        <>
            <Head title="Invoice Penjualan" />
            <PrintPreview
                transaction={transaction}
                storeSetting={storeSetting}
                backUrl={backUrl}
            />
        </>
    );
}
