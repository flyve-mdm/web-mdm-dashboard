import React from 'react'

import FleetsContent from './components/FleetsContent'
import EmptyMessage from '../../components/EmptyMessage'
import FleetEdit from './components/FleetEdit'

const MonkComponent5 = () => <div><h1> Mock5 </h1></div>

const routes = [
  {
    path: '/',
    name: 'No selected',
    component: EmptyMessage,
    exact: true
  },
  {
    path: '/:id/edit',
    name: 'Edit Fleet',
    component: FleetEdit,
    exact: false
  },
  {
    path: '/:id',
    name: 'Fleet',
    component: FleetsContent,
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