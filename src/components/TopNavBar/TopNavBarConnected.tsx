import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { State } from "../../ducks/rootReducer";
import { selectIsAuthenticated } from "../../selectors/selectors";
import { TopNavBar, TopNavBarDispatchProps, TopNavBarStateProps } from "./TopNavBar";
import { logout } from "../../ducks/auth/auth";
import { setActiveUser } from "../../ducks/users/users";

const mapStateToProps: MapStateToProps<TopNavBarStateProps, {}, State> = state => {
    return {
        isAuthenticated: selectIsAuthenticated(state),
    };
};

const dispatchProps: MapDispatchToProps<TopNavBarDispatchProps, {}> = {
    logout: logout,
    redirectToCreateUser: setActiveUser,
};

export const TopNavBarConnected = connect(
    mapStateToProps,
    dispatchProps,
)(TopNavBar);
