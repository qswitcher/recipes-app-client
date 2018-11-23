import React from "react";
import { Flex, Text } from "rebass";

class Footer extends React.Component {
    render() {
        return (
            <Flex
                py="3"
                width="100%"
                bg="black"
                justifyContent="center"
                alignItems="center"
            >
                <Text fontSize="0" color="white">
                    All rights reserved © Russom Technologies
                </Text>
            </Flex>
        );
    }
}

export default Footer;
