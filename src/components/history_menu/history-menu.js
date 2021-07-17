import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, memo, useLayoutEffect, useState} from "react";
import {HistoryRequest, OneStoryRequest, RealTimeOn,
DisplayLastRoast, HistoryRequestLeft, HistoryRequestRight, HistoryDisplay} from '../../actions/graph';
import {Container, OneStoryContainer, StoriesContainer} from './history-menu-styled';
import {showKeyboard, hideKeyboard} from "../../actions";
import socketService from "../../services/socket-service";

const HistoryMenu = () => {

  const dispatch = useDispatch();
  const history = useSelector(state => state.graphKeeper.history);
  const history_display = useSelector(state => state.graphKeeper.history_display);
  const history_delete_mode = useSelector(state => state.graphKeeper.history_delete_mode);
  const history_chosen_id = useSelector(state => state.graphKeeper.history_chosen_id);
  const history_bg_id = useSelector(state => state.graphKeeper.history_bg_id);
  const history_offset = useSelector(state => state.graphKeeper.history_request_offset);
  const [DisplayHistory, setDisplayHistory] = useState(null);

  const chooseNumberOfPage = () => {
    dispatch(showKeyboard({startValue: (history_offset + 1), min: 1, max:Math.ceil(history.count/10),
      top: 300, left: 1200, func: (input) => {dispatch(HistoryRequest(input-1))}}));
  };

    const OneStoryClick = (id) => {
        if (history_delete_mode) {
            if (history_chosen_id === id) {
                dispatch({type: 'HISTORY_CHOOSE_STORY', payload: 0});
            }
            socketService.SocketEmmit('delete_one_story', {id: id, offset: history_offset});
        } else {
            dispatch(OneStoryRequest(id));
            dispatch({type: 'HISTORY_CHOOSE_STORY', payload: id});
        }
    };

    useLayoutEffect(() => {
        if (history.count === 0) {
            setDisplayHistory(<div>История отсутствует</div>)
        } else {
            setDisplayHistory(
                <Fragment>
                    <div>
                        <div onClick={() => {dispatch({type: 'HISTORY_DELETE_MODE'})}}>Delete mode</div>
                        <div onClick={() => {dispatch({type: 'HISTORY_SET_BACKGROUND'})}}>Set Background</div>
                    </div>
                    <div>
                  <div onClick={() => {dispatch(HistoryRequest(history_offset-1))}}>{'<'}</div>
                  <div onClick={() => chooseNumberOfPage()}>{(history_offset+1) + " / " + Math.ceil(history.count/10)}</div>
                  <div onClick={() => {dispatch(HistoryRequest(history_offset+1))}}>{'>'}</div>
                    </div>
                <div> {history.history.map((oneStory) =>
                    <OneStoryContainer history_delete_mode={history_delete_mode} chosen={history_chosen_id===oneStory.id}
                                       bg={history_bg_id===oneStory.id} onClick={() => OneStoryClick(oneStory.id)}>
                        <div><div>{'#' + oneStory.id}</div><div>{oneStory.name}</div></div>
                        <div><div>{oneStory.date.slice(0, 10)}</div><div>{oneStory.date.slice(11, 19)}</div></div>
                    </OneStoryContainer>
                )}
                </div>
                </Fragment>
            )
         }
        },[history, history_delete_mode, history_chosen_id, history_bg_id]);

  // oneStory.date.slice(0, 19).replace('T', ' ')
  return(
    <Container history_delete_mode={history_delete_mode} bg={history_bg_id !== 0}>
      <div>Обжарок: {history.count}</div>
       {DisplayHistory}
      {/*<div>*/}
      {/*  <div onClick={() => {dispatch(HistoryRequest(history_offset-1))}}>{'<'}</div>*/}
      {/*  <div onClick={() => chooseNumberOfPage()}>{(history_offset+1) + " / " + Math.ceil(history.count/10)}</div>*/}
      {/*  <div onClick={() => {dispatch(HistoryRequest(history_offset+1))}}>{'>'}</div>*/}
      {/*</div>*/}
      {/*<div>{DisplayHistory}</div>*/}
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
