import React, { Component } from "react";
import Home from "./Home";
import Header from "./Header";
import { Flex, Box } from "rebass";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Recipe from "./Recipe";
import Footer from "./Footer";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { Authenticator, Greetings, Loading } from "aws-amplify-react";
import Login from "./Login";

import "./App.css";
// import { Authenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native'

Amplify.configure(aws_exports);

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
                <Box py="4" px="2" css={{ flexGrow: 1 }}>
                    <Route path="/" exact component={Home} />
                    <Route path="/recipe/" component={Recipe} />
                </Box>
                <Footer />
            </Flex>
        </Router>
    );
};

const SignInButton = () => <button>Goober</button>;

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Authenticator
                    authState="signIn"
                    onStateChange={authState => console.log(authState)}
                    hide={[Greetings, Loading]}
                    theme={{ button: { backgroundColor: "blue" } }}
                >
                    {/* Authenticator expects an array of components, so this ones just a dummy*/}
                    <Dummy />
                    <SignedIn />
                </Authenticator>
            </ThemeProvider>
        );
    }
}

export default App;
