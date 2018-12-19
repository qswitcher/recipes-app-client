import React from "react";
import { Box, Flex, Text } from "rebass";
import Link from "./Link";

class Header extends React.Component {
    render() {
        return (
            <Box py="3" width="100%" bg="black">
                <Flex px="5" alignItems="center">
                    <Link to="/">
                        <Text fontSize="5" color="white" fontFamily="cursive">
                            Bongo's Kitchen
                        </Text>
                    </Link>

                    <Box mx={"auto"} />

                    {this.props.children}
                </Flex>
            </Box>
        );
    }
}

export default Header;
