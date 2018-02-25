export default function ({ state, changeState }) {

    const helpDeskInformation = [
        [
            {
                label: "Support name",
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
                label: "Support phone",
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
                label: "Support website",
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
                label: "Support email",
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
                label: "Support address",
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
