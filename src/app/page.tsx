"use client";

import { useState } from "react";
import UserSearch from "@/components/github/UserSearch";
import UserCard from "@/components/github/UserCard";
import { useGithubUser } from "@/hooks/useGithubUser";

export default function Home() {
  const [username, setUsername] = useState("");

  const { data, isLoading, isError } = useGithubUser(username);

  return (
    <main className="flex flex-col items-center gap-6 p-10">
      <h1 className="text-2xl font-bold">DevScope</h1>

      <UserSearch onSearch={setUsername} />

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">User not found</p>}

      {data && <UserCard user={data} />}
    </main>
  );
}
