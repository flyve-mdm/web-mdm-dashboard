import React, { Component } from 'react'

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
            const data = await this.props.glpi.getAnItem(this.props.itemType, this.props.itemID, null)
            let object = Object.keys(this.props.fields).map((key, index) => {
                return { [this.props.fields[key]]: data[key] }
            })
            this.setState({
                isLoading: false,
                data: object
            })
        } catch (error) {
            console.log(error)
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
            return (
                <div>
                </div>
            )
        } else if (!this.state.isLoading && this.state.data) {

            
            return (
                <div>
                    <div className="title">{this.props.title}</div>
                    {
                        this.state.data.map((value, index) => {
                            return (
                                <div key={index}>
                                {this.buildList(value)}
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }
}
