import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, } from "react-router-dom";
import MenuItemsPage from "./MenuItemsPage";
import OrderPage from "./OrderPage";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={MenuItemsPage} />
            <Route exact path="/menuItems" component={MenuItemsPage} />
            <Route exact path="/orders" component={OrderPage} />
            <Route exact path="/orders/:orderId" component={OrderPage} />
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('app'));