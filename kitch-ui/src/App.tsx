import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import MenuItemsPage from "./MenuItemsPage";
import OrderPage from "./OrderPage";

const App = () => {
    const { search, pathname } = window.location;
    const params = new URLSearchParams(search.replace("?", ""))

    const initPath = params.get('initPath');
    return (
        <BrowserRouter>
            <Route path="/menuItems" component={MenuItemsPage} />
            <Route path="/orders" component={OrderPage} />
            <Route path="/orders/:orderId" component={OrderPage} />
            {initPath?.length ? (<Redirect push to={initPath} />) : null}
            {pathname === '/' ? (<Redirect push to={"/menuItems"} />) : null}
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('app'));