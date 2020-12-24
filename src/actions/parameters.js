import store from '../store';


export const VdsSwitch = () => {
  return {type: 'VDS_SWITCH'};
};

export const ReceiveVdsStatusFeedBack  = (data) => {
    store.dispatch({type: 'RECEIVE_VDS_STATUS_FEEDBACK', payload: data});
};

export const ReceiveVdsFrFeedBack  = (data) => {
    store.dispatch({type: 'RECEIVE_VDS_FR_FEEDBACK', payload: data});
};