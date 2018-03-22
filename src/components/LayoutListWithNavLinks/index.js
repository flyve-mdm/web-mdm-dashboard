import React, { Component } from "react"
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import getMode from '../../shared/getMode'

class ListWithNavLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: getMode(),
            styleNav: this.styleNav(getMode(), this.props.history)
        }
    }

    handleResize = () => {
        const nextMode = getMode()
        if (this.state.mode !== nextMode) {
            this.setState({
                mode: nextMode,
                styleNav: this.styleNav(nextMode, this.props.history)
            })
        }
    }

    styleNav (mode, history) {
        return (
            mode === "small" ? 
                history.location.pathname.split("/").length > 3 ?
                    {display: 'none'} : {width: '100%'} : {}
        )
    }

    componentWillMount () {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            styleNav: this.styleNav(this.state.mode, nextProps.history)
        })
    }

    render () {
        return (
            <div className="layout_list_with_navlinks-block">
                <nav style={this.state.styleNav}>
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
                {
                    (this.state.mode === "small" && !this.state.styleNav.display) ? 
                        "" : (
                            <article>
                                {this.props.children}
                            </article>
                        )
                }
            </div>
        )
    }
}

ListWithNavLinks.propTypes = {
    routes: PropTypes.array.isRequired,
    rootPath: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    history: PropTypes.object.isRequired
}

export default ListWithNavLinks