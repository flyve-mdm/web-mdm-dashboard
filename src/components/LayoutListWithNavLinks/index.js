import React, { Component } from "react"
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import getMode from '../../shared/getMode'

class ListWithNavLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: getMode()
        }
    }

    handleResize = () => {
        let nextMode = getMode()

        if (nextMode === 'small') {
            this.setState({
                itemListPaneWidth: '100%'
            })
        } else {
            this.setState({
                itemListPaneWidth: 320
            })
        }

        if (this.state.mode !== nextMode) {
            this.setState({
                mode: nextMode 
            })
        }
    }

    componentWillMount () {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize)
    }

    render () {
        return (
            <div className="layout_list_with_navlinks-block">
                <nav style={this.state.mode === "small" ? {display: 'none'} : {}}>
                    <ul>
                        {this.props.routes.map((route, i) => {
                            if (route.path !== "/") {
                                return (
                                    <li key={i}>
                                        <NavLink 
                                            exact
                                            to={`${this.props.rootPath}${route.path !== "/" ? route.path : ""}`}
                                            activeClassName='--active'>
                                            {route.name}
                                        </NavLink>
                                    </li>
                                )
                            } else {
                                return ""
                            }
                        })}
                    </ul>
                </nav>
                <article>
                    {this.props.children}
                </article>
            </div>
        )
    }
}

ListWithNavLinks.propTypes = {
    routes: PropTypes.array.isRequired,
    rootPath: PropTypes.string.isRequired,
    children: PropTypes.element
}

export default ListWithNavLinks