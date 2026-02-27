import { GithubRepo } from "@/types/github";

export interface RepoAnalytics {
    totalStars: number;
    totalForks: number;
    mostStarredRepo: GithubRepo | null;
    recentlyUpdatedRepo: GithubRepo | null;
    averageStars: number;
}

export const getRepoAnalytics = (
    repos: GithubRepo[]
): RepoAnalytics => {
    if (!repos.length) {
        return {
            totalStars: 0,
            totalForks: 0,
            mostStarredRepo: null,
            recentlyUpdatedRepo: null,
            averageStars: 0,
        };
    }

    const totalStars = repos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0
    );

    const totalForks = repos.reduce(
        (sum, repo) => sum + repo.forks_count,
        0
    );

    const mostStarredRepo = [...repos].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
    )[0];

    const recentlyUpdatedRepo = [...repos].sort(
        (a, b) =>
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
    )[0];

    return {
        totalStars,
        totalForks,
        mostStarredRepo,
        recentlyUpdatedRepo,
        averageStars: Math.round(totalStars / repos.length),
    };
};