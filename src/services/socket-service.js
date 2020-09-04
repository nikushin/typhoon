import {initValue, ConnectStatus, GraphAdd, SetPhasesStatus, IncrementValue} from "../actions";
import openSocket from "socket.io-client";
const socket = openSocket('192.168.0.120:8080', {transports: ['websocket']});

class SocketService {

    SocketEmmit (name, data) {
        socket.emit(name, data);
    };

    SocketSendMessage (data) {
        socket.emit("msg", [data[0], data[1]]);
    };

    socketCreat() {
        socket.on('init', (data) => {
            initValue(data);
            console.log('init ' + data)
        });

        socket.on('graph', (data) => {
            GraphAdd(data);
        });

        socket.on('connect', () => {
            ConnectStatus(true);
        });

        socket.on('disconnect', () => {
            ConnectStatus(false);
        });

        socket.on('phases_status', (phases_status) => {
            console.log(phases_status);
            SetPhasesStatus(phases_status);
        });

        socket.on('increment', (data) => {
            IncrementValue(data);
        });
    };
}

const socketService = new SocketService();
socketService.socketCreat();

export default socketService
