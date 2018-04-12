import publicURL from '../../shared/publicURL'
import SignIn from '../../containers/SignIn'
import asyncSignUp from '../../async/asyncSignUp'
import asyncAdminDashboard from '../../async/asyncAdminDashboard'
import asyncValidateAccount from '../../async/asyncValidateAccount'
import asyncForgotPassword from '../../async/asyncForgotPassword'
import asyncResetPassword from '../../async/asyncResetPassword'

const routes = [
  {
    path: `${publicURL}/`,
    component: SignIn,
    exact: true,
    private: false
  },
  {
    path: `${publicURL}/signUp`,
    component: asyncSignUp,
    exact: false,
    private: false
  },
  {
    path: `${publicURL}/validateAccount`,
    component: asyncValidateAccount,
    exact: false,
    private: false
  },
  {
    path: `${publicURL}/forgotPassword`,
    component: asyncForgotPassword,
    exact: false,
    private: false
  },
  {
    path: `${publicURL}/resetPassword`,
    component: asyncResetPassword,
    exact: false,
    private: false
  },
  {
    path: `${publicURL}/app`,
    component: asyncAdminDashboard,
    exact: false,
    private: false
  }
]

export default routes