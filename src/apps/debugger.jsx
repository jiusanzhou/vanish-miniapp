import React from "react"
import { Box, Button, Text, Code, Textarea } from "@chakra-ui/core"

class DebuggerApp extends React.Component {
    constructor() {
        super()
        this.state = {
            res: "",
            input: "",
        }
    }

    componentWillMount() {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/firebug-lite/1.4.0/firebug-lite.js"
        script.async = true
        script.id = "firebug_lite_js"
        document.body.appendChild(script)
    }

    componentWillUnmount() {
        document.getElementById("firebug_lite_js").remove()
    }

    handleInputChange(e) {
        this.setState({input: e.target.value})
    }

    handleRunClick() {
        let res
        try { res = eval(this.state.input) } catch(e) { res = { exception: e } }
        this.setState({res})
    }

    render() {
        return <Box>
            <Text>调试应用</Text>
            <Textarea w="200px" size="sm" value={this.state.input} onChange={this.handleInputChange.bind(this)} />
            <Button mt="8px" onClick={this.handleRunClick.bind(this)}>运行</Button>
            <Text mb="8px">执行结果：</Text>
            <Code w="100%" style={{wordWrap:"break-word"}}>{this.state.res?JSON.stringify(this.state.res):null}</Code>
        </Box>
    }
}

export default DebuggerApp