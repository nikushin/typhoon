import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {HeaderContainer, HeaderContainerInner, RecipeContainer} from './header-styled'
import {changePage} from '../../actions/index'
import {HomeIcon, SettingsIcon, AlarmIcon} from "./icons";

const Header = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.recipeKeeper.name);

    return (
        <HeaderContainer>
          <HeaderContainerInner>
          <RecipeContainer>
            {name}
          </RecipeContainer>
          <div>
            <AlarmIcon onClick={()=>dispatch(changePage('mainMenu', 'test'))}/>
            <HomeIcon onClick={()=>dispatch(changePage('mainMenu', 'home'))}/>
            <SettingsIcon onClick={()=>dispatch(changePage('mainMenu', 'settings'))}/>
          </div>
          </HeaderContainerInner>
        </HeaderContainer>
    );
};

export default Header;
