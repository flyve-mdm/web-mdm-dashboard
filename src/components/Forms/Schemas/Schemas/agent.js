import { I18n } from "react-i18nify"

export default function ({state, changeState, glpi}) {
    const mainInformation = [
        [
            {
                label: I18n.t('commons.device_name'),
                type: "text",
                name: "name",
                value: state.name,
                placeholder: I18n.t('commons.device_name'),
                function: changeState,
                disabled: false,
                style: null
            },
        ],
        [
            {
                label: I18n.t('commons.fleet_name'),
                type: "select",
                name: "fleet",
                value: state.fleet.value,
                options: [],
                function: changeState,
                request: state.fleet.request,
                glpi
            }
        ]
    ]

    return {
        mainInformation
    }
}
