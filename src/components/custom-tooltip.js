import React from "react";
import { Tooltip } from "recharts";

const ChartTooltip = Tooltip;

const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload = [],
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    if (!active || payload.length === 0) return null;

    // Format the tooltip's title (label)
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload.length) return null;

      const [item] = payload;
      const value = label || item.name || "Value";

      return labelFormatter ? (
        <div style={{ fontWeight: "bold" }}>
          {labelFormatter(value, payload)}
        </div>
      ) : (
        <div style={{ fontWeight: "bold" }}>{value}</div>
      );
    }, [label, labelFormatter, payload, hideLabel]);

    return (
      <div
        ref={ref}
        style={{
          minWidth: "120px",
          padding: "8px",
          borderRadius: "6px",
          backgroundColor: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          fontSize: "12px",
        }}
      >
        {tooltipLabel}
        <div>
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  marginBottom: "4px",
                }}
              >
                {!hideIndicator && (
                  <div
                    style={{
                      width: indicator === "dot" ? "10px" : "6px",
                      height: "10px",
                      backgroundColor: indicatorColor,
                      borderRadius: indicator === "dot" ? "50%" : "2px",
                    }}
                  />
                )}
                <span style={{ color: "#666" }}>{item.name}</span>
                <span style={{ fontFamily: "monospace", fontWeight: "bold" }}>
                  {item.value?.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltip";

export { ChartTooltip, ChartTooltipContent };
