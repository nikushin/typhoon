import store from '../store';
import socketService from '../services/socket-service'

const DisplayLastRoast = () => {
  return {
    type: 'DISPLAY_LAST_ROAST'
  }};

const changeRoastMode = () => {
  return {
    type: 'CHANGE_ROAST_MODE'
  }};

const RealTimeOn = () => {
  return {
    type: 'REAL_TIME_ON'
  }};

const GraphSaveViewParameters = (value) => {
  return {
    type: 'GRAPH_SAVE_VIEW_PARAMETERS',
    payload: value
  }};

const HistoryRequestLeft = () => {
  return {
    type: 'HISTORY_REQUEST_LEFT'
    }};

const HistoryRequestRight = () => {
  return {
    type: 'HISTORY_REQUEST_RIGHT'
  }};

const HistoryRequest = (offset) => {
  return {
    type: 'HISTORY_REQUEST',
    payload: offset
  }};

const HistoryDisplay = () => {
  return {
    type: 'HISTORY_DISPLAY'
  }};

const OneStoryRequest = (id) => {
  return {
    type: 'ONE_STORY_REQUEST',
    payload: id
  }};

const OneStoryAnswer = (graph) => {
  store.dispatch({type: 'ONE_STORY_ANSWER', payload: graph});
};

const HistoryAnswer = (value) => {
  store.dispatch({type: 'HISTORY_ANSWER', payload: value});
  };

const GraphAdd = (value) => {
  store.dispatch({type: 'GRAPH_ADD_TEMP', payload: value});
};

const GraphSaveAnswer = (value) => {
  store.dispatch({type: 'GRAPH_SAVE_ANSWER', payload: value});
};

const RoastFinish = (value) => {
  store.dispatch({type: 'GRAPH_ROAST_FINISH', payload: value});
  store.dispatch({type: 'DISPLAY_LAST_ROAST', payload: value});
  store.dispatch({type: 'CLEAR_GRAPH', payload: value});
};

const RoastStart = (value) => {
  store.dispatch({type: 'GRAPH_ROAST_START', payload: value});
};

export {
  GraphAdd,
  GraphSaveViewParameters,
  GraphSaveAnswer,
  HistoryRequest,
  HistoryAnswer,
  OneStoryRequest,
  OneStoryAnswer,
  RealTimeOn,
  DisplayLastRoast,
  RoastFinish,
  RoastStart,
  HistoryRequestLeft,
  HistoryRequestRight,
  HistoryDisplay,
  changeRoastMode
};
