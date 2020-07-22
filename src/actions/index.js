import store from '../store';

const changeGlobalColor = (color) => {
  return {
    type: 'CHANGE_GLOBAL_COLOR',
    payload: color
  };
};

const setKeyboardParameter = (value) => {
  return {
    type: 'NEW_VALUE_KEYBOARD',
    payload: value
  };
};

const setBoolParameter = () => {
  return {
    type: 'BOOL_CHANGE'
  };
};

const showKeyboard = (parameter) => {
  return {
    type: 'SHOW_KEYBOARD',
    payload: parameter
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

const changeValue = (value) => {
  store.dispatch({type: 'CHANGE_VALUE', payload: value});
};

const initValue = (value) => {
  store.dispatch({type: 'VALUE_INIT', payload: value});
};

const ConnectStatus = (value) => {
  store.dispatch({type: 'CONNECT_STATUS', payload: value});
};


export {
  changeValue,
  showKeyboard,
  hideKeyboard,
  sendMessage,
  setKeyboardParameter,
  setBoolParameter,
  changeGlobalColor,
  initValue,
  ConnectStatus
};
