"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

interface ScenarioChartProps {
  title: string;
  description: string;
  labels: {
    optimistic: string;
    realistic: string;
    pessimistic: string;
    year1: string;
    year2: string;
    year3: string;
  };
}

const DATA = [
  { year: "year1", optimistic: 20000, realistic: 14400, pessimistic: 8000 },
  { year: "year2", optimistic: 60000, realistic: 43200, pessimistic: 20000 },
  { year: "year3", optimistic: 120000, realistic: 86400, pessimistic: 40000 },
];

export function ScenarioChart({
  title,
  description,
  labels,
}: ScenarioChartProps) {
  const chartConfig = {
    optimistic: { label: labels.optimistic, color: "var(--chart-1)" },
    realistic: { label: labels.realistic, color: "var(--chart-2)" },
    pessimistic: { label: labels.pessimistic, color: "var(--chart-3)" },
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
          <BarChart data={DATA} accessibilityLayer>
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
            <Bar dataKey="optimistic" fill="var(--color-optimistic)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="realistic" fill="var(--color-realistic)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pessimistic" fill="var(--color-pessimistic)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
