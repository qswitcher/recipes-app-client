import React from "react";
import { Box, Card, Flex, Image, Heading } from "rebass";
import { PrimaryBtn, Text, TextInput, TextArea, FormLabel } from "./theme";

class EditRecipe extends React.Component {
    render() {
        const id = null;
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
                            <Text>Image</Text>
                            <Image src="http://demo.djmimi.net/themes/recipe/wp-content/uploads/2015/02/france-confectionery-83373-848x477.jpg" />
                        </Box>
                        <Box px="3" width={[1, 1 / 2]}>
                            <Box width={[1]}>
                                <FormLabel id="title" label="Title" />
                                <TextInput id="title" />
                            </Box>
                            <Box width={[1]}>
                                <FormLabel id="recipeYield" label="Yield" />
                                <TextInput id="recipeYield" />
                            </Box>
                            <Box width={[1]}>
                                <FormLabel id="servings" label="Servings" />
                                <TextInput id="servings" />
                            </Box>
                            <Box width={[1]}>
                                <FormLabel id="cookTime" label="Cook time" />
                                <TextInput id="cookTime" />
                            </Box>
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel
                                id="shortDescription"
                                label="Short description"
                            />
                            <TextArea id="shortDescription" />
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel
                                id="longDescription"
                                label="Long description"
                            />
                            <TextArea id="longDescription" />
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel id="ingredients" label="Ingredients" />
                            <TextArea id="ingredients" />
                        </Box>
                        <Box mx="3" width={[1]}>
                            <FormLabel id="instructions" label="Instructions" />
                            <TextArea id="instructions" />
                        </Box>
                        <Box m="3">
                            <PrimaryBtn width="1">Save</PrimaryBtn>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        );
    }
}

export default EditRecipe;
