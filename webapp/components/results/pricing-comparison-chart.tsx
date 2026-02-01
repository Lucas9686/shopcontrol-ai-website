"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingComparisonChartProps {
  title: string;
  description: string;
  labels: {
    basic: string;
    pro: string;
    enterprise: string;
    pricePerMonth: string;
  };
}

const DATA = [
  { tier: "basic", price: 99 },
  { tier: "pro", price: 179 },
  { tier: "enterprise", price: 299 },
];

export function PricingComparisonChart({
  title,
  description,
  labels,
}: PricingComparisonChartProps) {
  const chartConfig = {
    price: { label: labels.pricePerMonth, color: "var(--chart-1)" },
  } satisfies ChartConfig;

  const tierMap: Record<string, string> = {
    basic: labels.basic,
    pro: labels.pro,
    enterprise: labels.enterprise,
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
              dataKey="tier"
              tickFormatter={(v: string) => tierMap[v] ?? v}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `${v} €`}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `${value} €`}
                />
              }
            />
            <Bar dataKey="price" fill="var(--color-price)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
