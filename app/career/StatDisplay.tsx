// StatDisplay.tsx
import React from "react";
import {Box, Flex, Text} from "@radix-ui/themes";

interface StatDisplayProps {
    label: string;
    value: string | number | React.ReactNode; // Can be a string or a number
    icon?: React.ReactNode;
    justify?: "center" | "start" | "end" | "between"
}

const StatDisplay: React.FC<StatDisplayProps> = ({label, value, icon, justify}) => {
    return (
        <Flex className="whitespace-normal break-words" gap="4" align="center" justify={justify}>
            {icon && <span className="text-xl">{icon}</span>}
            <Text className="font-bold">{label}</Text>
            <Text>{value}</Text>
        </Flex>
    );
};

export default StatDisplay;
