import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { LoginPage } from "../pages/login/LoginPage";
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer, history } from "../ducks/rootReducer";
import { TopNavBarConnected } from "../components/TopNavBar/TopNavBarConnected";
import { PrivateRouteConnected } from "./PrivateRoute";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { UsersPage } from "../pages/users/UsersPage";
import { EditUserPage } from "../pages/editUser/EditUserPage";
import { initApiUtils } from "../api/utils";

const authState = JSON.parse(window.localStorage.getItem("authState") || `{"id": 0}`);

export const store = createStore(
    rootReducer,
    { auth: authState },
    compose(applyMiddleware(thunk, routerMiddleware(history))),
);

initApiUtils(store.dispatch, store.getState);

export function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <TopNavBarConnected />
                <Route path="/login" component={LoginPage} />
                <PrivateRouteConnected path="/users" exact component={UsersPage} />
                <PrivateRouteConnected path="/users/edit" component={EditUserPage} />
            </ConnectedRouter>
        </Provider>
    );
}
