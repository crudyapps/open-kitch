import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Cookies from 'universal-cookie';
import MenuItemsPage from "./MenuItemsPage";
import OrderPage from "./OrderPage";
import NotFound from "./NotFound";
import getAccessToken, { saveAccessToken } from "./accessToken";

interface ApplicationContext {
    clientId: string;
};

export const AppContext = React.createContext<ApplicationContext>({
    clientId: String(Date.now()),
});

const App = () => {
    const routes = [{ path: "/menuItems", component: MenuItemsPage }, { path: "/orders", component: OrderPage }];
    const appContext: ApplicationContext = { clientId: String(Date.now()) };
    const getDefaultRoute = () => {
        const { pathname, search } = window.location;

        if (pathname === '/' && (!search || search.length <= 0)) {
            return (<Redirect to="/menuItems" />);
        }

        return (<NotFound />);
    }

    return (
        <AppContext.Provider value={appContext}>
            <BrowserRouter>
                <Switch>
                    {routes.map((route, index) => <Route key={index} {...route} />)}
                    <Route render={() => getDefaultRoute()} />
                </Switch>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

const access = getAccessToken();
if (!access || !access.token) {
    document.location.href = `${document.location.origin}/login.html`;
}
else {
    saveAccessToken(access.token);
    render(<App />, document.getElementById('app'));
}

