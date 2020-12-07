import {useDispatch, useSelector} from "react-redux";
import React, {memo} from "react";
import {Container} from './recipe-menu-styled'
import socketService from "../../services/socket-service";
import {showKeyboardLetter} from "../../actions";
import {SaveRecipe, AddRecipe} from '../../actions/recipe-action'
import {AddIcon, DeleteIcon, OkIcon, LeftIcon, RightIcon} from './icons'

const RecipeMenu = ({parameters}) => {

  const dispatch = useDispatch();
  const current = useSelector(state => state.recipeKeeper.current);
  const amount = useSelector(state => state.recipeKeeper.amount);
  const name = useSelector(state => state.recipeKeeper.name);

  const RecipeDelete = () => {
      socketService.SocketEmmit('recipe_delete');
  };

  const RecipeRight = () => {
      socketService.SocketEmmit('recipe_change', current+1);
  };

  const RecipeLeft = () => {
      socketService.SocketEmmit('recipe_change', current-1);
  };

  const showKeyBoard = () => {
    dispatch(showKeyboardLetter('name','recipeKeeper'));
  };

  return(
    <Container>
    <div onClick={showKeyBoard}>{name}</div>
      <div>
        <div>
          <div onClick={RecipeLeft}><LeftIcon/></div>
          <div>{current}</div>
          <div>{amount}</div>
          <div onClick={RecipeRight}><RightIcon/></div>
        </div>
      <div>
        <div onClick={() => dispatch(SaveRecipe())}><OkIcon/></div>
        <div onClick={RecipeDelete}><DeleteIcon/></div>
        <div onClick={() => dispatch(AddRecipe())}><AddIcon/></div>
      </div>
    </div>
    </Container>
  )};

export default memo(RecipeMenu);
