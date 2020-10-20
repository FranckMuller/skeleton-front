import { State } from "../ducks/rootReducer";

export function selectIsAuthenticated(state: State) {
    return !!state.auth.id;
}

export function selectActiveUser(state: State) {
    return state.users.activeUser;
}

export function selectUsers(state: State) {
    return state.users.users;
}
