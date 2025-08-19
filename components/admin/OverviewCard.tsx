"use client";

import { cn } from '@/lib/utils';
import type { JSX, SVGProps } from "react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate?: number;
  };
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function OverviewCard({ label, data, Icon }: PropsType) {
  const isDecreasing = data.growthRate && data.growthRate < 0;
  const hasGrowthRate = data.growthRate !== undefined;

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <Icon className="h-8 w-8 text-blue-600" />
        {hasGrowthRate && (
          <span
            className={cn(
              "text-sm font-medium flex items-center gap-1",
              isDecreasing ? "text-red-500" : "text-green-500",
            )}
          >
            {data.growthRate}%
            {isDecreasing ? "↓" : "↑"}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {data.value}
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}