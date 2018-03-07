import React, { Component } from 'react'
import routes from './routes'
import withGLPI from '../../hoc/withGLPI'
import GenerateRoutes from '../../components/GenerateRoutes'
import DevicesList from './components/DevicesList'
import {
    uiTransactionStart,
    uiTransactionFinish,
    uiSetNotification
} from '../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading,
        currentUser: state.auth.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        uiTransactionStart: bindActionCreators(uiTransactionStart, dispatch),
        uiTransactionFinish: bindActionCreators(uiTransactionFinish, dispatch),
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class Devices extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: ['Files'],
            selectionMode: false,
            action: null,
            animation: false,
            selectedItems: []
        }
    }

    propsData = () => {
        return {
            itemListPaneWidth: 320,
            animation: this.state.animation,
            location:this.state.location,
            onNavigate: this.onNavigate,
            changeSelectionMode: this.changeSelectionMode,
            selectionMode: this.state.selectionMode,
            selectedItems: this.selectedItems,
            changeSelectedItems: this.changeSelectedItems,
            action: this.state.action,
            changeAction: this.changeAction,
            setNotification: this.props.actions.setNotification,
            history: this.props.history,
            glpi: this.props.glpi
        }
    }

    changeSelectedItems = selectedItems => this.setState({ selectedItems })
    onNavigate = location => this.setState({ location })
    changeAction = action => this.setState({ action })
    changeSelectionMode = selectionMode => this.setState({ selectionMode })

    render() {
        return (
            <div className="flex-block --with-scroll --with-content-pane">
                <DevicesList 
                    {...this.propsData()}
                />
                <GenerateRoutes routes={routes} rootPath={this.props.match.url} data={this.propsData()} />
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withGLPI(Devices))