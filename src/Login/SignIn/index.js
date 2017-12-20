import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConstructInputs from '../../Utils/Forms'
import IconItemList from '../../AdminDashboard/IconItemList'
import { usersScheme } from '../../Utils/Forms/Schemes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeEmail } from '../DuckController'
// import Loading from '../../Utils/Loading'
import LoginContainer from '../LoginContainer'


function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        isLoading: state.Login.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeEmail: bindActionCreators(changeEmail, dispatch)
    }
    return { actions }
}

class SignIn extends Component {

    constructor (props) {
        super(props)
        this.state = {
            login: '',
            firstName: '',
            realName: '',
            phone: '',
            mobilePhone: '',
            phone2: '',
            administrativeNumber: '',
            lastLogin: '',
            created: '',
            modified: '',
            emails: [''],
            imageProfile: '',
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
        }
    }

    addEmail = () => {
        this.setState({
            emails: [
                ...this.state.emails,
                ''
            ]
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

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
        if (this.state.buttonSaveClassName === "win-button win-button-primary hidden") {
            this.setState({
                buttonSaveClassName: "win-button win-button-primary"
            })
        }
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

    render() {
        let user = usersScheme({
            state: this.state, 
            changeState: this.changeState,
            deleteEmail: this.deleteEmail,
            changeEmail: this.changeEmail
        })
        
        user.personalInformation[0][0].placeholder = 'Your user name'
        user.personalInformation[0][0].disabled = false
        user.personalInformation[0][0].function = this.changeState
        user.personalInformation[0][0].style = null

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


        return (
            <LoginContainer centerContent={false} width="90%" >
                <h2 style={{
                    textAlign: 'center'
                }}>
                    Create account
                </h2>

                <form className="list-content">

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
                        <button 
                        className="win-button" 
                        type="button"
                        style={{ margin: "20px" }} 
                        onClick={this.addEmail}>
                                Add email
                        </button>
                    </div>

                    <ConstructInputs data={user.contactInformation} icon="phoneIcon" />

                    <ConstructInputs data={user.moreInformation} icon="detailsIcon" />


                    <button className="win-button win-button-primary" style={{ margin: "20px", float: "right" }} onClick={this.saveChanges}>
                        Save
                    </button>
                </form>
            </LoginContainer>
        )
    }
}

SignIn.propTypes = {
    email: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignIn)    
