import { Redirect, Route, RouteProps } from "react-router";
import React from "react";
import { State } from "../ducks/rootReducer";
import { connect, MapStateToProps } from "react-redux";
import { selectIsAuthenticated } from "../selectors/selectors";

export interface PrivateRouteStateProps {
    isAuthenticated: boolean;
}

export interface PrivateRouteProps extends RouteProps, PrivateRouteStateProps {
    component: React.ComponentType<any>;
}

export function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
    const { isAuthenticated } = rest;

    if (!isAuthenticated) {
        return (
            <Route
                {...rest}
                render={props => (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )}
            />
        );
    }

    return <Route {...rest} render={props => <Component {...props} />} />;
}

const mapStateToProps: MapStateToProps<PrivateRouteStateProps, {}, State> = state => {
    return {
        isAuthenticated: selectIsAuthenticated(state),
    };
};

export const PrivateRouteConnected = connect(mapStateToProps)(PrivateRoute);
