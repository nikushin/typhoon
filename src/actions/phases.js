import store from '../store';
import socketService from '../services/socket-service'

const SetPhasesStatus = (value) => {
  store.dispatch({type: 'CHANGE_PHASE', payload: value});
  // if (value.roast === true) {
  //   store.dispatch({type: 'GRAPH_ROAST_START'});
  // }

};

export {
  SetPhasesStatus
};
