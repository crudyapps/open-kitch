import React from "react";
import { useLocation, useHistory } from "react-router-dom";

function Layout(props: React.PropsWithChildren<any>) {
    const location = useLocation();
    const history = useHistory();
    const navItems = [{
        text: "Menu Items",
        path: "/menuItems",
        selectionClassName: location.pathname.indexOf("menuItems") >= 0 ? "selected" : ""
    }, {
        text: "Order",
        path: "/orders",
        selectionClassName: location.pathname.indexOf("order") >= 0 ? "selected" : ""
    }]

    const handleNavigation = (path: string) => {
        history.push(path);
    }

    return (<div className="container">
        <div className="header">
            <div className="left">
                {
                    navItems.map((navItem, index) =>
                        (
                            <div key={`ni-${index}`} onClick={() => handleNavigation(navItem.path)} className={`navItem ${navItem.selectionClassName}`} >{navItem.text}</div>
                        ))
                }
            </div>
            <div className="right">It's me</div>
        </div>
        <div className="body">
            {React.Children.only(props.children)}
        </div>
        <div className="footer"></div>
    </div >);
}

export default Layout;
