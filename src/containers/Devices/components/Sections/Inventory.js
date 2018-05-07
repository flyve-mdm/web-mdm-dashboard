import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../../../components/Loader'

export default class Inventory extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh = () => {
        this.setState({
            isLoading: true
        }, async () => {
            try {
            const data = await this.props.glpi.getAnItem({ itemtype: this.props.itemType, id: this.props.itemID, queryString: this.props.parameters })
                let object = Object.keys(this.props.fields).map((key, index) => {
                    return { [this.props.fields[key]]: data[key] }
                })
                this.setState({
                    isLoading: false,
                    data: object
                })
            } catch (error) {
                this.setState({
                    isLoading: false,
                    data: undefined
                })
            }
        })
    }

    buildList = (value) => {
        return Object.keys(value).map((element, index) => {
            return (
                <div key={index} className="list-content">
                    <div className="list-col">{element}</div>
                    <div className="list-col">{value[element]}</div>
                </div>
            )
        })
    }

    render() {
        if (this.state.isLoading && !this.state.data) {
            return (<div style={{padding:'20px'}}><Loader type="content"/></div>)
        } else if (!this.state.isLoading && this.state.data) {
            return (
                <div>
                    <div className="title">{this.props.title}</div>
                    {
                        this.state.data.map((value, index) => {
                            return (this.buildList(value))
                        })
                    }
                </div>
            )
        } else {
            return (null)
        }
    }
}

Inventory.defaultProps = {
    parameters: {}
}

Inventory.propTypes = {
    title: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    itemID: PropTypes.number.isRequired,
    fields: PropTypes.object.isRequired,
    parameters: PropTypes.object,
    glpi: PropTypes.object.isRequired
}
