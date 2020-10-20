import { State } from "../ducks/rootReducer";
import { Dispatch } from "redux";

interface ApiUtils {
    dispatch: any;
    getState: () => State;
}

const apiUtils: ApiUtils = {
    dispatch: () => null as any,
    getState: () => ({} as State),
};

export function initApiUtils(dispatch: Dispatch, getState: () => State) {
    apiUtils.dispatch = dispatch;
    apiUtils.getState = getState;
}

export function getApiUtils() {
    return apiUtils;
}
