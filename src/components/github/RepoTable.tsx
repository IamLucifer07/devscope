"use client";

import { GithubRepo } from "@/types/github";
import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

type SortDirection = "asc" | "desc" | null;

interface SortConfig {
    key: keyof GithubRepo | "serial";
    direction: SortDirection;
}

export default function RepoTable({ repos }: { repos: GithubRepo[] }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    // Filter
    const filtered = useMemo(() => {
        if (!search.trim()) return repos;
        const term = search.toLowerCase();
        return repos.filter((repo) => repo.name.toLowerCase().includes(term));
    }, [repos, search]);

    // Sorting
    const sorted = useMemo(() => {
        if (!sortConfig) return filtered;

        return [...filtered].sort((a, b) => {
            // Special case for serial number (index-based)
            if (sortConfig.key === "serial") {
                return sortConfig.direction === "asc" ? -1 : 1;
            }

            const aValue = a[sortConfig.key as keyof GithubRepo];
            const bValue = b[sortConfig.key as keyof GithubRepo];

            if (aValue === bValue) return 0;
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortConfig.direction === "asc"
                    ? aValue - bValue
                    : bValue - aValue;
            }

            return 0;
        });
    }, [filtered, sortConfig]);

    // Pagination
    const totalItems = sorted.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = sorted.slice(startIndex, startIndex + pageSize);

    const handleSort = (key: keyof GithubRepo | "serial") => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                if (prev.direction === "asc") return { key, direction: "desc" };
                if (prev.direction === "desc") return null;
                return { key, direction: "asc" };
            }
            return { key, direction: "asc" };
        });
        setCurrentPage(1); // reset to first page when sorting
    };

    const getSortIcon = (key: keyof GithubRepo | "serial") => {
        if (sortConfig?.key !== key) return <ChevronsUpDown size={14} />;
        return sortConfig.direction === "asc" ? (
            <ChevronUp size={14} />
        ) : (
            <ChevronDown size={14} />
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            {/* Search + Page size selector */}
            <div className="flex flex-col sm:flex-row justify-between gap-3">
                <input
                    placeholder="Search repositories..."
                    className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <div className="flex items-center gap-2 text-sm">
                    <label>Show:</label>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 rounded px-2 py-1 bg-black"
                    >
                        {[5, 10, 15, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm divide-y divide-gray-200">
                    <thead className="bg-purple-50">
                        <tr>
                            <th
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 w-14"
                                onClick={() => handleSort("serial")}
                            >
                                <div className="flex items-center gap-1">
                                    S.N {getSortIcon("serial")}
                                </div>
                            </th>

                            <th
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center gap-1">
                                    Repository {getSortIcon("name")}
                                </div>
                            </th>

                            <th
                                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 w-24"
                                onClick={() => handleSort("stargazers_count")}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Stars {getSortIcon("stargazers_count")}
                                </div>
                            </th>

                            <th
                                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 w-24"
                                onClick={() => handleSort("forks_count")}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    Forks {getSortIcon("forks_count")}
                                </div>
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                                Language
                            </th>

                            <th
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 w-32"
                                onClick={() => handleSort("updated_at")}
                            >
                                <div className="flex items-center gap-1">
                                    Updated {getSortIcon("updated_at")}
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-black divide-y divide-gray-200">
                        {paginated.map((repo, idx) => (
                            <tr key={repo.id} className="hover:bg-gray-50 hover:text-black">
                                <td className="px-4 py-3 text-center text-gray-600">
                                    {startIndex + idx + 1}
                                </td>
                                <td className="px-4 py-3">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {repo.name}
                                    </a>
                                </td>
                                <td className="px-4 py-3 text-right">{repo.stargazers_count.toLocaleString()}</td>
                                <td className="px-4 py-3 text-right">{repo.forks_count.toLocaleString()}</td>
                                <td className="px-4 py-3">{repo.language || "—"}</td>
                                <td className="px-4 py-3 text-gray-600">
                                    {new Date(repo.updated_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            {totalItems > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <div>
                        Showing <strong>{startIndex + 1}</strong> to{" "}
                        <strong>{Math.min(startIndex + pageSize, totalItems)}</strong> of{" "}
                        <strong>{totalItems}</strong> repositories
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            First
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Prev
                        </button>

                        <span className="px-2">
                            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                        </span>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}

            {totalItems === 0 && (
                <div className="text-center py-10 text-gray-500">
                    {search ? "No repositories match your search" : "No repositories found"}
                </div>
            )}
        </div>
    );
}