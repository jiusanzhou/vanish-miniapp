import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "mobx-react"
import { ThemeProvider } from "@chakra-ui/core"

import * as serviceWorker from './utils/serviceWorker'

import App from "./App"

import stores from "./stores"
import { GlobalProvider } from './utils/global'

import "./styles/core.css"
import theme from "./styles/theme"

ReactDOM.render(<Provider {...stores}>
    <ThemeProvider theme={theme}>
        <GlobalProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalProvider>
    </ThemeProvider>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
