import store from '../store';
import socketService from '../services/socket-service'

const changePhase = () => {
  return {
    type: 'CHANGE_PHASE'
  };
};

const GraphSaveViewParameters = (value) => {
  return {
    type: 'GRAPH_SAVE_VIEW_PARAMETERS',
    payload: value
    }};

const changeGlobalColor = (color) => {
  return {
    type: 'CHANGE_GLOBAL_COLOR',
    payload: color
  };
};

const setKeyboardParameter = (value) => {
  const parameter = store.getState().KeyboardDisplayKeeper.parameter;
  socketService.SocketSendMessage([parameter, value]);
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

const IncrementValue = (value) => {
  store.dispatch({type: 'INCREMENT_VALUE', payload: value});
};


const GraphAdd = (value) => {
  store.dispatch({type: 'GRAPH_ADD_TEMP', payload: value});
};

const changeValue = (value) => {
  store.dispatch({type: 'CHANGE_VALUE', payload: value});
};

const initValue = (value) => {
  store.dispatch({type: 'VALUE_INIT', payload: value});
};

const ConnectStatus = (value) => {
  store.dispatch({type: 'CONNECT_STATUS', payload: value});
  if (value === false) {store.dispatch({type: 'CLEAR_GRAPH'});}
};

const SetPhasesStatus = (value) => {
  store.dispatch({type: 'CHANGE_PHASE', payload: value});
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
  ConnectStatus,
  GraphAdd,
  GraphSaveViewParameters,
  changePhase,
  SetPhasesStatus,
  IncrementValue
};
