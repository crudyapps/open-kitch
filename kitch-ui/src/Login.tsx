import React from "react";
import { render } from "react-dom"

function Login() {
    const maxTries = 5;
    const url = new URL(window.location.href);
    const tries = url.searchParams.get('tries');
    const remainingTries = tries ? maxTries - parseInt(tries) : maxTries;
    const getRemainingTriesNotice = () => {
        if (remainingTries !== maxTries) {
            return <div style={{ textAlign: "center" }}>{`You have ${remainingTries} more tries`}</div>;
        }
        return null;
    }
    if (remainingTries <= 0) {
        return (
            <div className="container">
                <div className="main">
                    <div className="top-space"></div>
                    <form className="login-form" action="/login" method="POST">
                        <div className="message">
                            <div className="welcome">Welcome Back</div>
                            <div className="appname">Open Kitchen</div>
                        </div>
                        <div className="message">
                            You have exceeded maximum tries to provide the correct user id and password (try again in 5 minutes)
                        </div>
                    </form>
                    <div></div>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="main">
                <div className="top-space"></div>
                <form className="login-form" action="/login" method="POST">
                    <div className="message">
                        <div className="welcome">Welcome Back</div>
                        <div className="appname">Open Kitchen</div>
                    </div>
                    <div className="input-box">
                        <i className="material-icons">person</i>
                        <input style={{ padding: "0.8em", flex: "1 0" }} id="id" name="id" defaultValue="anon" type="text"></input>
                    </div>
                    <div className="input-box">
                        <i className="material-icons">lock</i>
                        <input style={{ padding: "0.8em", flex: "1 0" }} placeholder="enter your password" id="password"
                            name="password" type="password"></input>
                    </div>
                    {getRemainingTriesNotice()}
                    <div className="submit-block">
                        <input type="submit" defaultValue="login" />
                    </div>
                </form>
                <div></div>
            </div>
        </div>
    )
}

render(<Login />, document.getElementById("app"));