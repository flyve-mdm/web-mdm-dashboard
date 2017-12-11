import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../../../Utils/Confirmation'

class Input extends Component {
    render() {
        let clearIcon 
        const deleteEmail = async () => {
            const isOK = await Confirmation.isOK()
            if(isOK) this.props.delete(this.props.name)
        }
        if (this.props.delete) clearIcon = <span className="clearIcon" style={{ margin: 10 }} onClick={deleteEmail}/>
        return (
            <div className="list-col">
                <p>{this.props.label}</p>
                { clearIcon }
                <input 
                    type={this.props.type} 
                    className="win-textbox" 
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.function}
                    disabled={this.props.disabled}
                    style={this.props.style}
                />
                {this.props.delete ? <Confirmation title={this.props.label} message={this.props.value} reference={this.props.name}/> : <span/>}
            </div>            
        )
    }
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    function: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    delete: PropTypes.func
}

export default Input
    