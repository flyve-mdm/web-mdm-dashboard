import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import ConstructInputs from '../../Utils/Forms'
import validateData from '../../Utils/validateData'
import IconItemList from '../IconItemList'
import { usersScheme } from '../../Utils/Forms/Schemes'
import Loading from '../../Utils/Loading'

export default class Profiles extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount = async () => {
        const myUser = await this.props.glpi.getAnItem('User', this.props.currentUser.id)
        const myUserEmails = await this.props.glpi.getSubItems('User', this.props.currentUser.id, 'UserEmail')
        const myEmails = myUserEmails.map(e => e.email)
        this.setState({
            isLoading: false,
            login: validateData(myUser.name, undefined),
            firstName: validateData(myUser.firstname),
            realName: validateData(myUser.realname),
            phone: validateData(myUser.phone),
            mobilePhone: validateData(myUser.mobile),
            phone2: validateData(myUser.phone2),
            administrativeNumber: validateData(myUser.registration_number),
            lastLogin: validateData(myUser.last_login, undefined),
            created: validateData(myUser.date_creation, undefined),
            modified: validateData(myUser.date_mod, undefined),
            emails: validateData(myEmails, []),
            imageProfile: validateData(myUser.picture, "profile.png"),
            authentication: 'GLPI internal database',
            password: '',
            passwordConfirmation: '',
            category: '',
            defaultEntity: '',
            comments: '',
            typeImageProfile: 'file',
            title: '',
            location: '',
            defaultProfile: '',
            validSince: new Date(),
            validUntil: new Date()
        })
    }

    saveChanges = () => {
        this.props.showNotification('Success', 'saved profile')
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    changeEmail = (name, value) => {
        let emails = [...this.state.emails]
        emails[name] = value
        this.changeState('emails', emails)
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
                ''
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

        const user = this.state.isLoading ? '' : 
            usersScheme({
                state: this.state, 
                changeState: this.changeState,
                deleteEmail: this.deleteEmail
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

        const renderComponent = this.state.isLoading ?  ( <Loading message="Loading..." /> ) :
        (
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

        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>

                { renderComponent }

            </ContentPane>

        )
    }
}

Profiles.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
}
