import { NextRequest, NextResponse } from "next/server";
import { githubFetch, GithubApiError } from "@/lib/githubServer";
import { GithubUser } from "@/types/github";

export async function GET(request: NextRequest) {
    const username = request.nextUrl.searchParams.get("username")?.trim();

    if (!username) {
        return NextResponse.json(
            { error: "Missing required query param: username" },
            { status: 400 }
        );
    }

    try {
        const user = await githubFetch<GithubUser>(
            `/users/${encodeURIComponent(username)}`
        );
        return NextResponse.json(user);
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
