import React from 'react'
import { NavLink } from 'react-router-dom'


const ListWithNavLinks = ({routes, rootPath, children}) => {
    return (
        <div className="layout_list_with_navlinks-block">
            <nav>
                <ul>
                    {routes.map((routes, i) => {
                        return (
                            <li key={i}>
                                <NavLink 
                                    exact
                                    to={
                                        typeof(rootPath) === "string" 
                                        ? routes.path === '/'
                                            ? rootPath
                                            : rootPath + routes.path
                                        : routes.path
                                    }
                                    activeClassName='--active'>
                                    {routes.name}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <article>
                {children}
            </article>
        </div>
    );
}

export default ListWithNavLinks