import React from 'react';
import {SettingsPageContainer} from "./styled-settings-pages";

import {GraphSettings, NavigateMenu} from "../components/graph-settings";
import RecipeMenu from "../components/recipe-menu";
import ManualMenu from "../components/manual-menu";


const SettingsPage = () => {
  return (
    <SettingsPageContainer>
        <div>
          <GraphSettings/>
          <NavigateMenu/>
        </div>
        <div>
          <RecipeMenu/>
          <ManualMenu/>
        </div>
    </SettingsPageContainer>
  );
};

export default SettingsPage;
