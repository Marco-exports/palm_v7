import React from "react"
import ReactDOM from "react-dom"
import {BaseProvider, LightTheme} from 'baseui'
import {Provider as StyletronProvider} from "styletron-react"
import {Client as Styletron} from "styletron-engine-atomic"
import './Utilities/theme.css'
import './App.css'
import Apps from "../../../../Desktop/untitled folder/src/App"

const engine = new Styletron()
function App() { return <Apps /> }

const rootElement = document.getElementById("root")

ReactDOM.render(
    <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
            <App />
        </BaseProvider>
    </StyletronProvider>,
   rootElement
)

