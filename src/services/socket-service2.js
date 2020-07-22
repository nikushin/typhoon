import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import openSocket from "socket.io-client";
import { changeValue } from "../actions/index"
const socket = openSocket('http://localhost:8080', {transports: ['websocket']});

const useSocketCreator = (name) => {
    const dispatch = useDispatch();
    useEffect(function() {
        socket.on(name, (value) => {
            dispatch(changeValue(value));
            socket.emit(name, "Hello too");
        });
    }, []);
};

const useSendMessage = () => {
    const send = useSelector(state => state.valueKeeper.value);
    socket.emit("msg", "i send a message");
};

const SocketIo = () => {
    useSocketCreator('msg');
    useSendMessage();
    return null
};

export default SocketIo;
