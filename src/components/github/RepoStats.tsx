import { RepoAnalytics } from "@/utils/repoAnalytics";

export default function RepoStats({
    analytics,
}: {
    analytics: RepoAnalytics;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-6xl">
            <StatCard title="Total Stars" value={analytics.totalStars.toLocaleString()} />
            <StatCard title="Total Forks" value={analytics.totalForks.toLocaleString()} />
            <StatCard title="Avg Stars / Repo" value={analytics.averageStars.toString()} />
            <StatCard
                title="Top Repo"
                value={analytics.mostStarredRepo?.name || "—"}
            />
            <StatCard
                title="Recently Updated"
                value={analytics.recentlyUpdatedRepo?.name || "—"}
            />
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="border rounded-xl p-4 shadow-sm bg-white">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-lg font-semibold mt-1 text-black">{value}</p>
        </div>
    );
}