import React, { Component } from 'react'
import UsersList from './components/UsersList'
import {
    uiTransactionStart,
    uiTransactionFinish,
    uiSetNotification
} from '../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GenerateRoutes from '../../components/GenerateRoutes'
import withGLPI from '../../hoc/withGLPI'
import routes from './routes'

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading
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

class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectionMode: false,
            action: null,
            selectedItems: []            
        }
    }

    changeAction = action => this.setState({action})
    changeSelectionMode = selectionMode => this.setState({selectionMode})
    changeSelectedItems = selectedItems => this.setState({ selectedItems })

    propsData = () => {
        return {
            itemListPaneWidth: 320,
            changeSelectionMode: this.changeSelectionMode,
            selectionMode: this.state.selectionMode,
            selectedItems: this.state.selectedItems,
            changeSelectedItems: this.changeSelectedItems,
            action: this.state.action,
            changeAction: this.changeAction,
            setNotification: this.props.actions.setNotification,
            history: this.props.history,
            glpi: this.props.glpi
        }
    }

    render() {
        return (
            <div className="flex-block --with-scroll --with-content-pane">
                <UsersList 
                    {...this.propsData()}
                />
                <GenerateRoutes routes={routes} rootPath={this.props.match.url} data={{...this.propsData()}} />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withGLPI(Users))