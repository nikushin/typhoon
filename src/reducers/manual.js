import socketService from "../services/socket-service";

const Manual = (state, action) => {

    if (state === undefined) {
        return {
            on: false,
            vds: false,
            heat: false,
            cooler: false,
            blades: false,
            vds_fr: 0,
            temp_sp: 0,
        }
    }


    switch (action.type) {

        case 'MANUAL_SWITCH_REQUEST':
            socketService.SocketEmmit('memory_change', {manual:{switch: action.payload}});
            return {...state.ManualKeeper};

        default:
            return state.ManualKeeper;
    }
};

export default Manual;