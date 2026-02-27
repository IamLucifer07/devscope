"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
    onSearch: (username: string) => void;
}

export default function UserSearch({ onSearch }: Props) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSearch(input.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="w-5 h-5" />
            </div>
            <input
                type="text"
                placeholder="Enter GitHub username (e.g. torvalds)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="block w-full pl-12 pr-28 py-4 bg-card text-card-foreground border border-border rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-lg"
            />
            <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary text-primary-foreground px-6 font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
                Search
            </button>
        </form>
    );
}

