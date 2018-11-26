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
    width: 20px;
    height: 20px;
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
    align-items: center;
    cursor: pointer;
`;

const CheckboxLabel = styled.span`
    color: ${({ theme: { colors }, checked }) =>
        checked ? colors.gray[2] : colors.gray[1]};
    text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
`;

class Checkbox extends React.Component {
    render() {
        const { label, checked, onCheck } = this.props;

        return (
            <FlexLabel>
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
