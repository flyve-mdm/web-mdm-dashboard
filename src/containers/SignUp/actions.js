import ErrorValidation from '../../components/ErrorValidation';

/**
 * Actions Pattern for Form SignUp Data Flow
 * 
 */

export const changeState = (ctx) => {
    return (name, value) => {
        ctx.setState({
            [name]: value
        })
    }
}

export const buildDataArray = (ctx, I18n) => {
  const dataArray = {
    personalInformation: [
        [
            {
                label: I18n.t('commons.email'),
                type: "text",
                name: "email",
                value: ctx.state.email,
                placeholder: I18n.t('commons.email'),
                function: ctx.changeState(),
                disabled: false,
                style: {
                    width: 340
                },
                parametersToEvaluate: {
                    isRequired: true,
                    isEmail: true
                },
                forceValidation: ctx.state.forceValidation
            },
            {
                label: I18n.t('create_account.full_name'),
                type: "text",
                name: "realName",
                value: ctx.state.realName,
                placeholder: I18n.t('create_account.full_name'),
                function: ctx.changeState(),
                disabled: false,
                style: {
                    width: 340
                },
                parametersToEvaluate: {
                    isRequired: true
                },
                forceValidation: ctx.state.forceValidation
            }
        ]
    ],
    passwordInformation: [
        [
            {
                label: I18n.t('commons.password'),
                type: "password",
                name: "password",
                value: ctx.state.password,
                placeholder: I18n.t('commons.password'),
                function: ctx.changeState(),
                disabled: false,
                style: {
                    width: 340
                },
                parametersToEvaluate: {
                    isRequired: true,
                    ...ctx.state.configurationPassword
                },
                forceValidation: ctx.state.forceValidation
            },
            {
                label: I18n.t('create_account.password_(confirmation)'),
                type: "password",
                name: "passwordConfirmation",
                value: ctx.state.passwordConfirmation,
                placeholder: I18n.t('create_account.password_(confirmation)'),
                function: ctx.changeState(),
                disabled: false,
                style: {
                    width: 340
                },
                parametersToEvaluate: {
                    isRequired: true,
                    ...ctx.state.configurationPassword,
                    isEqualTo: {
                        value: ctx.state.password,
                        message: "Passwords do not match"
                    }
                },
                forceValidation: ctx.state.forceValidation
            }
        ]
    ],
    captchaInformation: [
        [
            {
                label: I18n.t('create_account.enter_the_code_from_the_image'),
                type: "text",
                name: "captchaValue",
                value: ctx.state.captchaValue,
                placeholder: null,
                function: ctx.changeState(),
                disabled: false,
                style: {
                    width: 340
                },
                parametersToEvaluate: {
                    isRequired: true
                },
                forceValidation: ctx.state.forceValidation
            }
        ]
    ]  
  }
  return dataArray
}

export const handleSubmitForm = (ctx, event) => {
    event.preventDefault()

    const user = ctx.buildDataArray()
    
    let isCorrect = true

    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            const elements = user[key]
            for (let index = 0; index < elements[0].length; index++) {
                const element = elements[0][index]
                if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) 
                    isCorrect = false
            }
        }
    }
    
    if (isCorrect) {
        ctx.props.actions.fetchSignUp({
            "name": ctx.state.email,
            "realname": ctx.state.realName,
            "password": ctx.state.password,
            "password2": ctx.state.passwordConfirmation,
            "_useremails": [ctx.state.email],
            "_plugin_flyvemdmdemo_captchas_id": ctx.props.captcha.id,
            "_answer": ctx.state.captchaValue
        })
    } else {
        ctx.setState({
            forceValidation: true
        })
    }
}