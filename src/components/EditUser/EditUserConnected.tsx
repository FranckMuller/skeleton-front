import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { EditUser, EditUserDispatchProps, EditUserStateProps } from "./EditUser";
import { State } from "../../ducks/rootReducer";
import { selectActiveUser } from "../../selectors/selectors";
import { cancelChanges, deleteUserAction, saveChanges } from "../../ducks/users/users";

const mapStateToProps: MapStateToProps<EditUserStateProps, {}, State> = state => {
    const user = selectActiveUser(state)!;

    return {
        ...user,
    };
};

const dispatchProps: MapDispatchToProps<EditUserDispatchProps, {}> = {
    onCancel: cancelChanges,
    onSave: saveChanges,
    onDelete: deleteUserAction,
};

export const EditUserConnected = connect(
    mapStateToProps,
    dispatchProps,
)(EditUser);
