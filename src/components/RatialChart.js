import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Tooltip,
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import "./styles/RadialChart.css";
import { ChartTooltip, ChartTooltipContent } from "./custom-tooltip";

import { useTasks } from "./utils";
import { act } from "react";
const chartData = [{ month: "January", desktop: 1260, mobile: 570 }];
const chartConfig = {
  desktop: {
    label: "Completed",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pending",
    color: "#EB4E31",
  },
};
export function RadialChart() {
  const { tasks, completedTasks, activeTasks } = useTasks();
  const tasksTotal = tasks.length;

  const chartData = [
    {
      name: "Tasks",
      pending: activeTasks ?? 0,
      completed: completedTasks ?? 0,
    },
  ];
  console.log(chartData);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Pending vs Completed Tasks</h2>
        <p className="card-description">Task Completion Status</p>
      </div>
      <div className="card-content">
        <div className="chart-container">
          <RadialBarChart
            width={200}
            height={200}
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip content={<ChartTooltipContent hideLabel={true} />} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 16}
                          className="chart-total"
                        >
                          {tasksTotal.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 4}
                          className="chart-label"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={2}
              fill="#8BCE89"
            />
            <RadialBar
              dataKey="pending"
              stackId="a"
              cornerRadius={2}
              fill="#EB4E31"
            />
          </RadialBarChart>
        </div>
      </div>
    </div>
  );
}
