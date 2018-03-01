import SignIn from '../../containers/SignIn'
import asyncSignUp from '../../async/asyncSignUp'
import asyncLogout from '../../async/asyncLogout'
import asyncAdminDashboard from '../../async/asyncAdminDashboard'
import asyncValidateAccount from '../../async/asyncValidateAccount'
import asyncForgotPassword from '../../async/asyncForgotPassword'

const routes = [
  {
    path: '/',
    component: SignIn,
    exact: true,
    private: false
  },
  {
    path: '/signUp',
    component: asyncSignUp,
    exact: false,
    private: false
  },
  {
    path: '/validateAccount',
    component: asyncValidateAccount,
    exact: false,
    private: false
  },
  {
    path: '/forgotPassword',
    component: asyncForgotPassword,
    exact: false,
    private: false
  },
  {
    path: '/app',
    component: asyncAdminDashboard,
    exact: false,
    private: false
  },
  {
    path: '/logout',
    component: asyncLogout,
    exact: false,
    private: false
  }
]

export default routes