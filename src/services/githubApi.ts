import axios from "axios";
import { GithubRepo, GithubUser } from "@/types/github";

const githubApi = axios.create({
    baseURL: "/api/github",
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
});

export const fetchUser = async (username: string) => {
    const { data } = await githubApi.get<GithubUser>(
        `/user?username=${encodeURIComponent(username)}`
    );
    return data;
};

export default githubApi;

export const fetchRepos = async (username: string) => {
    const { data } = await githubApi.get<GithubRepo[]>(
        `/repos?username=${encodeURIComponent(username)}`
    );
    return data;
};
