import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../../Utils/Loader'

export default class Inventory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            isLoading: false
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({
                data: undefined,
                isLoading: false
            })
            this.handleRefresh()
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
            const data = await this.props.glpi.getAnItem({ itemtype: this.props.itemType, id: this.props.itemID, queryString: this.props.parameters })
            let object = Object.keys(this.props.fields).map((key, index) => {
                return { [this.props.fields[key]]: data[key] }
            })
            this.setState({
                isLoading: false,
                data: object
            })
        } catch (error) {
            console.log(error)
            this.setState({
                isLoading: false,
                data: undefined
            })
        }
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
            return (<Loader type="content" />)
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
Inventory.propTypes = {
    selectedItemList: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    parameters: PropTypes.object,
    glpi: PropTypes.object.isRequired
}
Inventory.defaultProps = {
    parameters: {}
}