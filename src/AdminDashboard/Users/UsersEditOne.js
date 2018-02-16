import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConstructInputs from '../../Utils/Forms'
import ContentPane from '../../Utils/ContentPane'
import validateData from '../../Utils/validateData'
import IconItemList from '../IconItemList'
import { usersScheme } from '../../Utils/Forms/Schemes'
import Loading from '../../Utils/Loading'
import ErrorValidation from '../../Utils/Forms/ErrorValidation'

class Profiles extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            login: undefined,
            firstName: undefined,
            realName: undefined,
            phone: undefined,
            mobilePhone: undefined,
            phone2: undefined,
            administrativeNumber: undefined,
            lastLogin: undefined,
            created: undefined,
            modified: undefined,
            emails: undefined,
            imageProfile: undefined,
            authentication: undefined,
            password: undefined,
            passwordConfirmation: undefined,
            category: undefined,
            defaultEntity: undefined,
            comments: undefined,
            typeImageProfile: undefined,
            title: undefined,
            location: undefined,
            defaultProfile: undefined,
            validSince: undefined,
            validUntil: undefined
        }
    }

    componentDidMount() {
        if (this.props.selectedItemList) {
            this.handleRefresh()
        }
    }

    handleRefresh = async () => {
        this.setState({
            isLoading: true
        })
        try {
            const response = await this.props.glpi.getAnItem({ itemtype: 'User', id: this.props.selectedItemList[0]['User.id']})
            const myEmails = await this.props.glpi.getSubItems({
                itemtype: 'User', 
                id: this.props.selectedItemList[0]['User.id'], 
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
                isLoading: false,
                parametersToEvaluate,
                login: response.name,
                firstName: response.firstname,
                realName: response.realname,
                phone: response.phone,
                mobilePhone: response.mobile,
                phone2: response.phone2,
                administrativeNumber: response.registration_number,
                lastLogin: response.last_login,
                created: response.date_creation,
                modified: response.date_mod,
                currentEmails: myEmails.map(a => ({...a})),
                emails: validateData(myEmails, []),
                imageProfile: validateData(response.picture, "profile.png"),
                authentication: 'GLPI internal database',
                password: '',
                passwordConfirmation: '',
                category: {
                    value: response.usercategories_id,
                    request: {
                        params: {itemtype: 'UserCategory', options: {range: '0-200', forcedisplay: [2]}},
                        method: 'searchItems',
                        content: '1',
                        value: '2'
                    }
                },
                defaultEntity:  {
                    value: response.entities_id,
                    request: {
                        params: {},
                        method: 'getMyEntities',
                        content: 'name',
                        value: 'id'
                    }
                },
                comments: '',
                typeImageProfile: 'file',
                title: {
                    value: response.usertitles_id,
                    request: {
                        params: {itemtype: 'UserTitle', options: {range: '0-200', forcedisplay: [2]}},
                        method: 'searchItems',
                        content: '1',
                        value: '2'
                    }
                },
                location: {
                    value: response.locations_id,
                    request: {
                        params: {itemtype: 'Location', options: {range: '0-200', forcedisplay: [2]}},
                        method: 'searchItems',
                        content: '1',
                        value: '2'
                    }
                },
                defaultProfile: {
                    value: response.profiles_id,
                    request: {
                        params: {},
                        method: 'getMyProfiles',
                        content: 'name',
                        value: 'id'
                    }
                },
                validSince: response.begin_date ? new Date(response.begin_date) : undefined,
                validUntil: response.end_date ? new Date(response.end_date) : undefined
            })
        } catch (error) {
            this.setState({isLoading: false})
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
            } else if (!ErrorValidation.validation({...this.state.parametersToEvaluate, isEqualTo: {value: this.state.password, message: "Passwords do not match"}}, this.state.passwordConfirmation).isCorrect) {
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
                    try {
                        await this.props.glpi.updateItem({itemtype: 'User', input: newUser})
                        await this.props.glpi.updateEmails({
                            userID: newUser.id, 
                            currentEmails: this.state.currentEmails, 
                            newEmails: this.state.emails
                        })
                        this.props.showNotification('Success', 'saved profile')
                        this.props.changeActionList(null)
                    } catch (e) {
                        this.setState ({isLoading: false})            
                        this.props.showNotification('Error', e)
                    }
                }
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

        let componetRender

        if (this.state.isLoading) {
            componetRender = <Loading message="Loading..." />
        } else {
            const user = usersScheme({
                state: this.state, 
                changeState: this.changeState,
                changeEmail: this.changeEmail,
                deleteEmail: this.deleteEmail,
                changeSelect: this.changeSelect,
                glpi: this.props.glpi
            })

            const inputAttributes = {
                type: 'file',
                accept: "image/*",
                name: "imageProfile",
                style: { display: 'none' },
                ref: (element) => {
                    this.inputElement = element
                },
                onChange: this.previewFile
            }

            componetRender = (
                <div className="list-content Profiles">

                    <div className="listElement listElementIcon">
                        <span className="viewIcon"/>
                    </div>
                    

                    <div className="listElement">

                        <div style={{ overflow: 'hidden' }}>
                            <input
                                {...inputAttributes}
                            />
                            <IconItemList 
                                image={this.state.imageProfile} 
                                type={this.state.typeImageProfile}
                                imgClick={this.openFileChooser}
                                size={150}
                                imgClass="clickable"/>
                        </div>

                    </div>


                    <ConstructInputs data={user.personalInformation} icon="contactIcon" />

                    <ConstructInputs data={user.passwordInformation} icon="permissionsIcon" />
                
                    <ConstructInputs data={user.validDatesInformation} icon="monthIcon" />

                    <ConstructInputs data={user.emailsInformation} icon="emailIcon" />
                    <div style={{ overflow: 'auto' }}>
                        <button className="win-button" style={{ float: 'right'}} onClick={this.addEmail}>Add email</button>
                    </div>

                    <ConstructInputs data={user.contactInformation} icon="phoneIcon" />
                
                    <ConstructInputs data={user.moreInformation} icon="detailsIcon" />

                    <ConstructInputs data={user.activityInformation} icon="documentIcon" />

                    <button className="win-button win-button-primary" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                        Save
                    </button>
                
                    <br/>

                </div>   
            )
        }

        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                {componetRender}
            </ContentPane>            
        )
    }
}

Profiles.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default Profiles