import {Button, Flex, Heading, Link} from "@radix-ui/themes";
import React from "react";

interface NoDataWarningProps {
    ChildrenComponentName: string
}

function NoDataWarning({ ChildrenComponentName  }: NoDataWarningProps) {
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
                    <Link href={`/story/edit/${ChildrenComponentName}`}>
                        <Button variant="solid" size="1">
                            Edit {ChildrenComponentName} Life
                        </Button>
                    </Link>
                </Flex>
    );
}


export default NoDataWarning;
