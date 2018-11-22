import React, { Component } from "react";
import Home from "./Home";
import Header from "./Header";
import { Box } from "rebass";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./App.css";

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <Header />
                    <Home />
                </Box>
            </ThemeProvider>
        );
    }
}

export default App;
