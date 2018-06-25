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

/**
 * Handle change input value
 * @function changeInput
 * @param {object} ctx
 * @param {object} input
 */
export const changeInput = (ctx, input) => {
  ctx.setState({
    [input.name]: input.value,
  })
}

/**
 * Handle change phase
 * @function changePhase
 * @param {object} ctx
 * @param {number} newPhase
 */
export const changePhase = (ctx, newPhase) => {
  ctx.setState({
    phase: newPhase,
  })
}

/**
 * Handle form submit
 * @function handleFormSubmit
 * @param {object} ctx
 * @param {object} event
 */
export const handleFormSubmit = (ctx, event) => {
  event.preventDefault()

  ctx.props.actions.fetchSignIn(
    ctx.state.username,
    ctx.state.password,
  )
}
