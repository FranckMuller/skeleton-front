import { Thunk, TypedAction } from "../types";
import { push } from "connected-react-router";
import { createUser, deleteUser, queryAllUsers, updateUser } from "../../api/users";
import { selectUsers } from "../../selectors/selectors";

export const UPDATE_USERS = "USERS/UPDATE_USERS";
export const SET_ACTIVE_USER = "USERS/SET_ACTIVE_USER";
export type UsersActions = TypedAction<typeof UPDATE_USERS, User[]> | TypedAction<typeof SET_ACTIVE_USER, User>;

export enum UserRole {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_CONTRIBUTOR = "ROLE_CONTRIBUTOR",
}

export interface NewUser {
    username: string;
    email: string;
    roles: UserRole[];
    password?: string;
}

export interface User extends NewUser {
    id: string;
}

export function isRegisteredUser(arg: any): arg is User {
    return arg.id !== undefined;
}

export interface UsersState {
    users: User[];
    activeUser?: User;
}

export const initialState = {
    users: [],
};

export function cancelChanges(): Thunk {
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_USER,
            payload: undefined,
        });

        dispatch(push("/users"));
    };
}

export function saveChanges(user: User | NewUser): Thunk {
    return async (dispatch, getState) => {
        if (!isRegisteredUser(user)) {
            return dispatch(createNewUser(user));
        }

        await updateUser(user);

        const oldUsers = selectUsers(getState());
        const users = oldUsers.map(u => (u.id === user.id ? user : u));

        dispatch({
            type: UPDATE_USERS,
            payload: users,
        });

        dispatch(push("/users"));
    };
}

export function createNewUser(user: NewUser): Thunk {
    return async dispatch => {
        await createUser(user);
        dispatch(push("/users"));
    };
}

export function deleteUserAction(id: string): Thunk {
    return async (dispatch, getState) => {
        await deleteUser(id);
        const oldUsers = selectUsers(getState());

        dispatch({
            type: UPDATE_USERS,
            payload: oldUsers.filter(user => user.id !== id),
        });

        dispatch(push("/users"));
    };
}

export function queryUsers(): Thunk {
    return async (dispatch, getState) => {
        const users = await queryAllUsers({});
        dispatch({
            type: UPDATE_USERS,
            payload: users,
        });
    };
}

export function setActiveUser(user?: User): Thunk {
    return async (dispatch, getState) => {
        dispatch(push("/users/edit"));

        dispatch({
            type: SET_ACTIVE_USER,
            payload: user,
        });
    };
}

export function usersReducer(state: UsersState = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case UPDATE_USERS:
            return { ...state, users: action.payload };
        case SET_ACTIVE_USER:
            return { ...state, activeUser: action.payload };
        default:
            return state;
    }
}
