import {createContext} from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import store from './store';
import socketService from './services/socket-service'

const MyContext = createContext({});


ReactDOM.render(
    <Provider store={store}>
        {/*<MyContext.Provider value={socketService}>*/}
          <Router>
              <App/>
          </Router>
        {/*</MyContext.Provider>*/}
    </Provider>,
    document.getElementById('root')
);

export {MyContext}
