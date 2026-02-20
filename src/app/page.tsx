"use client";

import { useState } from "react";
import UserSearch from "@/components/github/UserSearch";
import UserCard from "@/components/github/UserCard";
import RepoTable from "@/components/github/RepoTable";
import { useGithubUser } from "@/hooks/useGithubUser";
import { useGithubRepos } from "@/hooks/useGithubRepos";

export default function Home() {
  const [username, setUsername] = useState("");

  const userQuery = useGithubUser(username);
  const repoQuery = useGithubRepos(username);

  return (
    <main className="flex flex-col items-center gap-6 p-10">
      <h1 className="text-2xl font-bold">DevScope</h1>

      <UserSearch onSearch={setUsername} />

      {userQuery.isLoading && <p>Loading profile...</p>}
      {userQuery.isError && <p className="text-red-500">User not found</p>}
      {userQuery.data && <UserCard user={userQuery.data} />}

      {repoQuery.isLoading && <p>Loading repos...</p>}
      {repoQuery.data && <RepoTable repos={repoQuery.data} />}
    </main>
  );
}