import React from "react";
import { Box, Card, Flex, Image, Heading, Text } from "rebass";
import { Recipes } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEyeDropper,
    faSortNumericDown
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import RecipeStats from "./RecipeStats";

const RightSpan = styled.span`
    margin-left: ${props => props.theme.space[3]}px;
`;

const List = styled.ul`
    padding: 0;
`;

const NakedLi = styled.li`
    list-style-type: none;
    font-size: ${({ theme: { fontSizes } }) => fontSizes[1]}px;
    margin-bottom: ${({ theme: { space } }) => space[2]}px;
`;

const recipe = Recipes[0];

class Recipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [...recipe.ingredients, ...recipe.instructions].map(
                () => false
            )
        };
    }

    handleIngredientChecked = index => event =>
        this.handleChecked(index, "ingredients");

    handleStepChecked = index => event => this.handleChecked(index, "step");

    handleChecked = (index, type) => {
        const offset = type === "step" ? recipe.ingredients.length : 0;
        const checked = [...this.state.checked];
        checked[index + offset] = !checked[index + offset];
        this.setState({ checked });
    };

    render() {
        const {
            title,
            longDescription,
            ingredients,
            instructions
        } = Recipes[0];
        return (
            // <Flex flexWrap="wrap" m="auto" css={{ maxWidth: "72em" }}>
            <Box p="2" width={[1, 1, 1]} m="auto" css={{ maxWidth: "64em" }}>
                <Card
                    bg="white"
                    borderRadius={3}
                    boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                    css={{ overflow: "hidden" }}
                >
                    <Flex flexWrap="wrap">
                        <Box width={[1, 1, 1, 0.4]}>
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
                            <Flex mx="4">
                                <RecipeStats {...recipe} size="md" />
                            </Flex>
                        </Box>

                        <Image
                            src="http://demo.djmimi.net/themes/recipe/wp-content/uploads/2015/02/france-confectionery-83373-848x477.jpg"
                            width={[1, 1, 1, 0.6]}
                            height="100%"
                        />
                    </Flex>

                    <Box>
                        <Flex
                            m="4"
                            css={{ borderTop: "1px solid #eee" }}
                            flexWrap="wrap"
                        >
                            <Box width={[1, 1, 1, 1 / 2]} mt="4">
                                <Heading
                                    as="h4"
                                    color="gray.1"
                                    fontSize="4"
                                    fontWeight="normal"
                                >
                                    <FontAwesomeIcon
                                        icon={faEyeDropper}
                                        color="#6ba72b"
                                    />
                                    <RightSpan>Ingredients</RightSpan>
                                </Heading>
                                <List>
                                    {ingredients.map((ingredient, index) => {
                                        return (
                                            <NakedLi key={index}>
                                                <Checkbox
                                                    checked={
                                                        this.state.checked[
                                                            index
                                                        ]
                                                    }
                                                    onCheck={this.handleIngredientChecked(
                                                        index
                                                    )}
                                                    label={ingredient}
                                                />
                                            </NakedLi>
                                        );
                                    })}
                                </List>
                            </Box>
                            <Box width={[1, 1, 1, 1 / 2]} mt="4">
                                <Heading
                                    as="h4"
                                    color="gray.1"
                                    fontSize="4"
                                    fontWeight="normal"
                                >
                                    <FontAwesomeIcon
                                        icon={faSortNumericDown}
                                        color="#6ba72b"
                                    />
                                    <RightSpan>Steps</RightSpan>
                                </Heading>
                                <List>
                                    {instructions.map((instruction, index) => {
                                        return (
                                            <NakedLi key={index}>
                                                <Checkbox
                                                    align="top"
                                                    checked={
                                                        this.state.checked[
                                                            index +
                                                                recipe
                                                                    .ingredients
                                                                    .length
                                                        ]
                                                    }
                                                    onCheck={this.handleStepChecked(
                                                        index
                                                    )}
                                                    label={`Step ${index +
                                                        1}\n${instruction}`}
                                                />
                                            </NakedLi>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Flex>
                    </Box>
                </Card>
            </Box>
        );
    }
}

export default Recipe;
