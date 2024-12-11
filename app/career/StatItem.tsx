// StatItem.tsx
import { DataList } from "@radix-ui/themes";
import React from "react";

interface StatItemProps {
    label: string;
    value: string | number | React.ReactNode; // Can be a string or a number
    icon?: React.ReactNode; // Optional icon component for the label, e.g., a FontAwesomeIcon component
    minWith?: string; // Optional minimum width for the label, e.g., "60px"
    maxWidth?: string; // Optional maximum width for the label, e.g., "120px"
}

function StatItem({ label, value, icon, minWith, maxWidth }: StatItemProps) {
  return (
    <DataList.Item>
      <DataList.Label minWidth={minWith} maxWidth={maxWidth} >
        {icon && <span className="inline-block mr-2">{icon}</span>}
        {label}
      </DataList.Label>
      <DataList.Value>{value}</DataList.Value>
    </DataList.Item>
  );
}

export default StatItem;
