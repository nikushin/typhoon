import {useDispatch, useSelector} from "react-redux";
import React, {memo, useState} from "react";
import {HistoryRequest, OneStoryRequest, RealTimeOn,
  DisplayLastRoast, HistoryRequestLeft, HistoryRequestRight, HistoryDisplay} from '../../actions/graph'
import {OneStoryContainer, StoriesContainer} from './history-menu-styled'
// import './data-picker.css'
// import DatePicker, { registerLocale } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ru from 'date-fns/locale/ru';
// registerLocale('ru', ru);

const HistoryMenu = () => {

  const dispatch = useDispatch();
  const history = useSelector(state => state.graphKeeper.history);
  const history_display = useSelector(state => state.graphKeeper.history_display);
  const history_offset = useSelector(state => state.graphKeeper.history_request_offset);

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(null);
  // const onChange = dates => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  const DisplayHistory = history.history.map((oneStory) =>
    <OneStoryContainer onClick={() => dispatch(OneStoryRequest(oneStory.id))}>
      {history.count + " " + oneStory.id + oneStory.name + " " + oneStory.date.slice(0, 19).replace('T', ' ')}
    </OneStoryContainer>
  );

  return(
    <div>
      <button onClick={() => {dispatch(HistoryDisplay()); dispatch(HistoryRequest())}}>load history</button>
      <button onClick={() => dispatch(RealTimeOn())}>real time</button>
      <button onClick={() => dispatch(DisplayLastRoast())}>last roast</button>
      <StoriesContainer visible={history_display}>
        {DisplayHistory}
        <OneStoryContainer>{(history.count - history_offset - 3) > 0 ? (history.count - history_offset - 3) : 0} - {history.count - history_offset}</OneStoryContainer>
        <button onClick={() => {dispatch(HistoryRequestLeft()); dispatch(HistoryRequest())}}> left </button>
        <button onClick={() => {dispatch(HistoryRequestRight()); dispatch(HistoryRequest())}}> right </button>
      </StoriesContainer>
      {/*<DatePicker*/}
      {/*  selected={startDate}*/}
      {/*  onChange={onChange}*/}
      {/*  startDate={startDate}*/}
      {/*  endDate={endDate}*/}
      {/*  locale="ru"*/}
      {/*  selectsRange*/}
      {/*  inline*/}
      {/*  disabledKeyboardNavigation*/}
      {/*/>*/}
    </div>

  )};

export default memo(HistoryMenu);
