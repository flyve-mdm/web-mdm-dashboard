import React from 'react'
import { I18n } from 'react-i18nify'
import Overview from './components/Overview'

const MonkComponent1 = () => <div><h1> Mock1 </h1></div>
const MonkComponent2 = () => <div><h1> Mock2 </h1></div>
const MonkComponent3 = () => <div><h1> Mock3 </h1></div>
const MonkComponent4 = () => <div><h1> Mock4 </h1></div>
const MonkComponent5 = () => <div><h1> Mock5 </h1></div>

const routes = [
  {
    path: '/',
    name: I18n.t('about.overview'),
    component: Overview,
    exact: true
  },
  {
    path: '/system',
    name: I18n.t('about.system_information'),
    component: MonkComponent3,
    exact: false
  },
  {
    path: '/help',
    name: I18n.t('about.help_center'),
    component: MonkComponent4,
    exact: false
  },
  {
    path: '/contact',
    name: I18n.t('about.contact'),
    component: MonkComponent1,
    exact: false
  },
  {
    path: '/release',
    name: I18n.t('about.release_notes'),
    component: MonkComponent2,
    exact: false
  },
  {
    path: '/term',
    name: I18n.t('about.term_of_use'),
    component: MonkComponent4,
    exact: false
  },
  {
    path: '/license',
    name: I18n.t('about.license'),
    component: MonkComponent5,
    exact: false
  }
]

export default routes