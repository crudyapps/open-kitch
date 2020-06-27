import React from "react";
import { render } from "react-dom";

const App = () => {
    return (<div className="container">
        <div className="header"></div>
        <div className="body"></div>
        <div className="footer"></div>
    </div>
    )
}

render(<App />, document.getElementById('app'));