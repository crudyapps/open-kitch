import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Redirect, useHistory, Switch } from "react-router-dom";
import MenuItemsPage from "./MenuItemsPage";
import OrderPage from "./OrderPage";
import NotFound from "./NotFound";

const App = () => {
    const routes = [{ path: "/menuItems", component: MenuItemsPage }, { path: "/orders", component: OrderPage }];
    const getInitialPathRedirect = () => {
        const { pathname, search } = window.location;

        const params = new URLSearchParams(search.replace("?", ""));
        const initPath = params.get('initPath');
        if (initPath?.length) {
            const decodedInitialPath = decodeURIComponent(initPath);
            return (<Redirect to={decodedInitialPath} />)
        }

        if (pathname === '/' && (!search || search.length <= 0)) {
            return (<Redirect to="/menuItems" />);
        }

        return (<NotFound />);
    }

    return (
        <BrowserRouter>
            <Switch>
                {routes.map((route, index) => <Route key={index} {...route} />)}
                <Route render={() => getInitialPathRedirect()} />
            </Switch>
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('app'));