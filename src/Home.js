import React from "react";
import { Box, Card, Flex, Link, Image, Heading, Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar as faRegularStar,
    faClock
} from "@fortawesome/free-regular-svg-icons";
import { faStar, faTable, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Recipes } from "./data";
import "./Home.css";

class Home extends React.Component {
    render() {
        return (
            <Box width={["1", "38em", "50em", "62em", "72em"]} m="auto">
                <Flex flexWrap="wrap">
                    {Recipes.map(
                        ({
                            title,
                            description,
                            thumbnail,
                            recipeYield,
                            cookTime,
                            servings
                        }) => {
                            return (
                                <Box width={[1, 1 / 2, 1 / 3]} p="3">
                                    <Card
                                        bg="white"
                                        borderRadius={3}
                                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                                        css={{ overflow: "hidden" }}
                                    >
                                        <Box
                                            css={{
                                                position: "relative",
                                                height: "203px"
                                            }}
                                        >
                                            <Image
                                                src={thumbnail}
                                                width={[1]}
                                                height="203px"
                                            />

                                            <Box
                                                css={{
                                                    position: "absolute",
                                                    bottom: 0,
                                                    right: 0,
                                                    borderTopLeftRadius: "3px"
                                                }}
                                                bg="white"
                                            >
                                                <Box
                                                    p="1"
                                                    css={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "70%",
                                                        overflow: "hidden"
                                                    }}
                                                >
                                                    <Box
                                                        css={{
                                                            minWidth: "87px"
                                                        }}
                                                    >
                                                        {[0, 1, 2, 3, 4].map(
                                                            index => {
                                                                return (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faStar
                                                                        }
                                                                        size="sm"
                                                                        index={
                                                                            index
                                                                        }
                                                                        mask={[
                                                                            "far"
                                                                        ]}
                                                                        color="#FF8C00"
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </Box>
                                                </Box>

                                                <Box
                                                    p="1"
                                                    justifyContent="center"
                                                >
                                                    {[0, 1, 2, 3, 4].map(
                                                        index => {
                                                            return (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faRegularStar
                                                                    }
                                                                    size="sm"
                                                                    index={
                                                                        index
                                                                    }
                                                                    mask={[
                                                                        "far"
                                                                    ]}
                                                                    color="#676767"
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box p={3}>
                                            <Link
                                                href="/"
                                                color="gray.1"
                                                css={{
                                                    textDecoration: "none",
                                                    "&:hover": {
                                                        color: "#6ba72b"
                                                    },
                                                    transition:
                                                        "all 0.2s ease-in-out"
                                                }}
                                            >
                                                <Heading
                                                    as="h2"
                                                    fontWeight="400"
                                                >
                                                    {title}
                                                </Heading>
                                            </Link>
                                            <Text
                                                fontSize={1}
                                                mt="3"
                                                color="gray.1"
                                                lineHeight="1.8"
                                            >
                                                {description}
                                            </Text>
                                        </Box>
                                        <Flex
                                            css={{
                                                borderTop: "1px solid #eee"
                                            }}
                                            p={3}
                                        >
                                            <Flex alignItems="center">
                                                <FontAwesomeIcon
                                                    icon={faTable}
                                                    size="sm"
                                                    color="#676767"
                                                />

                                                <Text
                                                    fontSize={1}
                                                    color="gray.1"
                                                    lineHeight="1.8"
                                                    ml="2"
                                                >
                                                    {recipeYield}
                                                </Text>
                                            </Flex>
                                            <Flex
                                                justifyContent="center"
                                                alignItems="center"
                                                mr="3"
                                                ml="3"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUsers}
                                                    size="sm"
                                                    color="#676767"
                                                />

                                                <Text
                                                    fontSize={1}
                                                    color="gray.1"
                                                    lineHeight="1.8"
                                                    ml="2"
                                                >
                                                    {servings}
                                                </Text>
                                            </Flex>
                                            <Flex
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faClock}
                                                    size="sm"
                                                    color="#676767"
                                                />
                                                <Text
                                                    fontSize={1}
                                                    color="gray.1"
                                                    lineHeight="1.8"
                                                    ml="2"
                                                >
                                                    {cookTime}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Card>
                                </Box>
                            );
                        }
                    )}
                </Flex>
            </Box>
        );
    }
}

export default Home;
