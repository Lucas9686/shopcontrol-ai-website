"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RevenueForecastChartProps {
  title: string;
  description: string;
  labels: {
    revenue: string;
    costs: string;
    year1: string;
    year2: string;
    year3: string;
  };
}

const DATA = [
  { year: "year1", revenue: 14400, costs: 5400 },
  { year: "year2", revenue: 43200, costs: 12000 },
  { year: "year3", revenue: 86400, costs: 20000 },
];

export function RevenueForecastChart({
  title,
  description,
  labels,
}: RevenueForecastChartProps) {
  const chartConfig = {
    revenue: { label: labels.revenue, color: "var(--chart-1)" },
    costs: { label: labels.costs, color: "var(--chart-2)" },
  } satisfies ChartConfig;

  const yearMap: Record<string, string> = {
    year1: labels.year1,
    year2: labels.year2,
    year3: labels.year3,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart data={DATA} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickFormatter={(v: string) => yearMap[v] ?? v}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `${v / 1000}k`}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `${Number(value).toLocaleString("de-DE")} €`}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="var(--color-revenue)"
              stroke="var(--color-revenue)"
              fillOpacity={0.3}
            />
            <Area
              dataKey="costs"
              type="monotone"
              fill="var(--color-costs)"
              stroke="var(--color-costs)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
