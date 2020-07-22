const updateValue = (state, action) => {
    if (state === undefined) {
        return {
            value: 100,
            globalColor: {color: `247, 223, 79`,
            st: {r: 247, g: 223, b: 79, a: 1}},
            connectStatus: false
        };
    }
    switch (action.type) {

        case 'CONNECT_STATUS':
            return {
                ...state.valueKeeper,
                connectStatus: action.payload,
            };

        case 'CHANGE_VALUE':
            return {
                ...state.valueKeeper,
                value: action.payload,
            };

        case 'CHANGE_GLOBAL_COLOR':
            const r = action.payload.rgb.r;
            const g = action.payload.rgb.g;
            const b = action.payload.rgb.b;
            console.log(state.valueKeeper.globalColor.st);
            return {
                ...state.valueKeeper,
                globalColor: {color: `${r}, ${g}, ${b}`,
                st: action.payload.rgb}
            };


        default:
            return state.valueKeeper;
    }
};

export default updateValue;
