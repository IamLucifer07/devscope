import axios from "axios";

const githubApi = axios.create({
    baseURL: "https://api.github.com",
});

export const fetchUser = async (username: string) => {
    const { data } = await githubApi.get(`/users/${username}`);
    return data;
};

// -------- fetch one page only --------
export const fetchRepos = async (username: string) => {
    const { data } = await githubApi.get(`/users/${username}/repos`);
    return data;
};

// fetch all repos with pagination
// export const fetchRepos = async (username: string) => {
//     let page = 1;
//     let allRepos: any[] = [];

//     while (true) {
//         const { data } = await githubApi.get(
//             `/users/${username}/repos?per_page=100&page=${page}`
//         );

//         if (data.length === 0) break;

//         allRepos = [...allRepos, ...data];
//         page++;
//     }

//     return allRepos;
// };
