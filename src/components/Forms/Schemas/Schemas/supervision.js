import { I18n } from "react-i18nify"

export default function ({ state, changeState }) {
    const helpDeskInformation = [
        [
            {
                label: I18n.t('commons.support_name'),
                type: "text",
                name: "name",
                value: state.name,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ],
        [
            {
                label: I18n.t('commons.support_phone'),
                type: "text",
                name: "phone",
                value: state.phone,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ],
        [
            {
                label: I18n.t('commons.support_website'),
                type: "text",
                name: "website",
                value: state.website,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ],
        [
            {
                label: I18n.t('commons.support_email'),
                type: "text",
                name: "email",
                value: state.email,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ],
        [
            {
                label: I18n.t('commons.support_address'),
                type: "textArea",
                name: "address",
                value: state.address,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            }
        ]
    ]

    return {
        helpDeskInformation
    }
}
