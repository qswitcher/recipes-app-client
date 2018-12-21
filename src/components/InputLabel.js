import React from "react";
import styled from "styled-components";

const StyledInputLabel = styled.label`
    display: block;
    color: ${props => props.theme.colors.gray[1]};
    margin-bottom: ${props => props.theme.space[2]}px;
`;

const InputLabel = ({ label, id }) => (
    <StyledInputLabel htmlFor={id}>{label}</StyledInputLabel>
);

export default InputLabel;
