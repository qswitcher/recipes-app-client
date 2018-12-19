import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Toggle = styled.div`
    border: 1px solid black;
    border-radius: 3px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 20px;
    height: 20px;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-right: ${({ theme: { space } }) => space[2]}px;
    background-color: ${({ checked, theme: { colors } }) =>
        checked ? colors.green : colors.white}
    border-color: ${({ theme: { colors } }) => colors.gray[2]};
`;

const HiddenInput = styled.input`
    opacity: 0;
    position: absolute;
    cursor: pointer;
`;

const FlexLabel = styled.label`
    display: flex;
    align-items: ${({ align }) => align || "center"};
    cursor: pointer;
`;

const CheckboxLabel = styled.span`
    color: ${({ theme: { colors }, checked }) =>
        checked ? colors.gray[2] : colors.gray[1]};
    text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
    white-space: pre-line;
    line-height: ${({ theme }) => theme.lineHeights[2]};
`;

class Checkbox extends React.Component {
    render() {
        const { label, align, checked, onCheck } = this.props;

        return (
            <FlexLabel align={align}>
                <HiddenInput
                    type="checkbox"
                    checked={checked}
                    onChange={onCheck}
                />
                <Toggle checked={checked}>
                    {checked && (
                        <FontAwesomeIcon
                            icon={faCheck}
                            color="#ffffff"
                            size="sm"
                        />
                    )}
                </Toggle>
                <CheckboxLabel checked={checked}>{label}</CheckboxLabel>
            </FlexLabel>
        );
    }
}

export default Checkbox;
