import { combineReducers } from "redux";
import { authReducer, AuthState } from "./auth/auth";
import { alertReducer, AlertState } from "./alert/alert";
import { createBrowserHistory } from "history";
import { connectRouter, RouterState } from "connected-react-router";
import { usersReducer, UsersState } from "./users/users";

export const history = createBrowserHistory();

export interface State {
    auth: AuthState;
    alert: AlertState;
    router: RouterState;
    users: UsersState;
}

export const rootReducer = combineReducers<State>({
    auth: authReducer,
    alert: alertReducer,
    users: usersReducer,
    router: connectRouter(history),
});
