import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Select from './Select'
import DatePicker from './DatePicker'
import TextArea from './TextArea'
import InputEmail from './InputEmail'

class ConstructInputs extends Component {

    createListElement (elements, index) {
        let style = this.props.icon ? { marginLeft: 30, overflow: 'hidden' } : { overflow: 'hidden' }
        return (
            <div className="listElement" style={style} key={index}>
                {
                    elements.map((element, index2) => {
                        let renderElement
                        if (element.type === 'select') {
                            renderElement = (
                                <Select
                                label={element.label}
                                name={element.name}
                                value={element.value}
                                options={element.options}
                                function={element.function}
                                glpi={element.glpi}
                                request={element.request}
                                key={element.name}/>
                            )
                        } else if (element.type === 'date') {
                            renderElement = (
                                <DatePicker
                                label={element.label}
                                name={element.name}
                                value={element.value}
                                function={element.function}
                                key={element.name}/>
                            )
                        } else if (element.type === 'textArea') {
                            renderElement = (
                                <TextArea
                                label={element.label}
                                type={element.type}
                                name={element.name}
                                value={element.value}
                                placeholder={element.placeholder}
                                function={element.function}
                                disabled={element.disabled}
                                style={element.style}
                                delete={element.delete}
                                key={element.name}/>
                            )
                        } else if (element.type === 'email') {
                            renderElement = (
                                <InputEmail
                                index={element.index}
                                label={element.label}
                                email={element.email}
                                function={element.function}
                                disabled={element.disabled}
                                style={element.style}
                                delete={element.delete}                                
                                key={`email${element.index}`}/>
                            )
                        } else {
                            renderElement = (
                                <Input
                                    label={element.label}
                                    type={element.type}
                                    name={element.name}
                                    value={element.value}
                                    placeholder={element.placeholder}
                                    function={element.function}
                                    disabled={element.disabled}
                                    style={element.style}
                                    delete={element.delete}
                                    parametersToEvaluate={element.parametersToEvaluate}
                                    forceValidation={element.forceValidation}
                                    key={element.name} />
                            )
                        }
                        return renderElement
                    })
                }
            </div>            
        )
    }

    render() {
        let icon
        if (this.props.icon) {
            icon = (
                <div className="listElement listElementIcon">
                    <span className={this.props.icon}/>
                    {this.props.title ? <span style={{ marginLeft: '10px' }}>{this.props.title}</span> : null }
                </div>
            )
        }

        return (
            <div>

                { icon }

                {   
                    this.props.data.map((elements, index) => {
                        return this.createListElement(elements, index)
                    })
                }
            </div>
        )
    }
}

ConstructInputs.propTypes = {
    data: PropTypes.array.isRequired, 
    icon: PropTypes.string,
    title: PropTypes.string
}

export default ConstructInputs
    