import {Box} from "@radix-ui/themes";
import React from "react";


function WebsiteBackgroundColor() {

    return (
        <Box
            as="div"
            className="absolute inset-0 bg-gradient-to-r from-black via-primaryDark to-black opacity-30 pointer-events-none z-0"
        />
    )
}

export default WebsiteBackgroundColor;