export interface GithubUser {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
    location: string;
    created_at: string;
    html_url: string;
}

export interface GithubRepo {
    id: number;
    name: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
    watchers_count: number;
}