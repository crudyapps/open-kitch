import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Redirect, } from "react-router-dom";
import MenuItemsPage from "./MenuItemsPage";
import OrderPage from "./OrderPage";

const App = () => {
    const params = new URLSearchParams(window.location.search.replace("?", ""))
    const initPath = params.get('initPath');
    return (
        <BrowserRouter>
            <Route exact path="/" component={MenuItemsPage} />
            <Route exact path="/menuItems" component={MenuItemsPage} />
            <Route exact path="/orders" component={OrderPage} />
            <Route exact path="/orders/:orderId" component={OrderPage} />
            {initPath?.length ? (<Redirect push to={initPath} />) : null}
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('app'));