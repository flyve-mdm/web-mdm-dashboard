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
import getMode from '../../shared/getMode'
import calc100PercentMinus from '../../shared/calc100PercentMinus'

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
            mode: getMode(),
            itemListPaneWidth: getMode() === 'small' ? '100%' : 320,
            selectionMode: false,
            action: null,
            selectedItems: []
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

    propsData = () => {
        return {
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

    changeSelectedItems = selectedItems => this.setState({ selectedItems })
    changeAction = action => this.setState({ action })
    changeSelectionMode = selectionMode => this.setState({ selectionMode })

    stylesList = () => {

        let styles = {
            width: this.state.itemListPaneWidth   
        }

        if (this.state.mode === 'small') {
            if (this.state.selectedItems.length === 0  || this.props.history.location.pathname === '/app/devices') {
                styles.display = 'inline-block'
            } else {
                styles.display = 'none'
            }

        } else {
            styles.display = 'inline-block'
        } 

        return styles
    }

    stylesContent = () => {

        const validWidth = this.state.itemListPaneWidth === '100%' ? 0 : this.state.itemListPaneWidth
        let styles = {
            width: calc100PercentMinus(validWidth)
        }

        if (this.state.mode === 'small') {
            if (this.state.selectedItems.length === 0  || this.props.history.location.pathname === '/app/devices') {
                styles.display = 'none'
            } else {
                styles.display = 'inline-block'
            }

        } else {
            styles.display = 'inline-block'
        } 

        return styles
    }

    render() {

        let renderComponents = (

            <React.Fragment>
                <div className="listPane flex-block-list" style={{...this.stylesList()}}>
                <DevicesList
                    key="list"
                    {...this.propsData()}
                />
                </div>
                <div className="flex-block-content" style={{...this.stylesContent()}}>
                <GenerateRoutes 
                    key="content" 
                    routes={routes} 
                    rootPath={this.props.match.url} 
                    data={{...this.propsData()}} 
                />
                </div>
            </React.Fragment>

        )

        return (
            <div className="flex-block --with-scroll --with-content-pane">
                {renderComponents}
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withGLPI(Devices))