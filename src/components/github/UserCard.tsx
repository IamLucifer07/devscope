import { GithubUser } from "@/types/github";
import { Users, UserPlus, BookMarked } from "lucide-react";

export default function UserCard({ user }: { user: GithubUser }) {
    return (
        <div className="bg-card text-card-foreground border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

            <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-24 h-24 rounded-full ring-4 ring-background shadow-md object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full border-2 border-background">
                        PRO
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-2xl tracking-tight">{user.name || user.login}</h2>
                    <a href={user.html_url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                        @{user.login}
                    </a>
                </div>

                {user.bio && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {user.bio}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-border/50">
                <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Users className="w-4 h-4 text-muted-foreground mb-1" />
                    <p className="font-bold text-lg">{user.followers}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <UserPlus className="w-4 h-4 text-muted-foreground mb-1" />
                    <p className="font-bold text-lg">{user.following}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Following</p>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <BookMarked className="w-4 h-4 text-muted-foreground mb-1" />
                    <p className="font-bold text-lg">{user.public_repos}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Repos</p>
                </div>
            </div>
        </div>
    );
}

