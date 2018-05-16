import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { I18n } from 'react-i18nify'
import publicURL from '../../../shared/publicURL'
import appConfig from '../../../../public/config.json'
import withGLPI from '../../../hoc/withGLPI'
import Loading from '../../../components/Loading'

class UsernameFieldset extends PureComponent {

    constructor (props) {
        super(props)
        this.state = {
            classInput: 'win-textbox',
            errorMessage: '',
            isLoading: true,
            selfRegistration: null
        }
    }

    componentDidMount = async () => {
        try {
            await this.props.glpi.initSessionByUserToken({ userToken: appConfig.pluginDemoToken })
            const plugins = await this.props.glpi.getAllItems({ itemtype: 'Plugin' })
            const pluginDemo = plugins.filter(plugin => plugin.name === "Flyve MDM Demo")
            if (pluginDemo.length < 1 || pluginDemo[0].status !== 1) {
                throw new Error()
            }
            this.setState(
                {
                    isLoading: false,
                    selfRegistration: true
                },
                () => {
                    this.usernameInput.focus()
                    this.props.glpi.killSession()
                }
            )
        } catch (e) {
            this.setState(
                {
                    isLoading: false,
                    selfRegistration: false
                },
                () => {
                    this.usernameInput.focus()
                }
            )
        }

    }

    LogInServer = (e) => {
        e.preventDefault()
        if (this.props.username) {
            this.props.changePhase(2)
        } else {
            this.setState({
                classInput: 'win-textbox color-line-alert',
                errorMessage: (
                    <p className="color-type-alert"> 
                        <span> {I18n.t('login.username_not_registered')} </span> 
                        <a>{I18n.t('login.create_an_new')}</a>
                    </p>
                )
            })
        }
    }

    render () {
        return (
            this.state.isLoading ?
                (
                    <div style={{margin: 50, height: '140px'}}>
                        <Loading message={`${I18n.t('commons.loading')}...`} />
                    </div>
                ) :
                (
                    <div className="authentication__email">
                        <h2>
                            {I18n.t('login.title')}
                        </h2>
                        <p>
                            {I18n.t('login.use_your_account')}
                            <br/>
                            <a href="https://flyve-mdm.com/">
                                {I18n.t('login.what_is_this')}
                            </a>
                        </p>

                        {this.state.errorMessage}

                        <form onSubmit={this.LogInServer}>
                            <input
                                type="text"
                                name="username"
                                ref={(input) => { this.usernameInput = input; }}
                                className={this.state.classInput}
                                placeholder={I18n.t('commons.username')}
                                value={this.props.username}
                                onChange={this.props.changeInput}
                                required={true}
                            />
                            <button className="btn btn--primary">
                                {I18n.t('commons.next')}
                            </button>
                        </form>
                        {
                            !this.state.selfRegistration ? '' : (
                                <p>
                                    {I18n.t('login.no_account')}
                                    &nbsp;
                                    <Link to={`${publicURL}/signUp`}>
                                        {I18n.t('login.create_one')}
                                    </Link>
                                </p>
                            )
                        }

                    </div>
                )

        )
    }
}

UsernameFieldset.propTypes = {
    username: PropTypes.string.isRequired,
    changeInput: PropTypes.func.isRequired,
    changePhase: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}

export default withGLPI(UsernameFieldset)