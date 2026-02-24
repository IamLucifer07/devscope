import { GithubRepo } from "@/types/github";

export interface LanguageStat {
    name: string;
    count: number;
}

export const getLanguageStats = (repos: GithubRepo[]): LanguageStat[] => {
    const map: Record<string, number> = {};

    repos.forEach((repo) => {
        if (!repo.language) return;

        map[repo.language] = (map[repo.language] || 0) + 1;
    });

    return Object.entries(map)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
};