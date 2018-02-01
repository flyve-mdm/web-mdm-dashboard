export default function ({state, changeState, changeEmail, deleteEmail, changeSelect, glpi}) {

    const personalInformation = [
        [
            {
                label: "Login",
                type: "text",
                name: "login",
                value: state.login,
                placeholder: null,
                function: null,
                disabled: true,
                style: {
                    width: 'auto'
                }
            },
        ],
        [
            {
                label: "Realname",
                type: "text",
                name: "realName",
                value: state.realName,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: "First name",
                type: "text",
                name: "firstName",
                value: state.firstName,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ],
        [
            {
                label: "Title",
                type: "select",
                name: "title",
                value: state.title.value,
                options: [],
                function: changeSelect,
                request: state.title.request,
                glpi
            },
            {
                label: "Location",
                type: "select",
                name: "location",
                value: state.location.value,
                options: [],
                function: changeSelect,
                request: state.location.request,
                glpi
            },
            {
                label: "Default profile",
                type: "select",
                name: "defaultProfile",
                value: state.defaultProfile.value,
                options: [],
                function: changeSelect,
                request: state.defaultProfile.request,
                glpi
            }
        ]
    ]
    
    const contactInformation = [
        [
            {
                label: "Phone",
                type: "text",
                name: "phone",
                value: state.phone,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: "Mobile phone",
                type: "text",
                name: "mobilePhone",
                value: state.mobilePhone,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ],
        [
            {
                label: "Phone 2",
                type: "text",
                name: "phone2",
                value: state.phone2,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: "Administrative number",
                type: "text",
                name: "administrativeNumber",
                value: state.administrativeNumber,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ]
    ]
    const passwordInformation = [
        [
            {
                label: "Password",
                type: "password",
                name: "password",
                value: state.password,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: "Password (confirmation)",
                type: "password",
                name: "passwordConfirmation",
                value: state.passwordConfirmation,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ]
    ]
    
    const activityInformation = [
        [
            {
                label: "Last login",
                type: "text",
                name: "lastLogin",
                value: state.lastLogin,
                placeholder: null,
                function: changeState,
                disabled: true,
                style: {
                    width: '100%'
                }
            },
            {
                label: "Created",
                type: "text",
                name: "created",
                value: state.created,
                placeholder: null,
                function: changeState,
                disabled: true,
                style: {
                    width: 'auto'
                } 
            },
            {
                label: "Modified",
                type: "text",
                name: "modified",
                value: state.modified,
                placeholder: null,
                function: changeState,
                disabled: true,
                style: {
                    width: 'auto'
                } 
            }
        ]
    
    ]
    
    const validDatesInformation = [
        [{
            label: "Valid since",
            type: "date",
            name: "validSince",
            value: state.validSince,
            function: changeState
        }],
        [{
            label: "Valid until",
            type: "date",
            name: "validUntil",
            value: state.validUntil,
            function: changeState
        }]
    ]
    
    const moreInformation = [
        [{
            label: "Authentication",
            type: "text",
            name: "authentication",
            value: state.authentication,
            placeholder: null,
            function: changeState,
            disabled: true,
            style: null
        }],
        [   
            {
                label: "Category",
                type: "select",
                name: "category",
                value: state.category.value,
                options: [],
                function: changeSelect,
                request: state.category.request,
                glpi
            },
            {
                label: "Default entity",
                type: "select",
                name: "defaultEntity",
                value: state.defaultEntity.value,
                options: [],
                function: changeSelect,                
                request: state.defaultEntity.request,
                glpi
            }
        ],
        [
            {
                label: "Comments",
                type: "textArea",
                name: "comments",
                value: state.comments,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ]
    ]
    
    let emailsInformation = [[]]
    
    for (let index = 0; index < state.emails.length; index++) {
        emailsInformation = [
            ...emailsInformation,
            [{
                label: `Email ${index + 1}`,
                type: "email",
                name: index,
                value: state.emails[index],
                placeholder: null,
                function: changeEmail,
                disabled: false,
                style: null,
                delete: deleteEmail
            }]
        ]
    }

    return {
        personalInformation,
        contactInformation,
        passwordInformation,
        activityInformation,
        validDatesInformation,
        moreInformation,
        emailsInformation
    }
}
