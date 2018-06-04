/*
*   Copyright © 2018 Teclib. All rights reserved.
*
*   This file is part of web-mdm-dashboard
*
* web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
* device management software.
*
* Flyve MDM is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 3
* of the License, or (at your option) any later version.
*
* Flyve MDM is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* ------------------------------------------------------------------------------
* @author     Gianfranco Manganiello (gmanganiello@teclib.com)
* @author     Hector Rondon (hrondon@teclib.com)
* @copyright  Copyright © 2018 Teclib. All rights reserved.
* @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
* @link       https://github.com/flyve-mdm/web-mdm-dashboard
* @link       http://flyve.org/web-mdm-dashboard
* @link       https://flyve-mdm.com
* ------------------------------------------------------------------------------
*/

import { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class ScrollSyncPane extends PureComponent {

    static propTypes = {
        children: PropTypes.node.isRequired,
        attachTo: PropTypes.object,
        group: PropTypes.string
    }

    static defaultProps = {
        group: 'default'
    }

    static contextTypes = {
        registerPane: PropTypes.func.isRequired,
        unregisterPane: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.node = this.props.attachTo || ReactDOM.findDOMNode(this)
        this.context.registerPane(this.node, this.props.group)
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.group !== prevProps.group) {
            this.context.unregisterPane(this.node, prevProps.group)
            this.context.registerPane(this.node, this.props.group)
        }
    }

    componentWillUnmount() {
        this.context.unregisterPane(this.node, this.props.group)
    }

    render() {
        return this.props.children
    }
}

export default ScrollSyncPane