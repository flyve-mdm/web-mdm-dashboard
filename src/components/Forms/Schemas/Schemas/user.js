/*
*   Copyright © 2018 Teclib. All rights reserved.
*
*   This file is part of web-mdm-dashboard
*
* web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
* device management software.
*
* Flyve MDM is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 3
* of the License, or (at your option) any later version.
*
* Flyve MDM is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* ------------------------------------------------------------------------------
* @author     Gianfranco Manganiello (gmanganiello@teclib.com)
* @author     Hector Rondon (hrondon@teclib.com)
* @copyright  Copyright © 2018 Teclib. All rights reserved.
* @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
* @link       https://github.com/flyve-mdm/web-mdm-dashboard
* @link       http://flyve.org/web-mdm-dashboard
* @link       https://flyve-mdm.com
* ------------------------------------------------------------------------------
*/

import { I18n } from "react-i18nify"

/**
 * User data schema
 * @function agent
 * @param {object} state 
 * @param {function} changeState 
 * @param {function} changeEmail 
 * @param {function} deleteEmail 
 * @param {function} changeSelect 
 * @param {object} glpi 
 * @return {array}
 */
export default function ({state, changeState, changeEmail, deleteEmail, changeSelect, glpi}) {
    const personalInformation = [
        [
            {
                label: I18n.t('commons.login'),
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
                label: I18n.t('commons.realname'),
                type: "text",
                name: "realName",
                value: state.realName,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: I18n.t('commons.first_name'),
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
                label: I18n.t('commons.title'),
                type: "select",
                name: "title",
                value: state.title.value,
                options: [],
                function: changeSelect,
                request: state.title.request,
                glpi
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
            },
            {
                label: I18n.t('commons.default_profile'),
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
                label: I18n.t('commons.phone'),
                type: "text",
                name: "phone",
                value: state.phone,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: I18n.t('commons.mobile_phone'),
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
                label: I18n.t('commons.phone_2'),
                type: "text",
                name: "phone2",
                value: state.phone2,
                placeholder: null,
                function: changeState,
                disabled: false,
                style: null
            },
            {
                label: I18n.t('commons.administrative_number'),
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
                label: I18n.t('commons.password'),
                type: "password",
                name: "password",
                value: state.password,
                placeholder: null,
                function: changeState,
                parametersToEvaluate: state.parametersToEvaluate,
                disabled: false,
                style: null
            },
            {
                label: I18n.t('commons.password_confirmation'),
                type: "password",
                name: "passwordConfirmation",
                value: state.passwordConfirmation,
                placeholder: null,
                parametersToEvaluate: {
                    ...state.parametersToEvaluate,
                    isEqualTo: {
                        value: state.password,
                        message: I18n.t('commons.passwords_not_match')
                    }
                },
                function: changeState,
                disabled: false,
                style: null
            }
        ]
    ]
    
    const activityInformation = [
        [
            {
                label: I18n.t('commons.last_login'),
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
                label: I18n.t('commons.created'),
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
                label: I18n.t('commons.modified'),
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
            label: I18n.t('commons.valid_since'),
            type: "date",
            name: "validSince",
            value: state.validSince,
            function: changeState
        }],
        [{
            label: I18n.t('commons.valid_until'),
            type: "date",
            name: "validUntil",
            value: state.validUntil,
            function: changeState
        }]
    ]
    
    const moreInformation = [
        [{
            label: I18n.t('commons.authentication'),
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
                label: I18n.t('commons.category'),
                type: "select",
                name: "category",
                value: state.category.value,
                options: [],
                function: changeSelect,
                request: state.category.request,
                glpi
            },
            {
                label: I18n.t('commons.default_entity'),
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
                label: I18n.t('commons.comments'),
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
                name: index,
                label: `${I18n.t('commons.email')} ${index + 1}`,
                type: "email",
                value: state.emails[index].email,
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
