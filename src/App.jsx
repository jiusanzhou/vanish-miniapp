import React from "react"
import { Switch, Route, BrowserRouter, withRouter } from "react-router-dom"
import { inject, observer } from "mobx-react"

import HomePage from "./pages/home"
import AppPage from "./pages/app"
import NotFoundPage from "./pages/404"
import { withGlobal } from "./utils/global"

@withRouter
@withGlobal
@inject("appStore")
@observer
export default class App extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {
        // load apps
        this.props.appStore.loadApps()
    }

    render() {
        let basePath = this.props.globalData.basePath
        return <Switch>
            <Route exact path={basePath||'/'} children={<HomePage />} />
            {this.props.appStore.apps.map((app, idx) => <Route key={idx} path={`${basePath||''}/${app.name}`} children={<AppPage basePath={basePath} {...app} />} />)}
            <Route component={NotFoundPage} />
        </Switch>
    }
}