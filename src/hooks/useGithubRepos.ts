"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "@/services/githubApi";
import { GithubRepo } from "@/types/github";

export const useGithubRepos = (username: string) => {
    return useQuery<GithubRepo[]>({
        queryKey: ["github-repos", username],
        queryFn: () => fetchRepos(username),
        enabled: !!username,
    });
};