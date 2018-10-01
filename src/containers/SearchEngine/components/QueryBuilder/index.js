import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import itemtype from 'shared/itemtype'
import Rule from './Rule'
import createFieldList from '../../actions/createFieldList'

/**
 * Component to select a item type
 * @class SearchEngine
 * @extends PureComponent
 */
class QueryBuilder extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      criteria: [],
      metaCriteria: [],
      fieldList: createFieldList(props.listSearchOptions),
    }
  }

  componentDidMount() {
    this.addCriteria()
  }

  componentDidUpdate() {
    this.props.changeQuery({
      itemtype: this.props.itemtype,
      criteria: this.state.criteria,
      metacriteria: this.state.metaCriteria,
    })
  }

  addCriteria = () => {
    const { criteria: currentCriteria, fieldList } = this.state

    this.setState({
      criteria: [
        ...currentCriteria,
        {
          link: 'AND',
          field: fieldList[0].value,
          searchtype: 'contains',
          value: '',
        },
      ],
    })
  }

  addMetaCriteria = () => {
    const { metaCriteria: currentCriteria } = this.state

    this.setState({
      metaCriteria: [
        ...currentCriteria,
        {
          link: 'AND',
          itemtype: Object.keys(itemtype)[0],
          field: null,
          searchtype: 'contains',
          value: '',
        },
      ],
    })
  }

  changeRule = (type, id, newValue) => {
    const CurrentRules = this.state[type]
    const newRules = [...CurrentRules]

    if (newValue) {
      newRules[id] = { ...newRules[id], ...newValue }

      this.setState({
        [type]: newRules,
      })
    } else {
      this.setState({
        [type]: newRules.slice(0, id).concat(newRules.slice(id + 1)),
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn--primary"
          type="button"
          onClick={this.addCriteria}
        >
          + Rule
        </button>
        <button
          className="btn btn--secondary"
          type="button"
          onClick={this.addMetaCriteria}
        >
          +
        </button>
        {
          this.state.criteria.map((rule, index) => {
            return (
              <Rule
                key={`criteria-${index}`}
                id={index}
                type="criteria"
                searchtype={rule.searchtype}
                changeRule={this.changeRule}
                fieldList={this.state.fieldList}
                {...rule}
              />
            )
          })
        }
        {
          this.state.metaCriteria.map((rule, index) => {
            return (
              <Rule
                key={`metaCriteria-${index}`}
                id={index}
                type="metaCriteria"
                value={rule.value}
                changeRule={this.changeRule}
                {...rule}
              />
            )
          })
        }
      </React.Fragment>
    )
  }
}

QueryBuilder.propTypes = {
  changeQuery: PropTypes.func.isRequired,
  itemtype: PropTypes.string.isRequired,
  listSearchOptions: PropTypes.object.isRequired,
}

export default QueryBuilder
