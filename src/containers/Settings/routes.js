import React from 'react'

const MonkComponent1 = () => <div><h1> Mock1 </h1></div>
const MonkComponent2 = () => <div><h1> Mock2 </h1></div>
const MonkComponent3 = () => <div><h1> Mock3 </h1></div>
const MonkComponent4 = () => <div><h1> Mock4 </h1></div>
const MonkComponent5 = () => <div><h1> Mock5 </h1></div>

const routes = [
  {
    path: '/',
    name: 'Entity',
    component: MonkComponent1,
    exact: true
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: MonkComponent3,
    exact: false
  },
  {
    path: '/supervision',
    name: 'Supervision',
    component: MonkComponent4,
    exact: false
  },
  {
    path: '/security',
    name: 'Security',
    component: MonkComponent1,
    exact: false
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: MonkComponent2,
    exact: false
  },
  {
    path: '/display',
    name: 'Display',
    component: MonkComponent5,
    exact: false
  }
]

export default routes