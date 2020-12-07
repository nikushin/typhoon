import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IconHomeContainer, IconSettingsContainer, IconAlarmContainer } from "./header-styled";
import {changePage} from "../../actions";

export const AlarmIcon = () => {
  const selectedMenu = useSelector(state => state.mainKeeper.route.mainMenu);
  const dispatch = useDispatch();
  return (
    <IconAlarmContainer on={selectedMenu==='test'} onClick={()=>dispatch(changePage('mainMenu', 'test'))}>
      <svg viewBox="0 0 90 90">
        <path d="M42.41,64.89A2.58,2.58,0,0,1,45,62.16a2.73,2.73,0,0,1,0,5.45A2.57,2.57,0,0,1,42.41,64.89Zm1.1-6.28-.62-21.08h4.22l-.62,21.08Z"/>
        <polygon points="8.5 75.5 81.5 75.5 45.5 11.5 8.5 75.5"/>
      </svg>
      <div/>
    </IconAlarmContainer>
  )
};

export const HomeIcon = () => {
  const selectedMenu = useSelector(state => state.mainKeeper.route.mainMenu);
  const dispatch = useDispatch();
  return (
    <IconHomeContainer on={selectedMenu==='home'} onClick={()=>dispatch(changePage('mainMenu', 'home'))}>
    <svg viewBox="0 0 90 90">
        <path d="M8.3,46.89,42.85,13.07a3.37,3.37,0,0,1,4.27,0L81.7,47.23"/>
        <path d="M17.37,52.49V75a2.72,2.72,0,0,0,2.72,2.73H33.44A2.73,2.73,0,0,0,36.17,75V55.22a2.72,2.72,0,0,1,2.72-2.73h12a2.72,2.72,0,0,1,2.72,2.73V75a2.73,2.73,0,0,0,2.73,2.73H70A2.73,2.73,0,0,0,72.7,75V52.49"/>
    </svg>
    <div/>
    </IconHomeContainer>
  )
};

export const SettingsIcon = () => {
  const selectedMenu = useSelector(state => state.mainKeeper.route.mainMenu);
  const dispatch = useDispatch();
  return (
    <IconSettingsContainer on={selectedMenu==='settings'} onClick={()=>dispatch(changePage('mainMenu', 'settings'))}>
      <svg viewBox="0 0 90 90">
        <path d="M51.87,20.9a25,25,0,0,1,2.72,1,26.84,26.84,0,0,1,2.59,1.25l4.39-4.39h0a1.67,1.67,0,0,1,2.37,0h0l7.34,7.34h0a1.67,1.67,0,0,1,0,2.37h0L66.9,32.82a26.84,26.84,0,0,1,1.25,2.59,25,25,0,0,1,.95,2.72h6.21A1.68,1.68,0,0,1,77,39.8V50.2a1.68,1.68,0,0,1-1.68,1.67H69.1a25,25,0,0,1-.95,2.72,26.84,26.84,0,0,1-1.25,2.59l4.39,4.39h0a1.67,1.67,0,0,1,0,2.37h0l-7.34,7.34h0a1.67,1.67,0,0,1-2.37,0h0L57.18,66.9a26.84,26.84,0,0,1-2.59,1.25,25,25,0,0,1-2.72.95v6.21A1.68,1.68,0,0,1,50.2,77H39.8a1.68,1.68,0,0,1-1.67-1.68V69.1a25,25,0,0,1-2.72-.95,24.68,24.68,0,0,1-2.59-1.25l-4.39,4.39h0a1.67,1.67,0,0,1-2.37,0h0l-7.34-7.34h0a1.67,1.67,0,0,1,0-2.37h0l4.38-4.39a26.84,26.84,0,0,1-1.25-2.59,25,25,0,0,1-1-2.72H14.69A1.68,1.68,0,0,1,13,50.2V39.8a1.68,1.68,0,0,1,1.68-1.67H20.9a25,25,0,0,1,1-2.72,26.84,26.84,0,0,1,1.25-2.59l-4.39-4.39h0a1.67,1.67,0,0,1,0-2.37h0l7.34-7.34h0a1.67,1.67,0,0,1,2.37,0h0l4.39,4.38a24.68,24.68,0,0,1,2.59-1.25,25,25,0,0,1,2.72-1V14.69A1.68,1.68,0,0,1,39.8,13H50.2a1.68,1.68,0,0,1,1.67,1.68V20.9Z"/>
        <path d="M45,33a11.95,11.95,0,1,1-8.46,3.5A12,12,0,0,1,45,33Z"/>
      </svg>
      <div/>
    </IconSettingsContainer>
  )
};




