import React from "react";
import { render } from "react-dom";
import Menu from "./Menu";

const App = () => {
    return (<div className="container">
        <div className="header"></div>
        <div className="body">
            <Menu />
        </div>
        <div className="footer"></div>
    </div>
    )
}

render(<App />, document.getElementById('app'));