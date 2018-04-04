import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropsRoute from './PropsRoute'
import NotFound from '../../components/NotFound'

// TODO: Enable PrivateRoute if route if private

const GenerateRoutes = ({ routes, rootPath, withNotFound, data }) => {
  let r = routes.map(({ exact, path, component }, i) => {
    if (typeof (data) === 'object') {
      return (
        <PropsRoute
          exact={exact}
          component={component}
          key={i}
          {...data}
          path={
            typeof (rootPath) === "string"
              ? path === '/'
                ? rootPath
                : rootPath + path
              : path
          } />
      )
    }
    else {
      return (
        <Route
          exact={exact}
          component={component}
          key={i}
          path={
            typeof (rootPath) === "string"
              ? path === '/'
                ? rootPath
                : rootPath + path
              : path
          } />
      )
    }
  });

  withNotFound && r.push(
    <Route key={routes.length + 1} render={() => <NotFound />} />
  )

  return (
    <Switch>
      {r}
    </Switch>
  )
}

export default GenerateRoutes