import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { UsersList, UsersListDispatchProps, UsersListStateProps } from "./UsersList";
import { State } from "../../ducks/rootReducer";
import { deleteUserAction, queryUsers, setActiveUser } from "../../ducks/users/users";
import { selectUsers } from "../../selectors/selectors";

const mapStateToProps: MapStateToProps<UsersListStateProps, {}, State> = state => {
    const users = selectUsers(state)!;

    return {
        users,
    };
};

const dispatchProps: MapDispatchToProps<UsersListDispatchProps, {}> = {
    onDelete: deleteUserAction,
    onEdit: setActiveUser,
    onQuery: queryUsers,
};

export const UsersListConnected = connect(
    mapStateToProps,
    dispatchProps,
)(UsersList);
