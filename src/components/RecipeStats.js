import React from "react";
import { Flex, Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTable, faUsers } from "@fortawesome/free-solid-svg-icons";

class RecipeStats extends React.Component {
    render() {
        const { recipeYield, servings, cookTime, size = "sm" } = this.props;

        let fontSize = "1";
        if (size === "md") {
            fontSize = "2";
        } else if (size === "lg") {
            fontSize = "3";
        }

        return (
            <React.Fragment>
                <Flex alignItems="center">
                    <FontAwesomeIcon
                        icon={faTable}
                        size={size}
                        color="#676767"
                    />

                    <Text
                        fontSize={fontSize}
                        color="gray.1"
                        lineHeight="1.8"
                        ml="2"
                    >
                        {recipeYield}
                    </Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" mr="3" ml="3">
                    <FontAwesomeIcon
                        icon={faUsers}
                        size={size}
                        color="#676767"
                    />

                    <Text
                        fontSize={fontSize}
                        color="gray.1"
                        lineHeight="1.8"
                        ml="2"
                    >
                        {servings}
                    </Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    <FontAwesomeIcon
                        icon={faClock}
                        size={size}
                        color="#676767"
                    />
                    <Text
                        fontSize={fontSize}
                        color="gray.1"
                        lineHeight="1.8"
                        ml="2"
                    >
                        {cookTime}
                    </Text>
                </Flex>
            </React.Fragment>
        );
    }
}

export default RecipeStats;
