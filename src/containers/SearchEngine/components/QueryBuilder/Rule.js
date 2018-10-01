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
    console.log(this.props.field)
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

        {
          this.props.field
          && (
            <React.Fragment>
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
                name="value"
                type="text"
                className="win-textbox"
                value={this.props.value}
                onChange={e => this.handleChangeRule(e.target.name, e.target.value)}
              />
            </React.Fragment>
          )
        }

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
  fieldList: null,
  field: null,
}

Rule.propTypes = {
  id: PropTypes.number.isRequired,
  itemtype: PropTypes.string,
  field: PropTypes.string,
  fieldList: PropTypes.array,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  searchtype: PropTypes.string.isRequired,
  changeRule: PropTypes.func.isRequired,
}

export default Rule
