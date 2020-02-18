import React from "react"
import PropTypes from 'prop-types'

const EventBusContext = React.createContext({})
const Provider = EventBusContext.Provider
const Consumer = EventBusContext.Consumer

export { Provider }
export { Consumer }

// TODO: multi toasts

export const withGlobal = (WrappedComponent) => {
    class WithGlobal extends React.Component {
        render() {
            return (
                <Consumer>
                    {GlobalBus => <WrappedComponent globalData={GlobalBus} {...this.props} />}
                </Consumer>
            )
        }
    }

    return WithGlobal
}

export class GlobalConsumer extends React.Component {
    return() {
        return <Consumer>{GlobalBus => children(GlobalBus)}</Consumer>
    }
}

GlobalConsumer.propTypes = {
    children: PropTypes.func.isRequired
}

export class GlobalProvider extends React.Component {
    constructor() {
        super()
        
        let homepage = require("../../package.json").homepage

        this.data = {
            basePath: homepage?(new URL(homepage)).pathname:"",
        }
    }

    render() {
        const { children } = this.props
        return <Provider value={this.data}>{children}</Provider>
    }
}

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}