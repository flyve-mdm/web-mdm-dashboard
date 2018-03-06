import React from 'react'
import { Route } from 'react-router-dom'
import PropsRoute from './PropsRoute'

// TODO: Enable PrivateRoute if route if private

const GenerateRoutes = ({routes, rootPath, withNotFound, data}) => {
  let r = routes.map(({exact, path, component}, i) => {
    if (typeof(data) === 'object') {
      return (
        <PropsRoute
        exact={exact}
        component={component}
        key={i}
        data={data}
        path={
          typeof(rootPath) === "string" 
          ? path === '/'
            ? rootPath
            : rootPath + path
          : path
        }/>
      )
    }
    else {
      return (
        <Route
        exact={exact}
        component={component}
        key={i}
        path={
          typeof(rootPath) === "string" 
          ? path === '/'
            ? rootPath
            : rootPath + path
          : path
        }/>
      )
    }
  });

  // withNotFound && r.push(
  //   <Route key={routes.length + 1} render={() => <h1 style={{textAlign: 'center'}}>Not Found</h1>} />
  // )

  return r
}

export default GenerateRoutes