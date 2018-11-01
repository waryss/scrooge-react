import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Index from './src/components/Index';
import reducer from './src/reducer';

const store = createStore(reducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        );
    }
}
