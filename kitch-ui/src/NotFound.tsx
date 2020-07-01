import React from "react";
import Layout from "./Layout";


function NotFound() {
    return (
        <Layout>
            <div className="not-found">
                <div> Link Not Found </div>
                <div> Go back to <a href="/menuItems">menu items</a></div>
            </div>
        </Layout>
    );
}

export default NotFound;