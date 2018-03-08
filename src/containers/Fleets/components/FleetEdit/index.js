import React, { Component } from 'react'
import Input from '../../../../components/Forms/Input'
import { I18n } from 'react-i18nify'

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
  }

  render() { 
    return (
      <div>
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
      </div>
    )
  }
}
 
export default FleetEdit;