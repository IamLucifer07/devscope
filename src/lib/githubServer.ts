const GITHUB_BASE_URL = "https://api.github.com";

export class GithubApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "GithubApiError";
        this.status = status;
    }
}

const getGithubHeaders = () => {
    const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
        headers.Authorization = `token ${token}`;
    }

    return headers;
};

export const githubFetch = async <T>(path: string) => {
    const response = await fetch(`${GITHUB_BASE_URL}${path}`, {
        headers: getGithubHeaders(),
        cache: "no-store",
    });

    if (!response.ok) {
        let errorMessage = response.statusText;

        try {
            const body = (await response.json()) as { message?: string };
            if (body.message) {
                errorMessage = body.message;
            }
        } catch {
            // Ignore JSON parse errors and keep statusText fallback.
        }

        throw new GithubApiError(response.status, errorMessage);
    }

    return (await response.json()) as T;
};
