import React, { Component } from 'react'
import Input from '../../../../components/Forms/Input'
import { I18n } from 'react-i18nify'
import Loading from '../../../../components/Loading'
import { connect } from 'react-redux'
import {
    uiSetNotification,
    uiTransactionFinish,
    uiTransactionStart
} from '../../../../store/ui/actions'
import { bindActionCreators } from 'redux'

function mapStateToProps(state, props) {
  return {
      isLoading: state.ui.loading,        
      currentUser: state.auth.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
      setNotification: bindActionCreators(uiSetNotification, dispatch),
      uiTransactionFinish: bindActionCreators(uiTransactionFinish, dispatch),
      uiTransactionStart: bindActionCreators(uiTransactionStart, dispatch),
  }
  return { actions }
}

class FleetEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    if(!this.props.data.fleetSelected) {
      this.props.history.push('/app/fleets')
    } else {
      this.setState({name: this.props.data.fleetSelected["PluginFlyvemdmFleet.name"]})
      this.textInput.focus();
    }
  }

  handleSubmitForm = (event) => {
    event.preventDefault()
    
    this.props.actions.uiTransactionStart()

    const headers = {
      'Content-Type': 'application/json',
      'Session-Token': localStorage.sessionToken
    }

    const stateName = {...this.state}

    const body = JSON.stringify({
      'input' : {
        'name': stateName.name
      }
    })

    const fleetId = this.props.data.fleetSelected['PluginFlyvemdmFleet.id']

    fetch(`https://dev.flyve.org/glpi/apirest.php/PluginFlyvemdmFleet/${fleetId}`, {
      method: 'PUT',
      headers: headers,
      body: body
    })
    .then( response => response.json())
    .then( response => {
      let newFleetData = {}
      newFleetData['PluginFlyvemdmFleet.name'] = stateName.name
      this.props.data.updateFleetSelect(newFleetData)
      this.props.actions.uiTransactionFinish()
      this.props.actions.setNotification({
        title: 'Success!',
        body: 'The fleet has been updated',
        type: 'success'
      })
    })
    .catch( error => {
      this.props.actions.uiTransactionFinish()
      this.props.actions.setNotification({
        title: 'Ups!',
        body: 'An error has occurred',
        type: 'alert'
      })
    })
  }

  render() { 
    return (
      <div>
        {this.props.isLoading
          ? (
            <Loading message='Changing Fleet Data...'/>
          )
          : (
          <form onSubmit={this.handleSubmitForm}>
              <fieldset>
                <legend>Edit Fleet Name</legend>
                <div>
                    <Input
                        label="Fleet Name" 
                        type="text" 
                        name="text" 
                        value={this.state.name} 
                        placeholder="Write a new name" 
                        required
                        function={(name, value) => {this.setState({name: value})}}
                        inputRef={(input) => { this.textInput = input }}
                    />
                    <button type="submit" className="btn --primary">
                      { I18n.t('commons.save') }
                    </button>
                </div>
              </fieldset>
            </form>
          )
        }
      </div>
    )
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FleetEdit)