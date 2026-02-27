"use client";

import { useState } from "react";
import UserSearch from "@/components/github/UserSearch";
import UserCard from "@/components/github/UserCard";
import RepoTable from "@/components/github/RepoTable";
import { useGithubUser } from "@/hooks/useGithubUser";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import LanguageChart from "@/components/github/LanguageChart";
import { getLanguageStats } from "@/utils/languageStats";
import RepoStats from "@/components/github/RepoStats";
import { getRepoAnalytics } from "@/utils/repoAnalytics";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Github } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");

  const userQuery = useGithubUser(username);
  const repoQuery = useGithubRepos(username);
  const languageStats = repoQuery.data
    ? getLanguageStats(repoQuery.data)
    : [];
  const analytics = repoQuery.data
    ? getRepoAnalytics(repoQuery.data)
    : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Github className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">DevScope</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-6xl flex flex-col gap-10">
        {/* Search Section */}
        <section className="flex flex-col items-center justify-center py-10 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Discover <span className="text-primary">GitHub</span> insights.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Analyze developer profiles, repository statistics, and language usage instantly with beautiful visualizations.
          </p>
          <div className="w-full max-w-xl">
            <UserSearch onSearch={setUsername} />
          </div>
        </section>

        {/* Loading / Error States */}
        {userQuery.isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {userQuery.isError && (
          <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-center border border-red-200 dark:border-red-900 mx-auto max-w-md w-full">
            User "{username}" not found. Please try another handle.
          </div>
        )}

        {/* Dashboard Content */}
        {userQuery.data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 isolate">
            {/* Sidebar Profile */}
            <div className="md:col-span-1 flex flex-col gap-6 relative">
              <div className="sticky top-24">
                <UserCard user={userQuery.data} />
              </div>
            </div>

            {/* Main Stats Area */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {analytics && <RepoStats analytics={analytics} />}

              <div className="grid grid-cols-1 gap-6">
                {languageStats.length > 0 && <LanguageChart data={languageStats} />}
              </div>

              {repoQuery.data && <RepoTable repos={repoQuery.data} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}