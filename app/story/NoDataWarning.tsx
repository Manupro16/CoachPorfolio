import {Button, Flex, Heading} from "@radix-ui/themes";
import React from "react";
import Link from "next/link";


interface NoDataWarningProps {
    ChildrenComponentName: string
    TeamId?: string
}

function NoDataWarning({ChildrenComponentName, TeamId}: NoDataWarningProps) {
    let link: string
    if (TeamId) {
        link = `/story/edit/${ChildrenComponentName}/${TeamId}`;
    } else {
        link = `/story/edit/${ChildrenComponentName}`;
    }


    return (
        <Flex as="div" align="start" justify="center" className="w-screen h-screen" gap="4">
            <Heading
                as="h1"
                size="5"
                weight="bold"
                className="text-white"
            >
                No {ChildrenComponentName} data available
            </Heading>
            <Link href={link}>
                <Button variant="solid" size="1">
                    Edit {ChildrenComponentName} Life
                </Button>
            </Link>
        </Flex>
    );
}


export default NoDataWarning;
