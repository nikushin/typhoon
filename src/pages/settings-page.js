import React from 'react';
import {SettingsPageContainer} from "./styled-settings-pages";

import {GraphSettings, NavigateMenu} from "../components/graph-settings";
import RecipeMenu from "../components/recipe-menu";
import ManualMenu from "../components/manual-menu";
import VidgetInputOutput from "../components/vidget-input-output";


const SettingsPage = () => {
  return (
    <SettingsPageContainer>
          <GraphSettings/>
          <NavigateMenu/>
          <div>
              <VidgetInputOutput keeper='analogParametersKeeper' parameter='cooling_time' title='Время охлаждения' type={'time'}
                                 height={160} min={0} max={300} top={450} left={950} color={"rgb(236,235,40)"} inputMode={true}/>
              <VidgetInputOutput keeper='analogParametersKeeper' parameter='vds_prepare_fr' title='ВВД при подготовке'
                                 height={160} min={0} max={100} top={450} left={950} color={"rgb(101,117,236)"} inputMode={true}/>
          </div>

        <div> <RecipeMenu/>
            <ManualMenu/>
        </div>

    </SettingsPageContainer>
  );
};

export default SettingsPage;
