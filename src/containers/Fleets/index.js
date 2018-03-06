import React, { Component } from 'react'
import withGLPI from '../../hoc/withGLPI'
import GenerateRoutes from '../../components/GenerateRoutes'
import FleetsList from './components/FleetsList'
import routes from './routes'

class Fleets extends Component {
  constructor(props) {
    super(props)
    this.state = {
        policiesData: null,
        tasksData: null,        
        fleetSelected: null
    }
  }

  fecthPolicies = async () => {  
    const response = await this.props.glpi.searchItems({
        itemtype: 'PluginFlyvemdmPolicy', 
        options: { 
            uid_cols: true, 
            forcedisplay: [1, 2, 3, 4, 6],
            range: '0-50' // Can more than 50 items
        }
    })

    this.setState({ policiesData:  response.data });
  }

  fetchTasks = async () => {
    const response = await this.props.glpi.getSubItems({
        itemtype: 'PluginFlyvemdmFleet',
        id: this.state.fleetSelected['PluginFlyvemdmFleet.id'],
        subItemtype: 'PluginFlyvemdmTask',
        options: { 
            uid_cols: true, 
            forcedisplay: [1, 2, 3, 4, 6]
        }
    })

    this.setState({ tasksData: response });
  }

  componentDidMount = () => {
    this.fecthPolicies()
  }

  handleClickFleet = (fleetData) => {
    this.setState({ fleetSelected: {...fleetData} },
      () => {
        this.props.history.push(`/app/fleets/${fleetData["PluginFlyvemdmFleet.id"]}`)
      }
    );
  }

  render() { 
    return ( 
      <FleetsList 
        glpi={this.props.glpi}
        fleetSelected={this.state.fleetSelected}
        handleClickFleet={this.handleClickFleet}
      >
        <GenerateRoutes routes={routes} rootPath={this.props.match.url} data={{
          policiesData: this.state.policiesData,
          fleetSelected: this.state.fleetSelected,
          tasksData: this.state.tasksData,
          fetchTasks: this.fetchTasks
        }}/>
      </FleetsList>
    )
  }
}

export default withGLPI(Fleets);