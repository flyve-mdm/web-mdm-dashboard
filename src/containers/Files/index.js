import React, { Component } from 'react'
import FilesList from './components/FilesList'
import { uiSetNotification } from '../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withGLPI from '../../hoc/withGLPI'
import GenerateRoutes from '../../components/GenerateRoutes'
import routes from './routes'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class Files extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectionMode: false,
            action: null,
            selectedItems: []
        }
    }

    changeSelectedItems = selectedItems => this.setState({ selectedItems })
    changeAction = action => this.setState({ action })
    changeSelectionMode = selectionMode => this.setState({ selectionMode })

    propsData = () => {
        return {
            itemListPaneWidth: 320,
            selectedItems: this.state.selectedItems,
            changeSelectedItems: this.changeSelectedItems,
            changeSelectionMode: this.changeSelectionMode,
            changeAction: this.changeAction,
            setNotification: this.props.actions.setNotification,
            selectionMode: this.state.selectionMode,
            action: this.state.action,
            history: this.props.history,
            glpi: this.props.glpi
        }
    }

    render() {
        return (
            <div className="flex-block --with-scroll --with-content-pane">
                <FilesList
                    {...this.propsData()}
                />
                <GenerateRoutes routes={routes} rootPath={this.props.match.url} data={{ ...this.propsData() }} />
            </div>
        )
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withGLPI(Files))