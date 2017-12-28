import React, { Component } from 'react'
import PropTypes from 'prop-types'
class SystemReport extends Component {
    
    buildList = (title) => {
        let elementList
        if (Array.isArray(this.props.selectedItemList['PluginFlyvemdmAgent.systemReport'][title])) {
            elementList = this.props.selectedItemList['PluginFlyvemdmAgent.systemReport'][title].map((x) => {
                return Object.keys(x).map((element, key2) => {
                    return (
                        <div className="list-content" key={key2}>
                            <div className="list-col">
                                { element }
                            </div>
                            <div className="list-col">
                                {x[element]}
                            </div>
                        </div>
                    )
                })
            })
        } else {
            elementList = Object.keys(this.props.selectedItemList['PluginFlyvemdmAgent.systemReport'][title]).map((element, key2) => {
                return (
                    <div className="list-content" key={key2}>
                        <div className="list-col">
                            { element }
                        </div>
                        <div className="list-col">
                            {this.props.selectedItemList['PluginFlyvemdmAgent.systemReport'][title][element]}
                        </div>
                    </div>
                )
            })
        }

        return elementList
    }
                

    render() {
        return ( 
            <div className="system-report">
                {
                    Object.keys(this.props.selectedItemList['PluginFlyvemdmAgent.systemReport']).map((title, key) => {
                        return (
                            <div key={key}>
                                <div className="title"> { title } </div>
                                {
                                    this.buildList(title) 
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

SystemReport.propTypes = {
    selectedItemList: PropTypes.object.isRequired
}

export default SystemReport