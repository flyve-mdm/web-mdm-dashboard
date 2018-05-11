import { I18n } from "react-i18nify"

export default function ({state, changeState, changeSelect, glpi}) {
    const softwareInformation = [
        [
            {
                label: I18n.t('commons.name'),
                type: "text",
                name: "name",
                value: state.name,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: I18n.t('commons.location'),
                type: "select",
                name: "location",
                value: state.location.value,
                options: [],
                function: changeSelect,
                request: state.location.request,
                glpi
            }
        ],
    ]

    return {
        softwareInformation
    }
}
