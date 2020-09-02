import React from 'react';
import './header.css';
import { Button } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button className="buttonMenu" icon="home" text="Home" />
          </Link>

          <Link to="/settings" style={{ textDecoration: 'none' }}>
            <Button className="buttonMenu" icon="settings" text="Settings" />
          </Link>

          <Link to="/manual" style={{ textDecoration: 'none' }}>
            <Button className="buttonMenu" icon="manual" text="Manual" />
          </Link>
          {/*<div className="recipe-bar">*/}
            {/*    Header*/}
            {/*</div>*/}
        </div>
    );
};

export default Header;
