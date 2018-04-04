import SignIn from '../../containers/SignIn'
import asyncSignUp from '../../async/asyncSignUp'
import asyncAdminDashboard from '../../async/asyncAdminDashboard'
import asyncValidateAccount from '../../async/asyncValidateAccount'
import asyncForgotPassword from '../../async/asyncForgotPassword'
import asyncResetPassword from '../../async/asyncResetPassword'

const routes = [
  {
    path: `${process.env.PUBLIC_URL}/`,
    component: SignIn,
    exact: true,
    private: false
  },
  {
    path: `${process.env.PUBLIC_URL}/signUp`,
    component: asyncSignUp,
    exact: false,
    private: false
  },
  {
    path: `${process.env.PUBLIC_URL}/validateAccount`,
    component: asyncValidateAccount,
    exact: false,
    private: false
  },
  {
    path: `${process.env.PUBLIC_URL}/forgotPassword`,
    component: asyncForgotPassword,
    exact: false,
    private: false
  },
  {
    path: `${process.env.PUBLIC_URL}/resetPassword`,
    component: asyncResetPassword,
    exact: false,
    private: false
  },
  {
    path: `${process.env.PUBLIC_URL}/app`,
    component: asyncAdminDashboard,
    exact: false,
    private: false
  }
]

export default routes