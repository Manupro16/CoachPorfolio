// StatItem.tsx
import { DataList } from "@radix-ui/themes";
import React from "react";

interface StatItemProps {
    label: string;
    value: string | number | React.ReactNode; // Can be a string or a number
    icon?: React.ReactNode; // Optional icon component for the label, e.g., a FontAwesomeIcon component
}

function StatItem({ label, value, icon }: StatItemProps) {
  return (
    <DataList.Item>
      <DataList.Label minWidth="100px">
        {icon && <span className="inline-block mr-2">{icon}</span>}
        {label}
      </DataList.Label>
      <DataList.Value>{value}</DataList.Value>
    </DataList.Item>
  );
}

export default StatItem;
