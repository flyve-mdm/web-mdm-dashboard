import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import validateData from '../../Utils/validateData'
import SettingsEntity from '../data/SettingsEntity.json'

class Entity extends Component {

    render () {

                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                    <h2 className="win-h2"> Entity </h2>

                    <div className="title"> Agent </div>

                    <div className="listElement">
                        <div className="message">
                            Token life
                        </div>
                        <div className="controller">
                            <a>10</a>
                        </div>
                    </div>

                    <div className="listElement">
                        <div className="message">
                            Download URL
                            <div className="detail10div>
                        </div>

                        <div className="controller">
                            <button className="win-button" onClick={() => this.changeMode("change download URL")}>
                                Change
                            </button>
                        </div>
                    </div>

                    <div className="title"> Configuration </div>

                    <div className="listElement">
                        <div className="message">
                            Entity ID
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>

                    <div className="listElement">
                        <div className="message">
                            Maximum managed devices
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>

                    <div className="title"> General information </div>

                    <div className="listElement">
                        <div className="message">
                            Devices currently managed
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>

                    <div className="listElement">
                        <div className="message">
                            Fleets currently managed
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Files uploaded
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Applications uploaded
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Number of users
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Invitations sent
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Types of policies
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>
        
                    <div className="listElement">
                        <div className="message">
                            Number of categories for policies
                        </div>
                        <div className="controller">
                            10
                        </div>
                    </div>
                        
                </div>
                )
            }
        }

Entity.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Entity