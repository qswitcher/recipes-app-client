import React from "react";
import { Box, Flex, Text, Link } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
    render() {
        return (
            <Box py="3" width="100%" bg="black">
                <Flex px="5" alignItems="center">
                    <Text fontSize="5" color="white" fontFamily="cursive">
                        Bongo's Kitchen
                    </Text>
                    <Box mx={"auto"} />

                    <Link
                        mr="3"
                        href={"/"}
                        color="white"
                        css={{ textDecoration: "none" }}
                    >
                        <Flex>
                            <Box my={"-.25em"} mr="2" css={{ opacity: "0.6" }}>
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
                    </Link>
                    <Link
                        href={"/"}
                        color="white"
                        css={{ textDecoration: "none" }}
                    >
                        <Flex>
                            <Box my={"-.25em"} mr="2" css={{ opacity: "0.6" }}>
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
                    </Link>
                </Flex>
            </Box>
        );
    }
}

export default Home;
