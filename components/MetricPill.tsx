import React from "react";
import { GoalMetric, GoalType } from "../types";

const colorMap: Record<GoalType, string> = {
  [GoalType.MAU]: "bg-blue-50 text-blue-700 border-blue-100",
  [GoalType.ADOPTION]: "bg-purple-50 text-purple-700 border-purple-100",
  [GoalType.CAPACITY]: "bg-sprout-50 text-sprout-700 border-sprout-100",
  [GoalType.ACCURACY]: "bg-amber-50 text-amber-700 border-amber-100",
};

export const MetricPill: React.FC<{ goal: GoalMetric }> = ({ goal }) => {
  return (
    <div className={`px-3 py-2 rounded-lg border text-xs font-medium ${colorMap[goal.type]} flex flex-col shadow-sm`}>
      <div className="flex items-center gap-1 mb-1 opacity-80">
         <span className="uppercase tracking-wide text-[10px] font-bold">{goal.type}</span>
      </div>
      <span className="text-base font-bold">{goal.value}</span>
      <span className="text-[10px] mt-0.5 opacity-70 leading-tight">{goal.description}</span>
    </div>
  );
};