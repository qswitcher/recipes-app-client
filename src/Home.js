import React from "react";
import { Box, Card, Flex, Image, Heading, Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { API, graphqlOperation } from "aws-amplify";
import { listRecipes } from "./graphql/queries";
import Link from "./Link";
import RecipeStats from "./RecipeStats";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }

    componentDidMount() {
        API.graphql(graphqlOperation(listRecipes)).then(response => {
            this.setState({ recipes: response.data.listRecipes.items });
        });
    }

    render() {
        console.log(this.state.recipes);
        return (
            <Flex
                flexWrap="wrap"
                width={["1", "38em", "50em", "62em", "72em"]}
                m="auto"
            >
                {this.state.recipes.map(
                    (
                        {
                            title,
                            shortDescription,
                            thumbnail,
                            recipeYield,
                            cookTime,
                            servings
                        },
                        i
                    ) => {
                        return (
                            <Box width={[1, 1 / 2, 1 / 3]} p="3" key={i}>
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
                                                                    key={
                                                                        index +
                                                                        i * 10
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

                                            <Box p="1" justifyContent="center">
                                                {[0, 1, 2, 3, 4].map(index => {
                                                    return (
                                                        <FontAwesomeIcon
                                                            icon={faRegularStar}
                                                            size="sm"
                                                            key={index + i * 10}
                                                            mask={["far"]}
                                                            color="#676767"
                                                        />
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box p={3}>
                                        <Link to="/recipe/">
                                            <Heading
                                                as="h2"
                                                fontWeight="400"
                                                color="gray.1"
                                                css={{
                                                    "&:hover": {
                                                        color: "#6ba72b"
                                                    },
                                                    transition:
                                                        "all 0.2s ease-in-out"
                                                }}
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
                                            {shortDescription}
                                        </Text>
                                    </Box>
                                    <Flex
                                        css={{
                                            borderTop: "1px solid #eee"
                                        }}
                                        p={3}
                                    >
                                        <RecipeStats
                                            recipeYield={recipeYield}
                                            cookTime={cookTime}
                                            servings={servings}
                                        />
                                    </Flex>
                                </Card>
                            </Box>
                        );
                    }
                )}
            </Flex>
        );
    }
}

export default Home;
