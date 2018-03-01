import React from 'react';
import { Route } from 'react-router-dom';

// TODO: Enable PrivateRoute if route if private

const generateRoutes = ({routes, rootPath}) => {
  return routes.map(({exact, path, component}, i) => {
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
}

export default generateRoutes;