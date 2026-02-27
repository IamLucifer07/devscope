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
        <div className="w-full mx-auto space-y-4">
            {/* Search + Page size selector */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
                <input
                    placeholder="Search repositories..."
                    className="bg-background text-foreground border border-border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-72"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <label>Show:</label>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-background text-foreground border border-border rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:outline-none"
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
            <div className="border border-border/50 rounded-xl overflow-hidden shadow-sm bg-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm divide-y divide-border/50">
                        <thead className="bg-muted/50">
                            <tr>
                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 w-14 transition-colors"
                                    onClick={() => handleSort("serial")}
                                >
                                    <div className="flex items-center gap-1">
                                        S.N {getSortIcon("serial")}
                                    </div>
                                </th>

                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-colors"
                                    onClick={() => handleSort("name")}
                                >
                                    <div className="flex items-center gap-1">
                                        Repository {getSortIcon("name")}
                                    </div>
                                </th>

                                <th
                                    className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 w-24 transition-colors"
                                    onClick={() => handleSort("stargazers_count")}
                                >
                                    <div className="flex items-center justify-end gap-1">
                                        Stars {getSortIcon("stargazers_count")}
                                    </div>
                                </th>

                                <th
                                    className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 w-24 transition-colors"
                                    onClick={() => handleSort("forks_count")}
                                >
                                    <div className="flex items-center justify-end gap-1">
                                        Forks {getSortIcon("forks_count")}
                                    </div>
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-28">
                                    Language
                                </th>

                                <th
                                    className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 w-32 transition-colors"
                                    onClick={() => handleSort("updated_at")}
                                >
                                    <div className="flex items-center gap-1">
                                        Updated {getSortIcon("updated_at")}
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border/50 bg-card text-card-foreground">
                            {paginated.map((repo, idx) => (
                                <tr key={repo.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 text-center text-muted-foreground">
                                        {startIndex + idx + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline font-medium"
                                        >
                                            {repo.name}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-right font-medium">{repo.stargazers_count.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right text-muted-foreground">{repo.forks_count.toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border border-border">
                                            {repo.language || "Unknown"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground text-xs font-medium">
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
            </div>

            {/* Pagination controls */}
            {totalItems > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <div>
                        Showing <strong className="text-foreground">{startIndex + 1}</strong> to{" "}
                        <strong className="text-foreground">{Math.min(startIndex + pageSize, totalItems)}</strong> of{" "}
                        <strong className="text-foreground">{totalItems}</strong> repositories
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/50 transition-colors"
                        >
                            First
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/50 transition-colors"
                        >
                            Prev
                        </button>

                        <span className="px-2">
                            Page <strong className="text-foreground">{currentPage}</strong> of <strong className="text-foreground">{totalPages}</strong>
                        </span>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/50 transition-colors"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted/50 transition-colors"
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