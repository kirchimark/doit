import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import { createStore,  combineReducers, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory';
import {Route, Switch, Link } from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware, push, goBack} from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import AuthUser from './containers/AuthUser';
import Map from './containers/Map';

const history = createHistory();
const routerMiddle = routerMiddleware(history)


let AppReducers = combineReducers({
    ...reducers,
    router: routerReducer,
});

let store = createStore(AppReducers, compose(applyMiddleware(thunk ,routerMiddleware(history))));

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ConnectedRouter history={history}>
                <Switch>
                    <Route path='/' exact component={AuthUser}/>
                    <Route path='/map' exact component={Map} />
                </Switch>
            </ConnectedRouter>)
    }
}

const LayoutRedux = connect((state) => ({}) ,(dispatch) => ({}))(Layout)

ReactDOM.render(
        <Provider store={store}>
            <LayoutRedux />
        </Provider>,
document.getElementById('app'));