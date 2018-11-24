import React from "react";
import { Box, Card, Flex, Image, Heading, Text } from "rebass";
import { Recipes } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const RightSpan = styled.span`
    margin-left: ${props => props.theme.space[3]}px;
`;

class Recipe extends React.Component {
    render() {
        const { title, longDescription } = Recipes[0];
        return (
            <Flex flexWrap="wrap" m="auto" css={{ maxWidth: "72em" }}>
                <Box p="2" width={[1, 1, 2 / 3]}>
                    <Card
                        bg="white"
                        borderRadius={3}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                        css={{ overflow: "hidden" }}
                    >
                        <Image
                            src="http://demo.djmimi.net/themes/recipe/wp-content/uploads/2015/02/france-confectionery-83373-848x477.jpg"
                            width={[1]}
                        />
                        <Box>
                            <Heading m="4" as="h1" color="gray.1">
                                {title}
                            </Heading>
                            <Text
                                m="4"
                                color="gray.1"
                                lineHeight="1.8"
                                fontSize="1"
                            >
                                {longDescription}
                            </Text>
                            <Box
                                m="4"
                                pt="4"
                                css={{ borderTop: "1px solid #eee" }}
                            >
                                <Heading as="h2" color="gray.1">
                                    <FontAwesomeIcon
                                        icon={faEyeDropper}
                                        color="#6ba72b"
                                    />
                                    <RightSpan>Ingredients</RightSpan>
                                </Heading>
                            </Box>
                        </Box>
                    </Card>
                </Box>
                <Flex p="2" width={[1, 1, 1 / 3]} flexDirection="column">
                    <Card
                        p={5}
                        bg="white"
                        borderRadius={3}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                    >
                        Box
                    </Card>
                </Flex>
            </Flex>
        );
    }
}

export default Recipe;
