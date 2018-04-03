import ErrorValidation from '../../components/ErrorValidation';

export const resetPassword = (ctx) => {

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
        ctx.setState({
            isResetSent: true
        })
        ctx.props.actions.fetchResetPassword({ email: ctx.state.email, token: ctx.state.token, newPassword: ctx.state.password })
    } else {
        ctx.setState({
            forceValidation: true
        })
    }
}

export const changeState = (ctx) => {
    return (name, value) => {
        ctx.setState({
            [name]: value
        })
    }
}

export const buildDataArray = (ctx, I18n) => {
    const dataArray = {
        resetInformation: [
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
                    label: I18n.t('commons.password_confirmation'),
                    type: "password",
                    name: "passwordConfirmation",
                    value: ctx.state.passwordConfirmation,
                    placeholder: I18n.t('commons.password_confirmation'),
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
                            message: I18n.t('commons.passwords_not_match')
                        }
                    },
                    forceValidation: ctx.state.forceValidation
                }
            ]
        ]
    }
    return dataArray
}
