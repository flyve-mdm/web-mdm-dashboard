import React from 'react'
import monthsList from './monthsList.json'

export default () => {
    let months = []
    monthsList.forEach(month => {
        months.push((
            <option value={month} key={`month${month}`}>
                { month }
            </option>
        ))
    })
    return months
}