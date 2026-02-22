import { NextRequest, NextResponse } from "next/server";
import { githubFetch, GithubApiError } from "@/lib/githubServer";
import { GithubRepo } from "@/types/github";

export async function GET(request: NextRequest) {
    const username = request.nextUrl.searchParams.get("username")?.trim();

    if (!username) {
        return NextResponse.json(
            { error: "Missing required query param: username" },
            { status: 400 }
        );
    }

    const encodedUsername = encodeURIComponent(username);
    const allRepos: GithubRepo[] = [];
    let page = 1;

    try {
        while (true) {
            const repos = await githubFetch<GithubRepo[]>(
                `/users/${encodedUsername}/repos?per_page=100&page=${page}`
            );

            if (repos.length === 0) {
                break;
            }

            allRepos.push(...repos);
            page += 1;
        }

        return NextResponse.json(allRepos);
    } catch (error) {
        if (error instanceof GithubApiError) {
            return NextResponse.json(
                { error: "GitHub API request failed", details: error.message },
                { status: error.status }
            );
        }

        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}
