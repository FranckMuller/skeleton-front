import { TypedAction } from "../types";

export enum AlertActionTypes {
    Success = "Success",
    Error = "Error",
    Clear = "Clear",
}

export type AlertActions = TypedAction<AlertActionTypes, string>;

export enum AlertType {
    Success = "Success",
    Error = "Error",
}

export type AlertState =
    | {
          type: AlertType;
          message: string;
      }
    | {};

export function alertReducer(state: AlertState = {}, action: AlertActions) {
    switch (action.type) {
        case AlertActionTypes.Success:
            return {
                type: AlertType.Success,
                message: action.payload,
            };
        case AlertActionTypes.Error:
            return {
                type: AlertType.Error,
                message: action.payload,
            };
        case AlertActionTypes.Clear:
            return {};
        default:
            return state;
    }
}
