import { RepoAnalytics } from "@/utils/repoAnalytics";
import { Star, GitFork, TrendingUp, Award, Clock } from "lucide-react";

export default function RepoStats({
    analytics,
}: {
    analytics: RepoAnalytics;
}) {
    const stats = [
        { title: "Total Stars", value: analytics.totalStars.toLocaleString(), icon: Star, color: "text-yellow-500" },
        { title: "Total Forks", value: analytics.totalForks.toLocaleString(), icon: GitFork, color: "text-blue-500" },
        { title: "Avg Stars / Repo", value: analytics.averageStars.toString(), icon: TrendingUp, color: "text-green-500" },
        { title: "Top Repo", value: analytics.mostStarredRepo?.name || "—", icon: Award, color: "text-purple-500" },
        { title: "Recently Updated", value: analytics.recentlyUpdatedRepo?.name || "—", icon: Clock, color: "text-orange-500" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
            ))}
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
    return (
        <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                    <p className="text-xl font-bold mt-2 text-card-foreground truncate w-full" title={value}>
                        {value}
                    </p>
                </div>
                <div className={`p-2 rounded-lg bg-muted/50 group-hover:scale-110 transition-transform ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}