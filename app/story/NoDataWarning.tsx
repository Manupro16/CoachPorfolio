import {Flex, Heading} from "@radix-ui/themes";
import React from "react";

interface NoDataWarningProps {
    ChildrenComponentName: string
}

function NoDataWarning({ ChildrenComponentName  }: NoDataWarningProps) {
    return (
                <Flex as="div" align="start" justify="center" className="w-screen h-screen ">
                    <Heading
                        as="h1"
                        size="5"
                        weight="bold"
                        className="text-textLight leading-tight "
                        style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'}}
                    >
                        No {ChildrenComponentName} data available
                    </Heading>
                </Flex>
    );
}


export default NoDataWarning;
