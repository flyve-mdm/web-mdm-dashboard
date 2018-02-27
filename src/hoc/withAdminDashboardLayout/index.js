import React from 'react';
import SplitView from "../../components/SplitView"

const withAdminDashboardLayout = WrappedComponent=> {
  const adminDashboardLayout = props => {
      return (
        <React.Fragment>
          <SplitView/>
          <WrappedComponent {...props} />
        </React.Fragment>
      )
  }

  return adminDashboardLayout
}

export default withAdminDashboardLayout;