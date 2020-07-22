import {initValue, ConnectStatus} from "../actions";
import openSocket from "socket.io-client";
const socket = openSocket('http://localhost:8080', {transports: ['websocket']});

class SocketService{

    SocketSendMessage (data) {
        socket.emit("msg", [data[0], data[1]]);
    };

    socketCreat() {
        socket.on('init', (data) => {
            console.log(data);
            initValue(data);
        });

        socket.on('connect', () => {
            ConnectStatus(true);
        });

        socket.on('disconnect', () => {
            ConnectStatus(false);
        });
    };



}

const socketService = new SocketService();
socketService.socketCreat();

export default socketService
