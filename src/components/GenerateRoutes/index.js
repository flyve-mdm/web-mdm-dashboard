import React from 'react';
import { Route } from 'react-router-dom';

// TODO: Enable PrivateRoute if route if private

const generateRoutes = ({routes, rootPath, withNotFound}) => {
  let r = routes.map(({exact, path, component}, i) => {
    return <Route
      exact={exact}
      path={
        typeof(rootPath) === "string" 
          ? path === '/'
            ? rootPath
            : rootPath + path
          : path
      }
      component={component}
      key={i} />
    }
  )

  // withNotFound && r.push(
  //   <Route key={routes.length + 1} render={() => <h1 style={{textAlign: 'center'}}>Not Found</h1>} />
  // )

  return r
}

export default generateRoutes;