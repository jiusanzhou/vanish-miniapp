import React from "react"
import { Flex, Icon, Text } from "@chakra-ui/core"
import { withRouter } from "react-router-dom"
import { withGlobal } from "../utils/global"

// import CheckinApp from "../apps/checkin"
// import Debugger from "../apps/Debugger"

@withRouter
class AppPage extends React.Component {

    constructor() {
        super()
    }

    appCaches = {}

    componentWillMount() {
        let app
        try { app = require(`../apps/${this.props.name}`).default } catch(e) {}
        if (app) this.appCaches[this.props.name] = app

        // 更新title等
        window.document.title = this.props.title
    }

    render() {
        let app = this.appCaches[this.props.name]
        if (app) return React.createElement(app)
        return <Text>应用错误: {this.props.name}</Text>
    }
}

@withRouter
@withGlobal
class AppPreview extends React.Component {

    _onClick() {
        this.props.history.push(`${this.props.globalData.basePath}/${this.props.name}`)
    }

    render() {
        let { title, name, icon = "time" } = this.props
        return <Flex
        onClick={this._onClick.bind(this)}
        cursor="pointer"
        border="1px" borderRadius="md" borderColor="gray.300"
        w="100%" h="20"
        align="center" justify="center" direction="column">
            <Icon name={icon} />
            <Text my={1}>{title}</Text>
        </Flex>
    }
}

export { AppPreview }

export default AppPage