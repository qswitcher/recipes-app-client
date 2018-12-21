import React from "react";
import { Box, Card, Flex, Image, Heading, Text } from "rebass";
import styled from "styled-components";

const StyledInput = styled.input`
    color: #676767;
    background-color: #f5f5f5;
    border: none;
    line-height: 24px;
    padding: 6px 12px;
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
`;

const Label = styled.label`
    display: block;
    color: ${props => props.theme.colors.gray[1]};
    margin-bottom: ${props => props.theme.space[2]}px;
`;

class Input extends React.Component {
    render() {
        const { label } = this.props;
        return (
            <Box mb="2">
                <Label>{label}</Label>
                <StyledInput />
            </Box>
        );
    }
}

export default Input;
