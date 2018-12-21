import React from "react";
import { Text as RebassText } from "rebass";
import styled from "styled-components";

export const Text = props => (
    <RebassText color="gray.1" fontSize="2" lineHeight="2" {...props}>
        {props.children}
    </RebassText>
);

const StyledFormLabel = styled.label`
    display: block;
    color: ${props => props.theme.colors.gray[1]};
    font-size: ${props => props.theme.fontSizes[2]}px;
    line-height: ${props => props.theme.lineHeights[2]};
`;

export const FormLabel = ({ label, id }) => (
    <StyledFormLabel htmlFor={id}>{label}</StyledFormLabel>
);

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

export const TextInput = ({ id, value }) => (
    <StyledTextInput name={id} id={id} value={value} />
);

const StyledTextArea = styled.textarea`
    color: #676767;
    background-color: #f5f5f5;
    border: none;
    line-height: 24px;
    padding: 6px 12px;
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
`;

export const TextArea = ({ label, id, value }) => (
    <StyledTextArea id={id} name={id} value={value} />
);

export const PrimaryBtn = styled.button`
    color: ${({ theme }) => theme.colors.white};
    border: none;
    background-color: ${({ theme }) => theme.colors.green};
    border-radius: 3px;
    text-transform: none;
    font-size: ${({ theme }) => theme.fontSizes[1]}px;
    lineheight: ${({ theme }) => theme.lineHeights[2]};
    padding: 5px 10px;
    min-width: 150px;
`;
