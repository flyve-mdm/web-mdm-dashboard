import React from 'react'

import FleetsContent from './components/FleetsContent'
import EmptyMessage from '../../components/EmptyMessage'

const MonkComponent4 = () => <div><h1> Mock4 </h1></div>
const MonkComponent5 = () => <div><h1> Mock5 </h1></div>

const routes = [
  {
    path: '/',
    name: 'No selected',
    component: EmptyMessage,
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