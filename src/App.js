import React, { Component } from "react";
import Home from "./Home";
import Header from "./Header";
import { Flex, Box } from "rebass";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Recipe from "./Recipe";
import Footer from "./Footer";

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

export default App;
