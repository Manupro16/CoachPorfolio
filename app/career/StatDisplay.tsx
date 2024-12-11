// StatDisplay.tsx
import React from "react";
import { Flex, Text } from "@radix-ui/themes";

interface StatDisplayProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, icon }) => {
  return (
    <Flex className=" whitespace-normal break-words" gap="2" align="center">
      {icon && <span className="text-xl">{icon}</span>}
      <Text className="font-bold">{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export default StatDisplay;
