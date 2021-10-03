import React, { ReactChildren, ReactChild } from 'react';

import "./styles.css";

interface AuxProps {
    children: ReactChild | ReactChildren;
}

const Layout = ({ children }: AuxProps) => {

    return (
        <div className="layout">
            {children}
            <div className="layout-title">
                <h1>Akaru.io</h1>
            </div>
        </div>
    )
}

export default Layout