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
      <div className="froms">
        <div className="search-engine__add-buttons">
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
            + Intersection
          </button>
        </div>

        {
          this.state.criteria.length > 0
          && (
            <h3> Rules </h3>
          )
        }

        <div>
          {
            this.state.criteria.map((rule, index) => (
              <Rule
                key={`criteria-${index.toString()}`}
                id={index}
                type="criteria"
                searchtype={rule.searchtype}
                changeRule={this.changeRule}
                fieldList={this.state.fieldList}
                {...rule}
              />
            ))
          }
        </div>

        {
          this.state.metaCriteria.length > 0
          && (
            <h3> Intersection rules </h3>
          )
        }

        <div>
          {
            this.state.metaCriteria.map((rule, index) => (
              <Rule
                key={`metaCriteria-${index.toString()}`}
                id={index}
                type="metaCriteria"
                changeRule={this.changeRule}
                {...rule}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

QueryBuilder.propTypes = {
  changeQuery: PropTypes.func.isRequired,
  itemtype: PropTypes.string.isRequired,
  listSearchOptions: PropTypes.object.isRequired,
}

export default QueryBuilder
