"use client";

import { useState } from "react";

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
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
            <input
                type="text"
                placeholder="Enter GitHub username..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
            />
            <button className="bg-black text-white border border-white px-4 py-2 rounded-lg">
                Search
            </button>
        </form>
    );
}
