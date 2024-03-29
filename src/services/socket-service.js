import {initValue, RecipeInit, memoryInit, ConnectStatus, IncrementValue, testGpioButton} from "../actions/index";
import {SetPhasesStatus} from "../actions/phases";
import {GraphAdd, HistoryAnswer, OneStoryAnswer, RoastFinish, RoastStart} from "../actions/graph";
import {RoastRealTimeParameters} from '../actions/settings-graph-actions'
import {ReceiveVdsStatusFeedBack, ReceiveVdsFrFeedBack, CoolingRealTimeParameters} from "../actions/parameters";
import openSocket from "socket.io-client";
import store from "../store";
const socket = openSocket('http://localhost:8080', {transports: ['websocket']});


class SocketService {

    SocketEmmit (name, data) {
        socket.emit(name, data);
    };

    SocketSendMessage (data) {
        socket.emit("msg", [data[0], data[1]] );
    };

    socketCreat() {

        socket.on('memory_init', (data) => {
            memoryInit(data);
        });

        socket.on('one_story_answer', (graph) => {
            OneStoryAnswer(graph);
        });

        socket.on('history_answer', (data) => {
            HistoryAnswer(data);
        });

        socket.on('init', (data) => {
            initValue(data);
            //console.log('init ' + data)
        });

        socket.on('recipe_init', (data) => {
            RecipeInit(data);
            // console.log('init ' + {data})
        });

        socket.on('every_second_data', (data) => {
            // console.log(data);
            if (data.temp) {GraphAdd(data.temp)};
            if (data.roastData) {RoastRealTimeParameters(data.roastData)}
            if (data.coolingData) {CoolingRealTimeParameters(data.coolingData)}

        });

        socket.on('connect', () => {
            ConnectStatus(true);
        });

        socket.on('disconnect', () => {
            ConnectStatus(false);
        });

        socket.on('phases_status', (phases_status) => {
            if (phases_status.roast === true && store.getState().PhasesKeeper.roast === false) {
                RoastStart()
            }

            if (phases_status.roast === false && store.getState().PhasesKeeper.roast === true) {
                RoastFinish()
            }

            SetPhasesStatus(phases_status);
        });

        socket.on('increment', (data) => {
            IncrementValue(data);
        });

        socket.on('test_button', (data) => {
            testGpioButton(data);
        });

        socket.on('vds_status_feedback', (data) => {
            ReceiveVdsStatusFeedBack(data);
        });

        socket.on('vds_fr_feedback', (data) => {
            ReceiveVdsFrFeedBack(data);
        });

        socket.on('memory_change', data => {
            // console.log('memory_change', data);
            store.dispatch({type: 'MEMORY_CHANGE', payload: data});
        });
    };
}

const socketService = new SocketService();
socketService.socketCreat();

export default socketService
