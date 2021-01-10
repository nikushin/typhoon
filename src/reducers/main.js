const updateMain = (state, action) => {
    if (state === undefined) {
        return {
            value: 100,
            globalColor: {color: `247, 223, 79`,
            st: {r: 247, g: 223, b: 79, a: 1}},
            connectStatus: false,
            route: {
                // mainMenu:'home',
                mainMenu:'settings',
                homePageMode: 'realtime',
                // homePageMode: 'history'
            }
        };
    }
    switch (action.type) {

        case 'MEMORY_INIT' :
            state.graphKeeper.roast_mode_auto = action.payload.retain.roast_mode_auto;
            state.analogParametersKeeper.heat_manual_sp = action.payload.retain.heat_manual_sp;
            state.analogParametersKeeper.vds_manual_sp = action.payload.retain.vds_manual_sp;
            state.graphSettingsKeeper.step = action.payload.retain.step;
            state.analogParametersKeeper.vds_prepare_fr = action.payload.retain.vds_prepare_fr;
            state.analogParametersKeeper.cooling_time = action.payload.retain.cooling_time;
            state.analogParametersKeeper.rest_of_cooling_time = action.payload.retain.cooling_time;
            state.analogParametersKeeper.temp_prepare_sp = action.payload.retain.temp_prepare_sp;
            return {...state.mainKeeper};

        case 'CHANGE_PAGE':
            return {
                ...state.mainKeeper,
                route: {...state.mainKeeper.route,
                [action.payload[0]]: action.payload[1]}
            };

        case 'CONNECT_STATUS':
            return {
                ...state.mainKeeper,
                connectStatus: action.payload,
            };

        case 'CHANGE_VALUE':
            return {
                ...state.mainKeeper,
                value: action.payload,
            };

        case 'CHANGE_GLOBAL_COLOR':
            const r = action.payload.rgb.r;
            const g = action.payload.rgb.g;
            const b = action.payload.rgb.b;
            console.log(state.mainKeeper.globalColor.st);
            return {
                ...state.mainKeeper,
                globalColor: {color: `${r}, ${g}, ${b}`,
                st: action.payload.rgb}
            };


        default:
            return state.mainKeeper;
    }
};

export default updateMain;
