import React from "react"
import { inject } from "mobx-react"

import { Grid, Box } from "@chakra-ui/core"

import { AppPreview } from "./app"

@inject("appStore")
class HomePage extends React.Component {

    componentWillMount() {
        window.document.title = "Vanish 小程序"
    }

    // 显示app列表
    render() {
        return <Box p={2}>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {this.props.appStore.apps.map((app, idx) => <AppPreview key={idx} {...app} />)}
            </Grid>
        </Box>
    }
}

export default HomePage