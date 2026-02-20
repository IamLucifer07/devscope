import { GithubUser } from "@/types/github";

export default function UserCard({ user }: { user: GithubUser }) {
    return (
        <div className="border rounded-xl p-5 shadow-sm w-full max-w-md">
            <div className="flex items-center gap-4">
                <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h2 className="font-semibold text-lg">{user.name || user.login}</h2>
                    <p className="text-sm text-gray-500">{user.bio}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
                <div>
                    <p className="font-semibold">{user.followers}</p>
                    <p className="text-gray-500">Followers</p>
                </div>
                <div>
                    <p className="font-semibold">{user.following}</p>
                    <p className="text-gray-500">Following</p>
                </div>
                <div>
                    <p className="font-semibold">{user.public_repos}</p>
                    <p className="text-gray-500">Repos</p>
                </div>
            </div>
        </div>
    );
}
