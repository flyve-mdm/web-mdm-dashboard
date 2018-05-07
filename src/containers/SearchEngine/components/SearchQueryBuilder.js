import React, { PureComponent } from 'react'
import QueryBuilder from 'react-querybuilder'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'

class SearchQueryBuilder extends PureComponent {
    render() {
        return (
            <div className="queryBuilder">
                <QueryBuilder
                    fields={this.props.fields}
                    operators={[
                        { name: 'contains', label: I18n.t('commons.contains') },
                        { name: 'equal', label: I18n.t('commons.equals') }, // equal instead equals because work it
                        { name: 'notequals', label: I18n.t('commons.not_equals') },
                        { name: 'lessthan', label: I18n.t('commons.less_than') },
                        { name: 'morethan', label: I18n.t('commons.more_than') },
                        { name: 'under', label: I18n.t('commons.under') },
                        { name: 'notunder', label: I18n.t('commons.not_under') }
                    ]}
                    onQueryChange={this.props.handleChangeQuery} />
            </div>
        )
    }
}

SearchQueryBuilder.propTypes = {
    fields: PropTypes.array.isRequired,
    handleChangeQuery: PropTypes.func.isRequired
}


export default SearchQueryBuilder