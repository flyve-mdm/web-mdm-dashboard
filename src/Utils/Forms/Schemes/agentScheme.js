export default function ({state, changeState, glpi}) {

    const mainInformation = [
        [
            {
                label: "Device name",
                type: "text",
                name: "name",
                value: state.name,
                placeholder: "Device name",
                function: changeState,
                disabled: false,
                style: null
            },
        ],
        [
            {
                label: "Fleet name",
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
