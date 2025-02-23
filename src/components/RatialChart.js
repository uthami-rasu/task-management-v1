import React from "react";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import "./styles/RadialChart.css";

const chartData = [{ month: "January", desktop: 1260, mobile: 570 }];

export function RadialChart() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Radial Chart - Stacked</h2>
        <p className="card-description">January - June 2024</p>
      </div>
      <div className="card-content">
        <div className="chart-container">
          <RadialBarChart
            width={250}
            height={250}
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 4}
                          className="chart-label"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="#4A90E2"
            />
            <RadialBar
              dataKey="mobile"
              stackId="a"
              cornerRadius={5}
              fill="#50E3C2"
            />
          </RadialBarChart>
        </div>
      </div>
      <div className="card-footer">
        <div className="trend">
          Trending up by 5.2% this month <TrendingUp className="trend-icon" />
        </div>
        <p className="chart-footer-text">
          Showing total visitors for the last 6 months
        </p>
      </div>
    </div>
  );
}
