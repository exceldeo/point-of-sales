import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import {
    IconUser,
    IconSearch,
    IconCheck,
    IconChevronDown,
    IconUserPlus,
} from "@tabler/icons-react";

export default function EmployeeHandleSelect({
    employees = [],
    selected,
    onSelect,
    placeholder = "Pilih karyawan...",
    error,
    label,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Filter employees by search
    const filteredEmployees = employees.filter(
        (employee) =>
            employee.name.toLowerCase().includes(search.toLowerCase()) ||
            employee.phone?.toLowerCase().includes(search.toLowerCase()),
    );

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search on open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (employee) => {
        onSelect(employee);
        setIsOpen(false);
        setSearch("");
    };

    return (
        <>
            <div ref={containerRef} className="relative">
                {/* Label */}
                {label && (
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {label}
                    </label>
                )}

                {/* Select Button with History and Add */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
                            flex-1 h-12 px-4 rounded-xl text-left
                            flex items-center gap-3
                            border-2 transition-all duration-200
                            ${
                                isOpen
                                    ? "border-primary-500 ring-4 ring-primary-500/20"
                                    : error
                                      ? "border-danger-500"
                                      : "border-slate-200 dark:border-slate-700"
                            }
                            bg-white dark:bg-slate-900
                        `}
                    >
                        <div
                            className={`
                            w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                            ${
                                selected
                                    ? "bg-primary-100 dark:bg-primary-900/50"
                                    : "bg-slate-100 dark:bg-slate-800"
                            }
                        `}
                        >
                            <IconUser
                                size={18}
                                className={
                                    selected
                                        ? "text-primary-600 dark:text-primary-400"
                                        : "text-slate-400"
                                }
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            {selected ? (
                                <>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                                        {selected.name}
                                    </p>
                                    {selected.phone && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                            {selected.phone}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-slate-400 dark:text-slate-500">
                                    {placeholder}
                                </p>
                            )}
                        </div>
                        <IconChevronDown
                            size={18}
                            className={`text-slate-400 transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="mt-1 text-xs text-danger-500">{error}</p>
                )}

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl z-50 animate-slide-up overflow-hidden">
                        {/* Search */}
                        <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="relative">
                                <IconSearch
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama/telepon..."
                                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Employee List */}
                        <div className="max-h-60 overflow-y-auto scrollbar-thin">
                            {filteredEmployees.length > 0 ? (
                                <ul>
                                    {filteredEmployees.map((employee) => (
                                        <li key={employee.id}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleSelect(employee)
                                                }
                                                className={`
                                                    w-full flex items-center gap-3 px-4 py-3 text-left
                                                    transition-colors
                                                    ${
                                                        selected?.id ===
                                                        employee.id
                                                            ? "bg-primary-50 dark:bg-primary-950/30"
                                                            : "hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    }
                                                `}
                                            >
                                                <div
                                                    className={`
                                                    w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
                                                    ${
                                                        selected?.id ===
                                                        employee.id
                                                            ? "bg-primary-500 text-white"
                                                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                                    }
                                                `}
                                                >
                                                    {selected?.id ===
                                                    employee.id ? (
                                                        <IconCheck size={16} />
                                                    ) : (
                                                        <span className="text-sm font-medium">
                                                            {employee.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                                                        {employee.name}
                                                    </p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="py-8 text-center text-slate-400 dark:text-slate-500">
                                    <IconUser
                                        size={24}
                                        className="mx-auto mb-2 opacity-50"
                                    />
                                    <p className="text-sm">
                                        Pegawai tidak ditemukan
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
