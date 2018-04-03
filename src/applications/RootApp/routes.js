import SignIn from '../../containers/SignIn'
import asyncSignUp from '../../async/asyncSignUp'
import asyncAdminDashboard from '../../async/asyncAdminDashboard'
import asyncValidateAccount from '../../async/asyncValidateAccount'
import asyncForgotPassword from '../../async/asyncForgotPassword'
import asyncResetPassword from '../../async/asyncResetPassword'

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
    path: '/resetPassword',
    component: asyncResetPassword,
    exact: false,
    private: false
  },
  {
    path: '/app',
    component: asyncAdminDashboard,
    exact: false,
    private: false
  }
]

export default routes