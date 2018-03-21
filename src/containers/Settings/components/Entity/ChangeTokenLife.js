import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { uiSetNotification } from '../../../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class ChangeTokenLife extends Component {

    constructor (props) {
        super (props)
        this.state = {
            tokenLife: this.props.tokenLife
        }
    }

    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveTokenLife = () => {
        this.props.saveValues('tokenLife', this.state.tokenLife)
        this.props.changeMode('')
        this.props.actions.setNotification({
            title: 'Successfully',
            body: 'The Token Life changed',
            type: 'info'
        })
    }

    render () {
        return (    
            <div>
                <div className="listElement">
                    Date Period
                    <div className="detail">In number of days</div>
                </div>
                <div className="listElement">
                    <input 
                        type="number" 
                        className="win-textbox" 
                        name="tokenLife"
                        value={this.state.tokenLife}
                        onChange={this.changeState}
                    />
                </div>
                <button className="win-button" style={{marginRight: 10}} onClick={() => this.props.changeMode("")}>
                    Cancel
                </button>
                <button className="win-button" onClick={this.saveTokenLife}>
                    Save
                </button>
            </div>
        )
    }
}

ChangeTokenLife.propTypes = {
    changeMode: PropTypes.func.isRequired,
    tokenLife: PropTypes.string.isRequired,
    saveValues: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(ChangeTokenLife)
