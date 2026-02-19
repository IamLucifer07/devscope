"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/services/githubApi";
import { GithubUser } from "@/types/github";

export const useGithubUser = (username: string) => {
    return useQuery<GithubUser>({
        queryKey: ["github-user", username],
        queryFn: () => fetchUser(username),
        enabled: !!username,
    });
};
