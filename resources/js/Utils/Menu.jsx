import { usePage } from "@inertiajs/react";
import {
    IconArrowsUpDown,
    IconBooks,
    IconBox,
    IconCategory,
    IconChartArrowsVertical,
    IconChartBarPopular,
    IconChartInfographic,
    IconCirclePlus,
    IconClockHour6,
    IconCreditCard,
    IconFileCertificate,
    IconFileDescription,
    IconFolder,
    IconLayout2,
    IconSchool,
    IconShoppingCart,
    IconTable,
    IconUserBolt,
    IconUserShield,
    IconUserSquare,
    IconUsers,
    IconUsersPlus,
    IconArrowsRightLeft,
    IconBuildingStore,
    IconBriefcase,
    IconUserCircle,
} from "@tabler/icons-react";
import hasAnyPermission, { permissionEnums } from "./Permission";
import React from "react";

export default function Menu() {
    // define use page
    const { url } = usePage();

    // define menu navigations
    const menuNavigation = [
        {
            title: "Overview",
            details: [
                {
                    title: "Dashboard",
                    href: route("dashboard"),
                    active: url === "/dashboard" ? true : false, // Update comparison here
                    icon: <IconLayout2 size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.DASHBOARD_ACCESS,
                    ]),
                },
            ],
        },
        {
            title: "Data Management",
            details: [
                {
                    title: "Kategori",
                    href: route("categories.index"),
                    active: url === "/categories" ? true : false, // Update comparison here
                    icon: <IconFolder size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.CATEGORIES_ACCESS,
                    ]),
                },
                {
                    title: "Produk",
                    href: route("products.index"),
                    active: url === "/products" ? true : false, // Update comparison here
                    icon: <IconBox size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.PRODUCTS_ACCESS,
                    ]),
                },
                {
                    title: "Pelanggan",
                    href: route("customers.index"),
                    active: url === "/customers" ? true : false, // Update comparison here
                    icon: <IconUsersPlus size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.CUSTOMERS_ACCESS,
                    ]),
                },
                {
                    title: "Pemasok",
                    href: route("suppliers.index"),
                    active: url === "/suppliers" ? true : false, // Update comparison here
                    icon: <IconUsersPlus size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.SUPPLIERS_ACCESS,
                    ]),
                },
            ],
        },
        {
            title: "Transaksi",
            details: [
                {
                    title: "Transaksi",
                    href: route("transactions.index"),
                    active: url === "/transactions" ? true : false, // Update comparison here
                    icon: <IconShoppingCart size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.TRANSACTIONS_ACCESS,
                    ]),
                },
                {
                    title: "Riwayat Transaksi",
                    href: route("transactions.history"),
                    active: url === "/transactions/history" ? true : false,
                    icon: <IconClockHour6 size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.TRANSACTIONS_ACCESS,
                    ]),
                },
                {
                    title: "Stock Management",
                    href: route("stock-management.index"),
                    active: url === "/stock-management",
                    icon: <IconArrowsUpDown size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.STOCK_MANAGEMENT_ACCESS,
                    ]),
                },
            ],
        },
        {
            title: "Laporan",
            details: [
                {
                    title: "Laporan Penjualan",
                    href: route("reports.sales.index"),
                    active: url.startsWith("/reports/sales"),
                    icon: (
                        <IconChartArrowsVertical size={20} strokeWidth={1.5} />
                    ),
                    permissions: hasAnyPermission([
                        permissionEnums.REPORTS_ACCESS,
                    ]),
                },
                // {
                //     title: "Laporan Keuntungan",
                //     href: route("reports.profits.index"),
                //     active: url.startsWith("/reports/profits"),
                //     icon: <IconChartBarPopular size={20} strokeWidth={1.5} />,
                //     permissions: hasAnyPermission([permissionEnums.PROFITS_ACCESS]),
                // },
                // {
                //     title: "Pembukuan Transaksi",
                //     href: route("reports.sales.index"),
                //     active: url.startsWith("/reports/sales"),
                //     icon: <IconArrowsRightLeft size={20} strokeWidth={1.5} />,
                //     permissions: hasAnyPermission([permissionEnums.REPORTS_ACCESS]),
                // },
            ],
        },
        {
            title: "User Management",
            details: [
                {
                    title: "Hak Akses",
                    href: route("permissions.index"),
                    active: url === "/permissions" ? true : false, // Update comparison here
                    icon: <IconUserBolt size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.PERMISSIONS_ACCESS,
                    ]),
                },
                {
                    title: "Akses Group",
                    href: route("roles.index"),
                    active: url === "/roles" ? true : false, // Update comparison here
                    icon: <IconUserShield size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.ROLES_ACCESS,
                    ]),
                },
                {
                    title: "Pengguna",
                    icon: <IconUsers size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.USERS_ACCESS,
                    ]),
                    subdetails: [
                        {
                            title: "Data Pengguna",
                            href: route("users.index"),
                            icon: <IconTable size={20} strokeWidth={1.5} />,
                            active: url === "/users" ? true : false,
                            permissions: hasAnyPermission([
                                permissionEnums.USERS_ACCESS,
                            ]),
                        },
                        {
                            title: "Tambah Data Pengguna",
                            href: route("users.create"),
                            icon: (
                                <IconCirclePlus size={20} strokeWidth={1.5} />
                            ),
                            active: url === "/users/create" ? true : false,
                            permissions: hasAnyPermission([
                                permissionEnums.USERS_CREATE,
                            ]),
                        },
                        {
                            title: "Data Karyawan",
                            href: route("employee-management.index"),
                            active: url === "/employee-management",
                            icon: <IconBriefcase size={20} strokeWidth={1.5} />,
                            permissions: hasAnyPermission([
                                permissionEnums.EMPLOYEE_MANAGEMENT_ACCESS,
                            ]),
                        },
                    ],
                },
            ],
        },
        {
            title: "Pengaturan",
            details: [
                {
                    title: "Payment Gateway",
                    href: route("settings.payments.edit"),
                    active: url === "/settings/payments",
                    icon: <IconCreditCard size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.SETTINGS_ACCESS,
                    ]),
                },
                {
                    title: "Store Setting",
                    href: route("settings.store.edit"),
                    active: url === "/settings/store",
                    icon: <IconBuildingStore size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission([
                        permissionEnums.SETTINGS_ACCESS,
                    ]),
                },
                {
                    title: "Profile",
                    href: route("profile.edit"),
                    active: url === "/profile",
                    icon: <IconUserCircle size={20} strokeWidth={1.5} />,
                    permissions: true,
                },
            ],
        },
    ];

    return menuNavigation;
}
