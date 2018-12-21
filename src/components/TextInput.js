import React from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
    color: #676767;
    background-color: #f5f5f5;
    border: none;
    line-height: 24px;
    padding: 6px 12px;
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
`;

const TextInput = ({ id, value }) => (
    <StyledTextInput name={id} id={id} value={value} />
);

export default TextInput;
