 import socketService from "../services/socket-service";

const KeyboardDisplay = (state, action) => {

    if (state === undefined) {
        return {
            num: {
                show: false,
                // parameter: '',
                // keeper: '',
                type: 'simple',
                startValue: '',
                top: 0,
                left: 0,
                min: 0,
                max: 100,
                func: undefined,
            },
            letter: {
                show: false,
                parameter: '',
                keeper: '',
                value: '',
            }
        }
    }


    switch (action.type) {

    case 'HIDE_KEYBOARD':
            return {...state.KeyboardDisplayKeeper,
                num: {...state.KeyboardDisplayKeeper.num, show: false}
            };

        // case 'SHOW_KEYBOARD':
        //       return {...state.KeyboardDisplayKeeper,
        //           num: {...state.KeyboardDisplayKeeper.num, show: true}
        //       };

        case 'SHOW_KEYBOARD':
            return {...state.KeyboardDisplayKeeper,
                num: {...state.KeyboardDisplayKeeper.num,
                    func: action.payload.func, type :action.payload.type,
                    startValue: action.payload.startValue,
                    top: action.payload.top, left: action.payload.left,
                    min: action.payload.min, max: action.payload.max,
                    show: true}
            };

      case 'NEW_VALUE_KEYBOARD':
          state[action.payload.keeper][action.payload.parameter] = action.payload.value;
          // console.log(action.payload);
          if (action.payload.keeper === 'ManualKeeper') { 
              socketService.SocketEmmit('memory_change', {manual: {[action.payload.parameter]: action.payload.value}});
          } else {
              socketService.SocketEmmit('memory_change', {[action.payload.parameter]: action.payload.value});
          }
          return {...state.KeyboardDisplayKeeper};

        case 'SHOW_KEYBOARD_LETTER':
            return {
                ...state.KeyboardDisplayKeeper,
                letter: {
                    ...state.KeyboardDisplayKeeper.letter,
                    parameter: action.payload.parameter,
                    keeper: action.payload.keeper,
                    value: state[action.payload.keeper][action.payload.parameter],
                    show: true
                }
            };

        case 'NEW_VALUE_KEYBOARD_LETTER':
            state[state.KeyboardDisplayKeeper.letter.keeper]
              [state.KeyboardDisplayKeeper.letter.parameter] = action.payload;
            return {
                ...state.KeyboardDisplayKeeper,
                letter: {
                    ...state.KeyboardDisplayKeeper.letter,
                    show: false
                }
            };

        default:
            return state.KeyboardDisplayKeeper;
    }
};

export default KeyboardDisplay;
