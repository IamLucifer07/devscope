import axios from "axios";

const githubApi = axios.create({
    baseURL: "https://api.github.com",
});

export const fetchUser = async (username: string) => {
    const { data } = await githubApi.get(`/users/${username}`);
    return data;
};

export const fetchRepos = async (username: string) => {
    const { data } = await githubApi.get(`/users/${username}/repos`);
    return data;
};
