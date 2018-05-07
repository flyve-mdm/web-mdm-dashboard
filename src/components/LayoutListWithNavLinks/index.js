import React, { PureComponent } from "react"
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import getMode from '../../shared/getMode'
import calc100PercentMinus from '../../shared/calc100PercentMinus'
import { slideTop } from '../../shared/animations'

class ListWithNavLinks extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            mode: getMode(),
            itemListPaneWidth: getMode() === 'small' ? '100%' : 320,
            styleNav: this.styleNav(getMode(), this.props.history)
        }
    }

    handleResize = () => {
        const nextMode = getMode()
        if (this.state.mode !== nextMode) {
            this.setState({
                mode: nextMode,
                itemListPaneWidth: nextMode === "small" ? "100%" : 320,
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

    stylesArticle () {
        const validWidth = this.state.itemListPaneWidth === '100%' ? 0 : this.state.itemListPaneWidth
        return ({
            width: calc100PercentMinus(validWidth)
        })
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

    componentDidMount () {
        slideTop(this.nav).play()
    }

    render () {
        return (
            <div className="flex-block --with-scroll --with-content-pane">
                <nav 
                    style={this.state.styleNav} 
                    className="flex-block-list navlinks" 
                    ref={nav => this.nav = nav}
                >
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
                            <div className="content-pane-block" style={this.stylesArticle()}>
                                {this.props.children}
                            </div>
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