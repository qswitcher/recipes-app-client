import React from "react";
import { Box, Flex, Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "./Link";

class Home extends React.Component {
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

                    <Flex mr="3">
                        <Box
                            my={"-.25em"}
                            mr="2"
                            color="white"
                            css={{ opacity: "0.6" }}
                        >
                            <FontAwesomeIcon icon={faUser} size="xs" />
                        </Box>
                        <Text
                            fontSize="0"
                            color="white"
                            css={{ textTransform: "uppercase" }}
                        >
                            Register
                        </Text>
                    </Flex>

                    <Flex>
                        <Box
                            my={"-.25em"}
                            mr="2"
                            color="white"
                            css={{ opacity: "0.6" }}
                        >
                            <FontAwesomeIcon icon={faSignInAlt} size="xs" />
                        </Box>
                        <Text
                            fontSize="0"
                            color="white"
                            css={{ textTransform: "uppercase" }}
                        >
                            Login
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        );
    }
}

export default Home;
