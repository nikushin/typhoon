import React from 'react';
import GraphMain from "../components/graph";
import HistoryMenu from '../components/history_menu/history-menu'
import {HomePageContainer, HistoryIconContainer, RoastModeContainer, VidgetContainer,
  RealTimeContainer, SliderContainer, StepsContainer} from "./styled-home-pages";
import {Slider, SliderHeat} from "../components/slider/slider";
import {HistoryIcon} from "./icons";
import {useDispatch, useSelector} from "react-redux";
import {changePage} from "../actions";
import {changeRoastMode, HistoryRequest, RealTimeOn} from "../actions/graph";
import VidgetInputOutput from "../components/vidget-input-output";
import StepsIndicator from '../components/steps-indicator'

const HomePage = () => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector(state => state.mainKeeper.route.homePageMode);
  const roast_mode_auto = useSelector(state => state.graphKeeper.roast_mode_auto);

  const changeHistoryMode = () => {
    if (selectedMenu === 'history') {
      dispatch(changePage('homePageMode', 'realtime'))
      dispatch(RealTimeOn())
    } else {
      dispatch(changePage('homePageMode', 'history'));
      dispatch(HistoryRequest())
    }
  };

  const choosePage = () => {
    switch (selectedMenu) {
      case 'history': return <div>
        <HistoryMenu/>
      </div>;
      case 'realtime': return <RealTimeContainer>
        <SliderContainer>
          <div>
            <Slider keeper={'analogParametersKeeper'} parameter={'vds_manual_sp'}
                    color={'#64c3ef'} src_img={'/img/icons/fan2.svg'}
            top={280} left={950} min={0} max={100}/>
          </div>
          <div>
            <SliderHeat keeper={'analogParametersKeeper'} parameter={'heat_power_indicator'}
                    color={'#ef1b14'} src_img={'/img/icons/fire.svg'}
                    top={370} left={950} min={0} max={100}/>
          </div>
        </SliderContainer>

        <VidgetContainer>
        <div>
          <VidgetInputOutput keeper='analogParametersKeeper' parameter='tempBeans' title='Зерно'
                             test_value = {186.7}
                             min={0} max={100} top={450} left={950} color={"rgb(17, 236, 229)"} inputMode={true}/>
        </div>
          <div>
            <VidgetInputOutput keeper='analogParametersKeeper' parameter='tempAir' title='Воздух'
                               test_value = {201.4}
                               min={0} max={100} top={450} left={950} color={"#e3e619"} inputMode={true}/>
          </div>
          <div>
            <VidgetInputOutput keeper='analogParametersKeeper' parameter='ror' title='ROR'
                               test_value = {-5.8}
                               min={0} max={100} top={450} left={950} color={"#3f99e6"} inputMode={true}/>
          </div>
        </VidgetContainer>

        <StepsContainer>
          <StepsIndicator/>
        </StepsContainer>

      </RealTimeContainer>;
      default : return <div>Something wrong!</div>
    }
  };

  return (
    <HomePageContainer>
        <div>
          <GraphMain/>
        </div>
        <div>
          <RoastModeContainer onClick={() => dispatch(changeRoastMode())}>
            {roast_mode_auto ? 'auto' : 'manual'}
          </RoastModeContainer>

          <HistoryIconContainer onClick={changeHistoryMode}>
            <HistoryIcon/>
          </HistoryIconContainer>
        </div>
      {choosePage()}
    </HomePageContainer>
  );
};

export default HomePage;
