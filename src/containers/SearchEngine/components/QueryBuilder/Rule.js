import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import { Select, Input } from 'components/Forms'
import itemtype from 'shared/itemtype'
import withGLPI from 'hoc/withGLPI'
import createFieldList from '../../actions/createFieldList'

/**
 * Component with the parameters of one query rule
 * @class SearchEngine
 * @extends PureComponent
 */
class Rule extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      fieldList: props.fieldList,
    }
  }

  componentDidMount() {
    if (!this.props.field) {
      this.handleChangeRule('itemtype', this.props.itemtype)
    }
  }

  handleChangeRule = async (name, value) => {
    if (name === 'itemtype') {
      this.props.changeRule(this.props.type, this.props.id, { itemtype: value, field: null })
      const fieldList = createFieldList(await this.props.glpi.listSearchOptions({ itemtype: value }))
      await this.setState({ fieldList })
      this.props.changeRule(this.props.type, this.props.id, { field: fieldList[0].value })
    } else {
      this.props.changeRule(this.props.type, this.props.id, { [name]: value })
    }
  }

  deleteRule = () => {
    this.props.changeRule(this.props.type, this.props.id, null)
  }

  render() {
    return (
      <div className="search-engine__rule froms__row">
        <span
          className="iconFont deleteIcon"
          onClick={this.deleteRule}
          role="button"
          tabIndex="0"
        />

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
          this.props.itemtype
          && (
            <Select
              name="itemtype"
              value={this.props.itemtype}
              options={Object.keys(itemtype).map(e => ({ name: e, value: e })).sort((a, b) => {
                if (a.name > b.name) {
                  return 1
                }
                if (a.name < b.name) {
                  return -1
                }
                return 0
              })}
              function={this.handleChangeRule}
              noEmpty
            />
          )
        }

        {
          this.props.field
          && (
            <React.Fragment>
              <Select
                name="field"
                value={this.props.field}
                options={this.state.fieldList}
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

              <Input
                name="value"
                type="text"
                value={this.props.value}
                function={this.handleChangeRule}
              />
            </React.Fragment>
          )
        }

        {/* <button
          className="btn"
          type="button"
          onClick={this.deleteRule}
        >
         -
        </button> */}


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
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(Rule)
