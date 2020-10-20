import { Thunk, TypedAction } from "../types";
import { UserRole } from "../users/users";
import { auth } from "../../api/auth";
import { push } from "connected-react-router";

export const UPDATE_AUTH_STATE = "AUTH/UPDATE_AUTH_STATE";
export type AuthActions = TypedAction<typeof UPDATE_AUTH_STATE, AuthState>;

export interface Token {
    access: string;
    refresh: string;
    expiresIn: number;
}

interface AuthModel {
    roles: UserRole;
    id: string | number;
    username: string;
    email: string;
    token: Token;
}

export type AuthState = AuthModel | (Partial<AuthModel> & { id: 0 });

const initialState: AuthState = {
    id: 0,
};

export function authentication(login: string, password: string): Thunk {
    return async dispatch => {
        const authState = await auth({ username: login, password: password });

        dispatch(updateAuthState(authState));
    };
}

export function updateAuthState(authState: any): Thunk {
    return async dispatch => {
        window.localStorage.setItem("authState", JSON.stringify(authState));

        dispatch({
            type: UPDATE_AUTH_STATE,
            payload: authState,
        });

        dispatch(push("/users"));
    };
}

export function logout(): Thunk {
    return dispatch => {
        window.localStorage.clear();

        dispatch({
            type: UPDATE_AUTH_STATE,
            payload: initialState,
        });
    };
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case UPDATE_AUTH_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
