import React from "react";
import Layout from "./Layout";
import { useHistory, Link } from "react-router-dom";


function NotFound() {
    const history = useHistory();
    const handleNavigateToMenuItems = () => {
        history.push("/menuItems");
        return false;
    }
    return (
        <Layout>
            <div className="not-found">
                <div> Link Not Found </div>
                <div> Go home page <Link to="/menuItems">Menu Items</Link></div>
            </div>
        </Layout>
    );
}

export default NotFound;