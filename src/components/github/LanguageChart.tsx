"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { LanguageStat } from "@/utils/languageStats";

interface LanguageChartProps {
    data: LanguageStat[];
}

export default function LanguageChart({ data }: LanguageChartProps) {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-96 w-full animate-pulse bg-muted rounded-xl" />;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    const textColor = isDark ? "#94a3b8" : "#64748b"; // muted-foreground
    const gridColor = isDark ? "#1e293b" : "#e2e8f0"; // border
    const tooltipBg = isDark ? "#0f172a" : "#ffffff";
    const tooltipBorder = isDark ? "#1e293b" : "#e2e8f0";
    const tooltipText = isDark ? "#f8fafc" : "#0f172a";
    const barColor = isDark ? "#3b82f6" : "#2563eb"; // primary

    return (
        <div className="bg-card text-card-foreground border border-border/50 rounded-2xl p-6 shadow-sm w-full transition-colors">
            <h3 className="font-bold tracking-tight text-xl mb-6">Language Usage</h3>

            {data.length === 0 ? (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                    No language data available
                </div>
            ) : (
                <div style={{ width: "100%", height: 360 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />

                            <XAxis
                                dataKey="name"
                                angle={-20}
                                textAnchor="end"
                                height={50}
                                interval={0}
                                tick={{ fontSize: 13, fill: textColor }}
                                tickMargin={10}
                                axisLine={{ stroke: gridColor }}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{ fontSize: 13, fill: textColor }}
                                axisLine={{ stroke: gridColor }}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: tooltipBg,
                                    border: `1px solid ${tooltipBorder}`,
                                    color: tooltipText,
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                                cursor={{ fill: isDark ? "#1e293b" : "#f1f5f9" }}
                            />

                            <Legend wrapperStyle={{ paddingTop: 20, color: textColor }} />

                            <Bar
                                dataKey="count"
                                name="Repositories"
                                fill={barColor}
                                radius={[6, 6, 0, 0]}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}