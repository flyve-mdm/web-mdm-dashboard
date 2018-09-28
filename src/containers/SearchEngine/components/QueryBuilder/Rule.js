import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import { Select } from 'components/Forms'

/**
 * Component with the parameters of one query rule
 * @class SearchEngine
 * @extends PureComponent
 */
class Rule extends PureComponent {
  handleChangeRule = (name, value) => {
    this.props.changeRule(this.props.type, this.props.id, { [name]: value })
  }

  deleteRule = () => {
    this.props.changeRule(this.props.type, this.props.id, null)
  }

  render() {
    return (
      <div className="search-engine__rule">
        <Select
          name="link"
          value={this.props.link}
          options={[
            { name: 'AND', value: 'AND' },
            { name: 'OR', value: 'OR' },
          ]}
          function={this.handleChangeRule}
          noEmpty
        />

        <Select
          name="field"
          value={this.props.field}
          options={this.props.fieldList}
          function={this.handleChangeRule}
          noEmpty
        />

        <Select
          name="searchtype"
          value={this.props.searchtype}
          options={[
            { name: 'contains', value: 'contains' },
            { name: 'equals', value: 'equals' },
            { name: 'notequals', value: 'notequals' },
            { name: 'lessthan', value: 'lessthan' },
            { name: 'morethan', value: 'morethan' },
            { name: 'under', value: 'under' },
            { name: 'notunder', value: 'notunder' },
          ]}
          function={this.handleChangeRule}
          noEmpty
        />

        <input
          type="text"
          className="win-textbox"
          name="value"
          value={this.props.value}
          onChange={e => this.handleChangeRule(e.target.name, e.target.value)}
        />

        <button
          className="btn"
          type="button"
          onClick={this.deleteRule}
        >
         -
        </button>
      </div>
    )
  }
}

Rule.defaultProps = {
  itemtype: null,
}

Rule.propTypes = {
  id: PropTypes.number.isRequired,
  itemtype: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  fieldList: PropTypes.array.isRequired,
  searchtype: PropTypes.string.isRequired,
  changeRule: PropTypes.func.isRequired,
}

export default Rule
