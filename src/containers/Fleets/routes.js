import React from 'react'
import { I18n } from 'react-i18nify'

import FleetsContent from './components/FleetsContent'

const MonkComponent1 = () => <div><h1> Mock1 </h1></div>
const MonkComponent2 = () => <div><h1> Mock2 </h1></div>
const MonkComponent3 = () => <div><h1> Mock3 </h1></div>
const MonkComponent4 = () => <div><h1> Mock4 </h1></div>
const MonkComponent5 = () => <div><h1> Mock5 </h1></div>

const routes = [
  {
    path: '/',
    name: 'No selected',
    component: MonkComponent1,
    exact: true
  },
  {
    path: '/:id',
    name: 'Fleet',
    component: FleetsContent,
    exact: false
  },
  {
    path: '/:id/edit',
    name: 'Edit Fleet',
    component: MonkComponent4,
    exact: false
  },
  {
    path: '/create',
    name: 'Create Fleet',
    component: MonkComponent5,
    exact: false
  }
]

export default routes