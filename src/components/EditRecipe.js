import React from "react";
import { Box, Card, Flex, Image, Heading } from "rebass";
import {
    AlertDanger,
    PrimaryBtn,
    Text,
    TextInput,
    TextArea,
    FormLabel
} from "./theme";
import apiFacade from "../api/apiFacade";
import { withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import { updateRecipe } from "../graphql/mutations";
import gql from "graphql-tag";
import PhotoPicker from "./PhotoPicker";

const sanitize = recipe => {
    return Object.entries(recipe).reduce((acc, entry) => {
        if (entry[1] !== "") {
            acc[entry[0]] = entry[1];
        }
        return acc;
    }, {});
};

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: {
                title: "",
                thumbnail: "",
                longDescription: "",
                ingredients: "",
                instructions: "",
                recipeYield: "",
                servings: "",
                cookTime: "",
                photo: undefined
            }
        };
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        apiFacade.getRecipe(id).then(recipe => {
            const sanitized = Object.keys(recipe).reduce((acc, k) => {
                acc[k] = recipe[k] || "";
                return acc;
            }, {});
            this.setState({
                recipe: sanitized
            });
        });
    }

    validate = () => {
        const required = ["title", "thumbnail", "ingredients", "instructions"];

        const missing = required.find(
            key =>
                !this.state.recipe[key] || this.state.recipe[key].length === 0
        );
        if (missing) {
            this.setState({ error: `Field '${missing}' is required.` });
        }
        return !missing;
    };

    handleSubmit = () => {
        const { match, client } = this.props;
        const { recipe } = this.state;
        const id = (match && match.params && match.params.id) || null;
        if (id && this.validate()) {
            client
                .mutate({
                    mutation: gql(updateRecipe),
                    variables: {
                        input: sanitize(recipe)
                    }
                })
                .then(
                    response => {
                        this.props.history.push(`/recipe/${id}`);
                    },
                    errors => {
                        this.setState({
                            error: "An unexpected error occurred"
                        });
                        console.log(errors);
                    }
                );
        }
    };

    handleOnChange = event => {
        const id = event.target.id;
        let value = event.target.value;
        if (["ingredients", "instructions"].includes(id)) {
            value = value.split(/\n+/).filter(v => !!v);
        }
        const { recipe } = this.state;
        recipe[id] = value;
        this.setState({ recipe });
    };

    handlePhoto = file => {
        const { recipe } = this.state;
        recipe.photo = file;
        this.setState({
            recipe
        });
    };

    render() {
        const {
            title,
            longDescription,
            shortDescription,
            ingredients,
            instructions,
            recipeYield,
            servings,
            cookTime,
            photo
        } = this.state.recipe;

        const { error } = this.state;
        const { match } = this.props;
        const id = (match && match.params && match.params.id) || null;

        return (
            <Box width={[1, 1, 1]} m="auto" css={{ maxWidth: "64em" }}>
                <Card
                    bg="white"
                    borderRadius={3}
                    boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                    css={{ overflow: "hidden" }}
                    p="3"
                >
                    <Heading mx="3" mb="2" as="h1" color="gray.1">
                        {!!id ? "Edit Recipe" : "New Recipe"}
                    </Heading>
                    <Flex flexDirection="row" flexWrap="wrap">
                        <Box px="3" width={[1, 1 / 2]}>
                            <Text>Image *</Text>
                            <PhotoPicker
                                imgKey={(photo || {}).key}
                                onChange={this.handlePhoto}
                            />
                        </Box>
                        <Box px="3" width={[1, 1 / 2]}>
                            <Box width={[1]}>
                                <FormLabel id="title" label="Title *" />
                                <TextInput
                                    id="title"
                                    value={title}
                                    onChange={this.handleOnChange}
                                />
                            </Box>
                            <Box width={[1]}>
                                <FormLabel id="recipeYield" label="Yield" />
                                <TextInput
                                    id="recipeYield"
                                    value={recipeYield}
                                    onChange={this.handleOnChange}
                                />
                            </Box>
                            <Box width={[1]}>
                                <FormLabel id="servings" label="Servings" />
                                <TextInput
                                    id="servings"
                                    value={servings}
                                    onChange={this.handleOnChange}
                                />
                            </Box>
                            <Box width={[1]}>
                                <FormLabel id="cookTime" label="Cook time" />
                                <TextInput
                                    id="cookTime"
                                    value={cookTime}
                                    onChange={this.handleOnChange}
                                />
                            </Box>
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel
                                id="shortDescription"
                                label="Short description"
                                onChange={this.handleOnChange}
                            />
                            <TextArea
                                id="shortDescription"
                                value={shortDescription}
                                onChange={this.handleOnChange}
                            />
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel
                                id="longDescription"
                                label="Long description"
                                onChange={this.handleOnChange}
                            />
                            <TextArea
                                id="longDescription"
                                value={longDescription}
                                onChange={this.handleOnChange}
                            />
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel id="ingredients" label="Ingredients *" />
                            <TextArea
                                id="ingredients"
                                rows={ingredients ? ingredients.length : 5}
                                value={
                                    ingredients ? ingredients.join("\n") : ""
                                }
                                onChange={this.handleOnChange}
                            />
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel
                                id="instructions"
                                label="Instructions *"
                            />
                            <TextArea
                                id="instructions"
                                rows={
                                    instructions ? instructions.length * 2 : 5
                                }
                                value={
                                    instructions ? instructions.join("\n") : ""
                                }
                                onChange={this.handleOnChange}
                            />
                        </Box>

                        {error && (
                            <Box m="3" width={[1]}>
                                <AlertDanger>{error}</AlertDanger>
                            </Box>
                        )}
                        <Box m="3">
                            <PrimaryBtn onClick={this.handleSubmit} width="1">
                                Save
                            </PrimaryBtn>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        );
    }
}

export default withApollo(withRouter(EditRecipe));
