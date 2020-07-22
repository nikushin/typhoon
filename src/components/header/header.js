import React from 'react';
import './header.css';
import { Button } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
          <Link to="/">
            <Button icon="home" text="Home" />
          </Link>

          <Link to="/settings">
            <Button icon="settings" text="Settings" />
          </Link>

          <Link to="/manual">
            <Button icon="manual" text="Manual" />
          </Link>
          {/*<div className="recipe-bar">*/}
            {/*    Header*/}
            {/*</div>*/}
        </div>
    );
};

export default Header;
