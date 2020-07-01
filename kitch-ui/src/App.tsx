import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Redirect, useHistory, Switch } from "react-router-dom";
import MenuItemsPage from "./MenuItemsPage";
import OrderPage from "./OrderPage";
import NotFound from "./NotFound";

const App = () => {
    const getInitialPathRedirect = () => {
        const { search } = window.location;

        const params = new URLSearchParams(search.replace("?", ""));
        const initPath = params.get('initPath');
        if (initPath?.length) {
            const decodedInitialPath = decodeURIComponent(initPath);
            return (<Redirect from="/" to={decodedInitialPath} />)
        }
        return (<Redirect exact from="/" to="/menuItems" />);
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/menuItems" component={MenuItemsPage} />
                <Route path="/orders" component={OrderPage} />
                <Route path="/orders/:orderId" component={OrderPage} />
                {
                    getInitialPathRedirect()
                }
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('app'));