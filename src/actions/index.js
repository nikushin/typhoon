import store from '../store';
import socketService from '../services/socket-service'

const testGpioButton = () => {
  return {
    type: 'TEST_GPIO_BUTTON'
  };
};


const testDispatch = () => {
  return {
    type: 'TEST'
  };
};

const changePage = (menu, page) => {
  return {
    type: 'CHANGE_PAGE',
    payload: [menu, page]
  };
};

const changePhase = () => {
  return {
    type: 'CHANGE_PHASE'
  };
};

const changeGlobalColor = (color) => {
  return {
    type: 'CHANGE_GLOBAL_COLOR',
    payload: color
  };
};


const setBoolParameter = () => {
  return {
    type: 'BOOL_CHANGE'
  };
};

const setKeyboardParameter = (data) => {
  return {
    type: 'NEW_VALUE_KEYBOARD',
    payload: data
  };
};

const setKeyboardLetterParameter = (value) => {
  return {
    type: 'NEW_VALUE_KEYBOARD_LETTER',
    payload: value
  };
};

const showKeyboard = (data) => {
  return {
    type: 'SHOW_KEYBOARD',
    payload: data
  };
};

const showKeyboardLetter = (parameter, keeper) => {
  return {
    type: 'SHOW_KEYBOARD_LETTER',
    payload: {parameter : parameter, keeper : keeper}
  };
};

const hideKeyboard = () => {
  return {
    type: 'HIDE_KEYBOARD'
  };
};

const sendMessage = () => {
  return {
    type: 'SEND_MESSAGE'
  };
};

const IncrementValue = (value) => {
  store.dispatch({type: 'INCREMENT_VALUE', payload: value});
};

const changeValue = (value) => {
  store.dispatch({type: 'CHANGE_VALUE', payload: value});
};

const initValue = (value) => {
  store.dispatch({type: 'VALUE_INIT', payload: value});
};

const RecipeInit = (value) => {
  store.dispatch({type: 'RECIPE_INIT', payload: value});
};

const memoryInit = (memory) => {
  store.dispatch({type: 'MEMORY_INIT', payload: memory});
};

const ConnectStatus = (value) => {
  store.dispatch({type: 'CONNECT_STATUS', payload: value});
  if (value === false) {store.dispatch({type: 'CLEAR_GRAPH'});}
};

export {
  testDispatch,
  changeValue,
  showKeyboard,
  hideKeyboard,
  sendMessage,
  setKeyboardParameter,
  setBoolParameter,
  changeGlobalColor,
  initValue,
  RecipeInit,
  ConnectStatus,
  IncrementValue,
  showKeyboardLetter,
  setKeyboardLetterParameter,
  changePage,
  memoryInit,
  testGpioButton
};
