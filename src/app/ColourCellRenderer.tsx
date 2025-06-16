import React from "react";

import type { CustomCellRendererProps } from "ag-grid-react";

const StatusDropdownRenderer = (props: CustomCellRendererProps) => {
  const getClassName = (value: string) => {
    if (value === "approved") {
      return "border-green-500 text-green-500";
    } else if (value === "rejected") {
      return "border-red-500 text-red-500";
    } else if (value === "pending") {
      return "border-yellow-500 text-yellow-500";
    }
  };

  return (
    <div className="relative">
      {/* <span
        style={{
          borderLeft: "10px solid " + props?.value,
          paddingRight: "5px",
        }}
      ></span>
      {props?.value || "No color"} */}
      <button className="border px-3 py-1 rounded bg-white text-sm text-green-600 border-green-600 flex items-center gap-2 w-full">
        <p className="flex-1">{props?.value || "Approved"}</p>
        <div className="h-4 w-[1px] bg-green-500"></div>
        <p className="text-xs text-green-500">▼</p>
      </button>
    </div>
  );
};

export default StatusDropdownRenderer;
