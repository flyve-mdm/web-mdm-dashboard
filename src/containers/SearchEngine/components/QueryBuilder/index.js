import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
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
    const { metaCriteria: currentMetaCriteria } = this.state

    this.setState({
      metaCriteria: [...currentMetaCriteria, {}],
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
        {
          this.state.criteria.map((rule, index) => {
            return (
              <Rule
                id={index}
                type="criteria"
                link={rule.link}
                field={rule.field}
                searchtype={rule.searchtype}
                value={rule.value}
                changeRule={this.changeRule}
                fieldList={this.state.fieldList}
                key={`criteria-${index}`}
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
