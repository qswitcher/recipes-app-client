import React, { Component } from "react";
import { Flex, Box } from "rebass";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Footer from "./components/Footer";
import Login from "./components/Login";
import EditRecipe from "./components/EditRecipe";

import Amplify, { Auth } from "aws-amplify";
import aws_exports from "./aws-exports";
import { Authenticator, Greetings, Loading } from "aws-amplify-react";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import "./App.css";
import { ApolloProvider } from "react-apollo";

Amplify.configure(aws_exports);

const client = new AWSAppSyncClient({
    url: aws_exports.aws_appsync_graphqlEndpoint,
    region: aws_exports.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () =>
            (await Auth.currentSession()).getAccessToken().getJwtToken()
    },
    complexObjectsCredentials: () => Auth.currentCredentials()
});

const Dummy = () => null;

const SignedIn = props => {
    if (props.authState !== "signedIn") {
        return null;
    }
    return (
        <Router>
            <Flex flexDirection="column" css={{ minHeight: "100vh" }}>
                <Header>
                    <Login {...props} />
                </Header>
                <Flex
                    py="2"
                    px="2"
                    css={{ flexGrow: 1 }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Route path="/" exact component={Home} />
                    <Route path="/recipe/:id" component={Recipe} />
                    <Route path="/edit/:id" component={EditRecipe} />
                </Flex>
                <Footer />
            </Flex>
        </Router>
    );
};

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <Authenticator
                        authState="signIn"
                        onStateChange={authState => console.log(authState)}
                        hide={[Greetings, Loading]}
                        theme={{
                            formSection: {
                                borderRadius: "3px",
                                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)"
                            },
                            button: {
                                backgroundColor: "#6ba72b",
                                borderRadius: "3px",
                                textTransform: "none",
                                fontSize: "14px",
                                lineHeight: "24px",
                                padding: "5px 10px"
                            },
                            sectionHeader: {
                                color: "#676767",
                                fontSize: "28px",
                                lineHeight: "1.25"
                            },
                            formField: {
                                color: "#676767"
                            },
                            inputLabel: {
                                color: "#676767"
                            },
                            input: {
                                color: "#676767",
                                backgroundColor: "#f5f5f5",
                                border: "none",
                                lineHeight: "24px",
                                padding: "6px 12px"
                            },
                            a: {
                                color: "#6ba72b"
                            }
                        }}
                    >
                        {/* Authenticator expects an array of components, so this ones just a dummy*/}
                        <Dummy />
                        <SignedIn />
                    </Authenticator>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

export default App;
