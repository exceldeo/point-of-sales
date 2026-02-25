import React, { useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    IconCirclePlus,
    IconBriefcase,
    IconDatabaseOff,
    IconSearch,
    IconShield,
    IconUserShield,
    IconPencilCheck,
} from "@tabler/icons-react";
import ListBox from "@/Components/Common/ListBox";
import Table from "@/Components/Common/Table";
import Pagination from "@/Components/Common/Pagination";
import Button from "@/Components/Common/Button";
import hasAnyPermission from "@/Utils/Permission";
import Modal from "@/Components/Common/Modal";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

export default function Index({
    employees,
    filters,
    permissionGroups,
    employeeRoles,
}) {
    const { errors } = usePage().props;

    const { data, setData, transform, post } = useForm({
        selectedPermissionGroup: [],
        isOpen: false,
    });

    useEffect(() => {
        const selected = (employeeRoles || [])
            .map((item) => item.permission_group)
            .filter(Boolean);

        setData("selectedPermissionGroup", selected);
    }, [employeeRoles]);

    const setSelectedPermissionGroup = (value) =>
        setData("selectedPermissionGroup", value);

    transform((data) => ({
        ...data,
        selectedPermissionGroup: data.selectedPermissionGroup.map(
            (permissionGroup) => permissionGroup.id,
        ),
        _method: "put",
    }));

    const updateEmployeeRole = async (e) => {
        e.preventDefault();
        post(route("employees.permission-group.update"), {
            onSuccess: () =>
                setData({
                    selectedPermissionGroup: [],
                    isOpen: false,
                }),
        });
    };

    return (
        <>
            <Head title="Employee Management" />

            <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <IconBriefcase
                                size={28}
                                className="text-primary-500"
                            />
                            Employee Management
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {employees.total || 0} data karyawan
                        </p>
                    </div>

                    {hasAnyPermission(["employee-edit"]) && (
                        <Button
                            type={"button"}
                            icon={
                                <IconPencilCheck size={18} strokeWidth={1.5} />
                            }
                            className={
                                "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                            }
                            label={"Ubah Role Karyawan"}
                            onClick={() => setData("isOpen", true)}
                        />
                    )}

                    {/* Modal */}
                    <Modal
                        show={data.isOpen}
                        onClose={() =>
                            setData({
                                isOpen: false,
                                selectedPermissionGroup: [],
                            })
                        }
                        title={"Atur Group Karyawan"}
                        icon={<IconUserShield size={20} strokeWidth={1.5} />}
                    >
                        <form onSubmit={updateEmployeeRole}>
                            <div className="mb-4">
                                <ListBox
                                    label={"Pilih Group Karyawan"}
                                    data={permissionGroups}
                                    selected={data.selectedPermissionGroup}
                                    setSelected={setSelectedPermissionGroup}
                                    errors={errors.selectedPermissionGroup}
                                />
                            </div>
                            <Button
                                type={"submit"}
                                icon={<IconPencilCheck size={18} />}
                                className={
                                    "bg-primary-500 hover:bg-primary-600 text-white w-full justify-center"
                                }
                                label={"Simpan"}
                            />
                        </form>
                    </Modal>
                </div>
            </div>

            <div className="mb-4">
                <div className="relative max-w-md">
                    <IconSearch
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        defaultValue={filters?.search || ""}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                applyFilter({ search: e.currentTarget.value });
                            }
                        }}
                        placeholder="Cari nama / email lalu Enter..."
                        className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                </div>
            </div>

            {employees.data?.length > 0 ? (
                <Table.Card title={"Data Karyawan"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className="w-10">No</Table.Th>
                                <Table.Th>Nama</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Total Komisi</Table.Th>
                                <Table.Th className="w-40"></Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {employees.data.map((employee, i) => (
                                <tr key={employee.id}>
                                    {console.log(employee)}
                                    <Table.Td className="text-center">
                                        {++i +
                                            (employees.current_page - 1) *
                                                employees.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <span className="font-medium text-slate-800 dark:text-slate-200">
                                            {employee.name}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>{employee.email}</Table.Td>
                                    <Table.Td>
                                        <span className="font-medium text-primary-600 dark:text-primary-400">
                                            {formatCurrency(
                                                employee.log_commissions.reduce(
                                                    (sum, item) =>
                                                        sum + item.nominal,
                                                    0,
                                                ),
                                            )}
                                        </span>
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
                        Data Karyawan Tidak Ditemukan
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Coba kata kunci pencarian lain.
                    </p>
                </div>
            )}

            {employees.last_page !== 1 && (
                <Pagination links={employees.links} />
            )}
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} />;
