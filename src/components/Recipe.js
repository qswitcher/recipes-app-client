import React from "react";
import { Box, Card, Flex, Heading, Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEyeDropper,
    faSortNumericDown,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Link from "./Link";
import RecipeStats from "./RecipeStats";
import Photo from "./Photo";
import { Query } from "react-apollo";
import { getRecipe } from "../graphql/queries";
import gql from "graphql-tag";

const RightSpan = styled.span`
    margin-left: ${props => props.theme.space[3]}px;
`;

const MarginSpan = styled.span`
    margin-right: ${props => props.theme.space[props.mr]}px;
`;

const List = styled.ul`
    padding: 0;
`;

const NakedLi = styled.li`
    list-style-type: none;
    font-size: ${({ theme: { fontSizes } }) => fontSizes[1]}px;
    margin-bottom: ${({ theme: { space } }) => space[2]}px;
`;

class Recipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: []
        };
    }

    handleIngredientChecked = (recipe, index) => event =>
        this.handleChecked(recipe, index, "ingredients");

    handleStepChecked = (recipe, index) => event =>
        this.handleChecked(recipe, index, "step");

    handleChecked = (recipe, index, type) => {
        const offset = type === "step" ? recipe.ingredients.length : 0;
        const checked = [...this.state.checked];
        checked[index + offset] = !checked[index + offset];
        this.setState({ checked });
    };

    handleQueryComplete = ({ getRecipe }) => {
        const recipe = getRecipe;
        if (!this.state.checked) {
            this.setState({
                checked: [...recipe.ingredients, ...recipe.instructions].map(
                    () => false
                )
            });
        }
    };

    render() {
        const { id } = this.props.match.params;

        return (
            <Query
                query={gql(getRecipe)}
                variables={{ id }}
                onCompleted={this.handleQueryComplete}
            >
                {({ loading, data, error }) => {
                    if (loading) {
                        return null;
                    }
                    const recipe = data.getRecipe;

                    const {
                        title,
                        photo,
                        longDescription,
                        ingredients,
                        instructions
                    } = recipe;

                    return (
                        <Box
                            p="2"
                            width={[1, 1, 1]}
                            m="auto"
                            css={{ maxWidth: "64em" }}
                        >
                            <Card
                                bg="white"
                                borderRadius={3}
                                boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                                css={{ overflow: "hidden" }}
                            >
                                <Flex flexWrap="wrap">
                                    <Box width={[1, 1, 1, 0.4]}>
                                        <Heading m="4" as="h1" color="gray.1">
                                            <MarginSpan mr="3">
                                                {title}
                                            </MarginSpan>
                                            <Link to={`/edit/${id}`}>
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    color="#6ba72b"
                                                />
                                            </Link>
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
                                            <RecipeStats
                                                {...recipe}
                                                size="1x"
                                            />
                                        </Flex>
                                    </Box>
                                    <Box width={[1, 1, 1, 0.6]}>
                                        <Photo photo={photo} />
                                    </Box>
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
                                                <RightSpan>
                                                    Ingredients
                                                </RightSpan>
                                            </Heading>
                                            <List>
                                                {ingredients.map(
                                                    (ingredient, index) => {
                                                        return (
                                                            <NakedLi
                                                                key={index}
                                                            >
                                                                <Checkbox
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .checked[
                                                                            index
                                                                        ]
                                                                    }
                                                                    onCheck={this.handleIngredientChecked(
                                                                        recipe,
                                                                        index
                                                                    )}
                                                                    label={
                                                                        ingredient
                                                                    }
                                                                />
                                                            </NakedLi>
                                                        );
                                                    }
                                                )}
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
                                                {instructions.map(
                                                    (instruction, index) => {
                                                        return (
                                                            <NakedLi
                                                                key={index}
                                                            >
                                                                <Checkbox
                                                                    align="top"
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .checked[
                                                                            index +
                                                                                recipe
                                                                                    .ingredients
                                                                                    .length
                                                                        ]
                                                                    }
                                                                    onCheck={this.handleStepChecked(
                                                                        recipe,
                                                                        index
                                                                    )}
                                                                    label={`Step ${index +
                                                                        1}\n${instruction}`}
                                                                />
                                                            </NakedLi>
                                                        );
                                                    }
                                                )}
                                            </List>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Card>
                        </Box>
                    );
                }}
            </Query>
        );
    }
}

export default Recipe;
