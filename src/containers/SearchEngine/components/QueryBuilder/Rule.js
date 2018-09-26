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
    const newValue = {
      link: this.props.link,
      field: this.props.field,
      searchtype: this.props.searchtype,
      value: this.props.value,
    }

    newValue[name] = value

    this.props.changeRule(this.props.type, this.props.id, newValue)
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
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  itemtype: PropTypes.string,
  field: PropTypes.string.isRequired,
  searchtype: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeRule: PropTypes.func.isRequired,
}

export default Rule
