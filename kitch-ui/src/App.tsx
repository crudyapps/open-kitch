import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Cookies from 'universal-cookie';
import MenuItemsPage from "./MenuItemsPage";
import OrderPage from "./OrderPage";
import NotFound from "./NotFound";

const isLoggedIn = () => {
    let accessToken = window.sessionStorage.getItem("access_token");
    if (accessToken) {
        return true;
    }
    const cookies = new Cookies(document.cookie);
    accessToken = cookies.get("__Secure-access_token");
    if (accessToken === undefined || accessToken === null) {
        return false;
    }
    window.sessionStorage.setItem("access_token", accessToken);
    return true;
}

const App = () => {
    const routes = [{ path: "/menuItems", component: MenuItemsPage }, { path: "/orders", component: OrderPage }];
    const getDefaultRoute = () => {
        const { pathname, search } = window.location;

        if (pathname === '/' && (!search || search.length <= 0)) {
            return (<Redirect to="/menuItems" />);
        }

        return (<NotFound />);
    }

    return (
        <BrowserRouter>
            <Switch>
                {routes.map((route, index) => <Route key={index} {...route} />)}
                <Route render={() => getDefaultRoute()} />
            </Switch>
        </BrowserRouter>
    )
}

if (!isLoggedIn()) {
    document.location.href = `${document.location.origin}/login.html`;
}
else {
    render(<App />, document.getElementById('app'));
}