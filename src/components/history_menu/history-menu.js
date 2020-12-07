import {useDispatch, useSelector} from "react-redux";
import React, {memo, useState} from "react";
import {HistoryRequest, OneStoryRequest, RealTimeOn,
  DisplayLastRoast, HistoryRequestLeft, HistoryRequestRight, HistoryDisplay} from '../../actions/graph'
import {Container, OneStoryContainer, StoriesContainer} from './history-menu-styled'
import {showKeyboard, hideKeyboard} from "../../actions";

const HistoryMenu = () => {

  const dispatch = useDispatch();
  const history = useSelector(state => state.graphKeeper.history);
  const history_display = useSelector(state => state.graphKeeper.history_display);
  const history_offset = useSelector(state => state.graphKeeper.history_request_offset);

  const chooseNumberOfPage = () => {
    dispatch(showKeyboard({startValue: (history_offset + 1), min: 1, max:Math.ceil(history.count/10),
      top: 300, left: 1200, func: (input) => {dispatch(HistoryRequest(input-1))}}));
  };

  const DisplayHistory = history.history.map((oneStory) =>
    <OneStoryContainer onClick={() => dispatch(OneStoryRequest(oneStory.id))}>
      <div><div>{'#' + oneStory.id}</div><div>{oneStory.name}</div></div>
      <div><div>{oneStory.date.slice(0, 10)}</div><div>{oneStory.date.slice(11, 19)}</div></div>
    </OneStoryContainer>
  );
  // oneStory.date.slice(0, 19).replace('T', ' ')
  return(
    <Container>
      <div>Обжарок: {history.count}</div>
      <div>
        <div onClick={() => {dispatch(HistoryRequest(history_offset-1))}}>{'<'}</div>
        <div onClick={() => chooseNumberOfPage()}>{(history_offset+1) + " / " + Math.ceil(history.count/10)}</div>
        <div onClick={() => {dispatch(HistoryRequest(history_offset+1))}}>{'>'}</div>
      </div>
      <div>{DisplayHistory}</div>
      {/*<button onClick={() => {dispatch(HistoryDisplay()); dispatch(HistoryRequest())}}>load history</button>*/}
      {/*<button onClick={() => dispatch(RealTimeOn())}>real time</button>*/}
      {/*<button onClick={() => dispatch(DisplayLastRoast())}>last roast</button>*/}
      {/*<StoriesContainer visible={history_display}>*/}
      {/*  {DisplayHistory}*/}
      {/*  <OneStoryContainer>{(history.count - history_offset - 3) > 0 ? (history.count - history_offset - 3) : 0} - {history.count - history_offset}</OneStoryContainer>*/}
      {/*  <button onClick={() => {dispatch(HistoryRequestLeft()); dispatch(HistoryRequest())}}> left </button>*/}
      {/*  <button onClick={() => {dispatch(HistoryRequestRight()); dispatch(HistoryRequest())}}> right </button>*/}
      {/*</StoriesContainer>*/}
    </Container>

  )};

export default memo(HistoryMenu);
