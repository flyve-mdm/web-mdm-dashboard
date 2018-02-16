import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConstructInputs from '../../Utils/Forms'
import ContentPane from '../../Utils/ContentPane'
import validateData from '../../Utils/validateData'
import IconItemList from '../IconItemList'
import { usersScheme } from '../../Utils/Forms/Schemes'
import Loading from '../../Utils/Loading'

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
            this.setState({
                isLoading: false,
                login: response["User.name"],
                firstName: response["User.firstname"],
                realName: response["User.realname"],
                phone: response["User.phone"],
                mobilePhone: response["User.mobile"],
                phone2: response["User.phone2"],
                administrativeNumber: response["User.registration_number"],
                lastLogin: response["User.last_login"],
                created: response["User.date_creation"],
                modified: response["User.date_mod"],
                emails: validateData(response["User.UserEmail.email"], []),
                imageProfile: validateData(response['User.picture'], "profile.png"),
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
        } catch (error) {
            this.setState({isLoading: false})
        }
    } 
    saveChanges = () => {
        this.props.showNotification('Success', 'edited user')            
        this.props.changeActionList(null)
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

        let componetRender

        if (this.state.isLoading) {
            componetRender = <Loading message="Loading..." />
        } else {
            const user = usersScheme({
                state: this.state, 
                changeState: this.changeState,
                changeEmail: this.changeEmail,
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
            componetRender = (
                <div>
                    <div className="list-content Profiles">
                        <div className="listElement listElementIcon">
                            <span className="viewIcon" />
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
                                    imgClass="clickable" />
                            </div>

                        </div>


                        <ConstructInputs data={user.personalInformation} icon="contactIcon" />

                        <ConstructInputs data={user.passwordInformation} icon="permissionsIcon" />

                        <ConstructInputs data={user.validDatesInformation} icon="monthIcon" />

                        <ConstructInputs data={user.emailsInformation} icon="emailIcon" />
                        <div style={{ overflow: 'auto' }}>
                            <button className="win-button" style={{ float: 'right' }} onClick={this.addEmail}>Add email</button>
                        </div>

                        <ConstructInputs data={user.contactInformation} icon="phoneIcon" />

                        <ConstructInputs data={user.moreInformation} icon="detailsIcon" />

                        <ConstructInputs data={user.activityInformation} icon="documentIcon" />

                        <button className="win-button win-button-primary" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                            Save
                        </button>

                        <br />
                    </div>
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