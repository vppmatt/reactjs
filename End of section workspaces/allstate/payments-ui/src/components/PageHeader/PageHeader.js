import React from 'react';
import './PageHeader.css';
import Menu from "./Menu";
import {Link} from "react-router-dom";

const PageHeader = () => {
    return (
        <div className="pageHeader">
            <Link to="/">
                <h1>Payments Application</h1>
            </Link>
            <Menu />
        </div>);
};

export default PageHeader;
