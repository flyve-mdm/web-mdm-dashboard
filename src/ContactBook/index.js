import React from 'react'
import HeaderContactBook from './HeaderContactBook'
import BodyContactBook from './BodyContactBook'

import './ContactBook.css'

export default class App extends React.Component {

    render () {
        return (
            <div style={{height: '100%'}}>
                <HeaderContactBook />
                <BodyContactBook />
            </div>
        )
    }
}