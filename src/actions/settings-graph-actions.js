import store from '../store';
import socketService from '../services/socket-service'

export const RoastRealTimeParameters = (data) => {
  store.dispatch({type: 'ROAST_REAL_TIME_PARAMETERS', payload: data});
};

export const ChangeStep = (step) => {
  return {
    type: 'CHANGE_STEP',
    payload: step
  }};

export const SettingsCursorManual = (y) => {
  return {
    type: 'SETTING_CURSOR_MANUAL',
    payload: y
  }};

export const SettingsCursorGoUp = () => {
  return {
    type: 'SETTING_CURSOR_UP'
  }};

export const SettingsCursorGoDown = () => {
  return {
    type: 'SETTING_CURSOR_DOWN'
  }};

export const SettingsCursorGoLeft = () => {
  return {
    type: 'SETTING_CURSOR_LEFT'
  }};


export const SettingsCursorGoRight = () => {
  return {
    type: 'SETTING_CURSOR_RIGHT'
  }};

export const SettingsCursorAline = () => {
  return {
    type: 'SETTING_CURSOR_ALINE'
  }};
