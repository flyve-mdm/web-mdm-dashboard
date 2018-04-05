import location from '../../shared/location'
import SignIn from '../../containers/SignIn'
import asyncSignUp from '../../async/asyncSignUp'
import asyncAdminDashboard from '../../async/asyncAdminDashboard'
import asyncValidateAccount from '../../async/asyncValidateAccount'
import asyncForgotPassword from '../../async/asyncForgotPassword'
import asyncResetPassword from '../../async/asyncResetPassword'

const routes = [
  {
    path: `${location.pathname}/`,
    component: SignIn,
    exact: true,
    private: false
  },
  {
    path: `${location.pathname}/signUp`,
    component: asyncSignUp,
    exact: false,
    private: false
  },
  {
    path: `${location.pathname}/validateAccount`,
    component: asyncValidateAccount,
    exact: false,
    private: false
  },
  {
    path: `${location.pathname}/forgotPassword`,
    component: asyncForgotPassword,
    exact: false,
    private: false
  },
  {
    path: `${location.pathname}/resetPassword`,
    component: asyncResetPassword,
    exact: false,
    private: false
  },
  {
    path: `${location.pathname}/app`,
    component: asyncAdminDashboard,
    exact: false,
    private: false
  }
]

export default routes