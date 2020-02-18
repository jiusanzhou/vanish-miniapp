import React from "react"
import { inject } from "mobx-react"

import { Flex, Button } from "@chakra-ui/core"

class NotFoundPage extends React.Component {

    constructor() {
        super()
    }

    _onClick() {
        this.props.appStore.addCount()
    }

    render() {
        return <Flex>
            Chakra UI! 404
        </Flex>
    }
}

export default NotFoundPage