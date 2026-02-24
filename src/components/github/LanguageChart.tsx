"use client";

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
    // const displayData = data.slice(0, 10);
    const displayData = data;

    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm w-full max-w-2xl">
            <h3 className="font-semibold text-gray-800 mb-4">Language Usage</h3>

            {data.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                    No language data available
                </div>
            ) : (
                <div style={{ width: "100%", height: 320 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={displayData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                            <XAxis
                                dataKey="name"
                                angle={-20}
                                textAnchor="end"
                                height={40}
                                interval={0}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                label={{
                                    value: "Number of repos",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { textAnchor: "middle", fill: "#666", fontSize: 13 },
                                }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(255,255,255,0.98)",
                                    border: "1px solid #ddd",
                                    color: "#333",
                                    borderRadius: "6px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                }}
                            />

                            <Legend wrapperStyle={{ paddingTop: 8 }} />

                            <Bar
                                dataKey="count"
                                name="Repositories"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            >
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}