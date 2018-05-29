import React from 'react'

export default (year, month) => {
    const daysList = {
        January: 31, 
        February: 28,
        March: 31, 
        April: 30, 
        May: 31, 
        June: 30,
        July: 31,
        August:31, 
        September: 30, 
        October: 31, 
        November: 30, 
        December: 31
    }

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        daysList.February = 29
    }
    
    let days = []

    if (month) {
        for (let index = 1; index <= daysList[month]; index++) {
            days.push((
                <option value={index} key={`day${index}`}>
                    { index }
                </option>
            ))
        }
    }

    return days
}