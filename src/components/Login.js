import React from "react";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Flex, Text } from "rebass";
import styled from "styled-components";
import { Auth } from "aws-amplify";

const Wrapper = styled(Flex)`
    cursor: pointer;
`;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                this.setState({ user });
            })
            .catch(err => console.log(err));
    }

    handleClick = () => {
        const { user } = this.state;
        if (user) {
            // HOC will handle kicking us out of the session
            Auth.signOut().then(() => this.props.onStateChange("signedOut"));
        }
    };

    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <Wrapper mr="3">
                    <Box
                        my={"-.25em"}
                        mr="2"
                        color="white"
                        css={{ opacity: "0.6" }}
                    >
                        <FontAwesomeIcon icon={faUser} size="xs" />
                    </Box>
                    <Text
                        fontSize="0"
                        color="white"
                        css={{ textTransform: "uppercase" }}
                    >
                        {user ? user.username : "Register"}
                    </Text>
                </Wrapper>

                <Wrapper onClick={this.handleClick}>
                    <Box
                        my={"-.25em"}
                        mr="2"
                        color="white"
                        css={{ opacity: "0.6" }}
                    >
                        <FontAwesomeIcon icon={faSignInAlt} size="xs" />
                    </Box>
                    <Text
                        fontSize="0"
                        color="white"
                        css={{ textTransform: "uppercase" }}
                    >
                        {user ? "Logout" : "Login"}
                    </Text>
                </Wrapper>
            </React.Fragment>
        );
    }
}

export default Login;
