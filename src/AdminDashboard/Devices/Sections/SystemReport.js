import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SystemReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            agent: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = async () => {

        try {
            this.setState({
                isLoading: true
            })
            const agent = await this.props.glpi.getAnItem('PluginFlyvemdmAgent', this.props.selectedItemList[0]['PluginFlyvemdmAgent.id'], null)
            this.setState({
                isLoading: false,
                agent
            })
            console.log(agent)
        } catch (error) {
            console.log(error)
        }
    }            

    render() {
        if (this.state.isLoading && !this.state.agent) {
            return (
                <div className="system-report">
                </div>
            )
        } else if (!this.state.isLoading && this.state.agent){
            return (
                <div className="system-report">
                    <div className="title">Agent</div>
                    <div className="list-content">
                        <div className="list-col">ID</div>
                        <div className="list-col">{this.state.agent['id']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Name</div>
                        <div className="list-col">{this.state.agent['name']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Version</div>
                        <div className="list-col">{this.state.agent['version']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Last contact</div>
                        <div className="list-col">{this.state.agent['last_contact']}</div>
                    </div>
                    <div className="list-content">
                        <div className="list-col">Last report</div>
                        <div className="list-col">{this.state.agent['last_report'] ? this.state.agent['last_report'] : 'N/A'}</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="system-report">
                </div>
            )
        }
    }
}

SystemReport.propTypes = {
    selectedItemList: PropTypes.array.isRequired
}

export default SystemReport