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
import { withAuthenticator } from "aws-amplify-react";
import "./App.css";

Amplify.configure(aws_exports);

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <Flex flexDirection="column" css={{ minHeight: "100vh" }}>
                        <Header />
                        <Box py="4" px="2" css={{ flexGrow: 1 }}>
                            <Route path="/" exact component={Home} />
                            <Route path="/recipe/" component={Recipe} />
                        </Box>
                        <Footer />
                    </Flex>
                </Router>
            </ThemeProvider>
        );
    }
}

export default withAuthenticator(App, true);
