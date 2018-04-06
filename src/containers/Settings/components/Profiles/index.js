import React, { Component } from 'react'
import { connect } from 'react-redux'
import validateData from '../../../../shared/validateData'
import IconItemList from '../../../../components/IconItemList'
import { usersScheme } from '../../../../components/Forms/Schemas'
import Loading from '../../../../components/Loading'
import authtype from '../../../../shared/authtype'
import ErrorValidation from '../../../../components/ErrorValidation'
import ConstructInputs from '../../../../components/Forms'
import withGLPI from '../../../../hoc/withGLPI'
import withHandleError from '../../../../hoc/withHandleError'
import { uiTransactionStart, uiTransactionFinish, uiSetNotification } from '../../../../store/ui/actions'
import { bindActionCreators } from 'redux'
import ContentPane from '../../../../components/ContentPane'
import { I18n } from "react-i18nify"
import itemtype from '../../../../shared/itemtype'

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading,        
        currentUser: state.auth.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        uiTransactionStart: bindActionCreators(uiTransactionStart, dispatch),
        uiTransactionFinish: bindActionCreators(uiTransactionFinish, dispatch),
        setNotification: bindActionCreators(uiSetNotification, dispatch)
    }
    return { actions }
}

class Profiles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: null
        }
    }

    componentDidMount = async () => {
        if (this.state.login === null) {
            this.props.actions.uiTransactionStart()

            const myUser = await this.props.glpi.getAnItem({itemtype: itemtype.User, id: this.props.currentUser.id})

            const myEmails = await this.props.glpi.getSubItems({
                itemtype: itemtype.User, 
                id: this.props.currentUser.id, 
                subItemtype: 'UserEmail'
            })
    
            const {cfg_glpi} = await this.props.glpi.getGlpiConfig()
    
            const parametersToEvaluate = {
                minimunLength: cfg_glpi.password_min_length,
                needDigit: cfg_glpi.password_need_number,
                needLowercaseCharacter: cfg_glpi.password_need_letter,
                needUppercaseCharacter: cfg_glpi.password_need_caps,
                needSymbol: cfg_glpi.password_need_symbol
            }
    
            this.setState({
                parametersToEvaluate,
                login: myUser.name,
                firstName: myUser.firstname,
                realName: myUser.realname,
                phone: myUser.phone,
                mobilePhone: myUser.mobile,
                phone2: myUser.phone2,
                administrativeNumber: myUser.registration_number,
                lastLogin: myUser.last_login,
                created: myUser.date_creation,
                modified: myUser.date_mod,
                currentEmails: myEmails.map(a => ({...a})),
                emails: validateData(myEmails, []),
                imageProfile: validateData(myUser.picture, "profile.png"),
                authentication: authtype(myUser.authtype),
                password: '',
                passwordConfirmation: '',
                category: {
                    value: myUser.usercategories_id,
                    request: {
                        params: {itemtype: itemtype.UserCategory, options: {range: '0-200', forcedisplay: [2]}},
                        method: 'searchItems',
                        content: '1',
                        value: '2'
                    }
                },
                defaultEntity:  {
                    value: myUser.entities_id,
                    request: {
                        params: {},
                        method: 'getMyEntities',
                        content: 'name',
                        value: 'id'
                    }
                },
                comments: validateData(myUser.comment, ''),
                typeImageProfile: 'file',
                title: {
                    value: myUser.usertitles_id,
                    request: {
                        params: {itemtype: itemtype.UserTitle, options: {range: '0-200', forcedisplay: [2]}},
                        method: 'searchItems',
                        content: '1',
                        value: '2'
                    }
                },
                location: {
                    value: myUser.locations_id,
                    request: {
                        params: {itemtype: itemtype.Location, options: {range: '0-200', forcedisplay: [2]}},
                        method: 'searchItems',
                        content: '1',
                        value: '2'
                    }
                },
                defaultProfile: {
                    value: myUser.profiles_id,
                    request: {
                        params: {},
                        method: 'getMyProfiles',
                        content: 'name',
                        value: 'id'
                    }
                },
                validSince: myUser.begin_date ? new Date(myUser.begin_date) : undefined,
                validUntil: myUser.end_date ? new Date(myUser.end_date) : undefined
            }, () => {
                this.props.actions.uiTransactionFinish()
            })
        }
    }

    saveChanges = () => {

        let newUser = { 
            id: this.props.currentUser.id,
            firstname: this.state.firstName,
            realname: this.state.realName,
            phone: this.state.phone,
            mobile: this.state.mobilePhone,
            phone2: this.state.phone2,
            registration_number: this.state.administrativeNumber,
            picture: this.state.imageProfile,
            usercategories_id: this.state.category.value,
            entities_id: this.state.defaultEntity.value,
            comment: this.state.comments,
            usertitles_id: this.state.title.value,
            locations_id: this.state.location.value,
            profiles_id: this.state.defaultProfile.value,
            begin_date: this.state.validSince,
            end_date: this.state.validUntil
        }

        let correctPassword = true        

        if (this.state.password !== '' || this.state.passwordConfirmation !== '') {
            if (!ErrorValidation.validation(this.state.parametersToEvaluate, this.state.password).isCorrect) {
                correctPassword = false
            } else if (!ErrorValidation.validation({...this.state.parametersToEvaluate, isEqualTo: {value: this.state.password, message: I18n.t('commons.passwords_not_match')}}, this.state.passwordConfirmation).isCorrect) {
                correctPassword = false
            } else {
                newUser = {
                    ...newUser,
                    password: this.state.password,
                    password2: this.state.passwordConfirmation,
                }
            }
        }
        
        if (correctPassword) { 
            this.setState (
                { isLoading: true },
                async () => {
                    this.props.actions.uiTransactionStart()
                    try {
                        await this.props.glpi.updateItem({itemtype: itemtype.User, input: newUser})
                        await this.props.glpi.updateEmails({
                            userID: newUser.id, 
                            currentEmails: this.state.currentEmails, 
                            newEmails: this.state.emails
                        })
                        this.props.actions.uiTransactionFinish()
                    } catch (e) {
                        this.props.actions.uiTransactionFinish()
                    }
                }
            , () => this.props.actions.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.profile_data_changed'),
                    type: 'info'
                })
            )
        }
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    changeEmail = (index, value) => {
        let emails = [...this.state.emails]
        emails[index].email = value
        this.setState({emails})
    }

    changeSelect = (name, value) => {
        this.setState({
            [name]: {
                ...this.state[name],
                value
            }
        })
    }

    deleteEmail = (index) => {
        this.setState({
            emails: this.state.emails.slice(0,index).concat(this.state.emails.slice(index+1))
        })
    }

    addEmail = () => {
        this.setState({
            emails: [
                ...this.state.emails,
                { email: '' }
            ]
        })
    }

    previewFile = (evt) => {

        const file = evt.target.files[0]
        if (file.type.match('image.*')) {
            let reader = new FileReader()

            reader.onload = ((theFile) => {
                return (e) => {
                this.setState({
                    imageProfile: e.target.result,
                    typeImageProfile: 'localFile'
                })
            }})(file)

            reader.readAsDataURL(file)
        }
   }

    openFileChooser = () => {
        this.inputElement.value = null
        this.inputElement.click()
    }

    render () {        
        let component = null

        if (this.props.isLoading || !this.state.login) {
            component = <div style={{width: '100%', height: 'calc(100vh - 120px)'}}><Loading message={`${I18n.t('commons.loading')}...`} /></div>
        } else {
            let user = usersScheme({
                state: this.state, 
                changeState: this.changeState,
                changeEmail: this.changeEmail,
                deleteEmail: this.deleteEmail,
                changeSelect: this.changeSelect,
                glpi: this.props.glpi
            })
    
            let inputAttributes = {
                type: 'file',
                accept: "image/*",
                name: "imageProfile",
                style: { display: 'none' },
                ref: (element) => {
                    this.inputElement = element
                },
                onChange: this.previewFile
            }    

            component = (
                <div className="froms Profiles" style={{marginTop: '20px'}}>

                    <div className="froms__row froms__row--icon">
                        <span className="viewIcon"/>
                    </div>
                    
    
                    <div className="froms__row">
    
                        <div style={{ overflow: 'hidden' }}>
                            <input
                                {...inputAttributes}
                            />
                            <IconItemList 
                                image={this.state.imageProfile} 
                                type={this.state.typeImageProfile}
                                imgClick={this.openFileChooser}
                                size={150}
                                imgClass="clickable"
                            />
                        </div>
    
                    </div>
    
                    <ConstructInputs data={user.personalInformation} icon="contactIcon" />
    
                    <ConstructInputs data={user.passwordInformation} icon="permissionsIcon" />
                
                    <ConstructInputs data={user.validDatesInformation} icon="monthIcon" />
    
                    <ConstructInputs data={user.emailsInformation} icon="emailIcon" />
                    <div style={{ overflow: 'auto' }}>
                        <button className="win-button" style={{ float: 'right'}} onClick={this.addEmail}>
                            {I18n.t('commons.add_email')}
                        </button>
                    </div>
    
                    <ConstructInputs data={user.contactInformation} icon="phoneIcon" />
                
                    <ConstructInputs data={user.moreInformation} icon="detailsIcon" />
    
                    <ConstructInputs data={user.activityInformation} icon="documentIcon" />
    
                    <button className="win-button" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                        {I18n.t('commons.save')}
                    </button>
                
                    <br/>
    
                </div>   
            )
        }       
        return (
            <ContentPane>
                <h2>
                    {I18n.t('commons.profiles')}
                </h2>

                { component }
            </ContentPane>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withGLPI(withHandleError(Profiles)))
