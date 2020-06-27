import React from "react";

function Layout(props: React.PropsWithChildren<any>) {
    return (<div className="container">
        <div className="header"></div>
        <div className="body">
            {React.Children.only(props.children)}
        </div>
        <div className="footer"></div>
    </div>);
}

export default Layout;
