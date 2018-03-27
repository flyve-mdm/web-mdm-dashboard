import React, { Component } from 'react'
import withGLPI from '../../hoc/withGLPI'
import { uiSetNotification } from '../../store/ui/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SearchQueryBuilder from './components/SearchQueryBuilder'
import Panel from './components/Panel'
import ContentPane from '../../components/ContentPane'

import { setFields, getTranslation, normalizeQuery } from './actions'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class SearchEngine extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: null,
            itemType: 'computer',
            itemResults: [],
            fields: [],
            isLoading: true
        }

        this.translations = getTranslation() // Friendly translations of each QueryBuilder input

        this.setFields = () => setFields(this)
        this.normalizeQuery = () => normalizeQuery(this)
    }

    handleChangeItemType = (e) => {
        this.setState({ itemType: e.target.value })
    }

    componentDidMount() {
        this.handleRequestItemType()
    }

    handleRequestItemType = () => {
        /*
        * Fetch search options list of itemType
        */

        this.setState({
            query: null,
            itemResults: [],
            fields: []
        })

        this.props.glpi.listSearchOptions({ itemtype: this.state.itemType }).then(
            value => {
                this.setState({ listSearchOptions: value }, () => {
                    this.setFields()
                })
            })
    }

    handleChangeQuery = (query) => {
        /*
        * Update the query state each time that the QueryBuilde query change 
        */
        this.setState({ query: query })
    }

    handleOnSearch = () => {
        /*
        * Handle click event in the search button
        */

        this.props.glpi.searchItems({ itemtype: this.state.itemType, queryString: this.normalizeQuery() }).then(
            value => {
                this.setState({ itemResults: value.data })
            })

    }

    render() {

        // Create Array of objects with the result of the search
        // Field name instead the field id
        const arrayResultsWithFields = []

        this.state.itemResults && this.state.itemResults.forEach((result, index) => {
            let arrayResult = []
            let arrayOfArraysIdAndData = Object.entries(result)

            arrayOfArraysIdAndData.forEach((field, indexField) => {
                // @field -> [fieldId, fieldValue]
                let objectField = {}

                objectField['fieldName'] = this.state.listSearchOptions[field[0]]['name']
                objectField['fieldValue'] = field[1]
                objectField['fieldId'] = field[0]


                arrayResult.push(objectField)

            })

            arrayResultsWithFields.push(arrayResult)
        })

        return (
            <ContentPane>
                <h1>Search Engine</h1>
                <input 
                type="text"
                style={{marginRight:10}} 
                className="win-textbox" 
                placeholder="Itemtype"
                name="itemTypeName"
                value={this.state.itemType} 
                onChange={this.handleChangeItemType} />
                <button className="btn --secondary" onClick={this.handleRequestItemType}> Change </button>
                {this.state.fields.length > 0 &&
                    <SearchQueryBuilder
                        fields={this.state.fields}
                        handleChangeQuery={this.handleChangeQuery}
                        translations={this.translations} />
                }

                {this.state.query
                    ? this.state.query.rules.length
                        ? <button className="btn --primary" onClick={this.handleOnSearch}> Search </button>
                        : null
                    : <p>Loading  ... </p>}

                <Panel
                    itemType={this.state.itemType}
                    itemResults={arrayResultsWithFields}
                    itemFields={this.state.fields} />
            </ContentPane>
        )
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withGLPI(SearchEngine))