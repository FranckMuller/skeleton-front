import { Action } from "redux";
import { State } from "./rootReducer";

export interface TypedAction<T, P> extends Action<T> {
    payload: P;
}

export type GetState = () => State;
export type Dispatch<A = TypedAction<any, any>> = (action: A | Thunk<A>) => void;

export type Thunk<A = TypedAction<any, any>> = (dispatch: Dispatch<A>, getState: GetState) => void;
