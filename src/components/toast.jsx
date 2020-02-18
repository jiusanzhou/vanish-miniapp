import React from "react"
import PropTypes from 'prop-types'

import { Toaster, Position } from "@blueprintjs/core"

const EventBusContext = React.createContext({})
const Provider = EventBusContext.Provider
const Consumer = EventBusContext.Consumer

export { Provider }
export { Consumer }

// TODO: multi toasts

export const withToaster = (WrappedComponent) => {
    class WithToaster extends React.Component {
        render() {
            return (
                <Consumer>
                    {ToasterBus => <WrappedComponent toaster={ToasterBus} {...this.props} />}
                </Consumer>
            )
        }
    }

    return WithToaster
}

export class ToasterConsumer extends React.Component {
    return() {
        return <Consumer>{ToasterBus => children(ToasterBus)}</Consumer>
    }
}

ToasterConsumer.propTypes = {
    children: PropTypes.func.isRequired
}

const toaster = new Toaster.create({
    className: "recipe-toaster",
    position: Position.BOTTOM,
    maxToasts: 1,
})

export class ToasterProvider extends React.Component {
    constructor() {
        super()
        this.toaster = toaster
    }
    render() {
        const { children } = this.props
        return <Provider value={this.toaster}>{children}</Provider>
    }
}

ToasterProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}