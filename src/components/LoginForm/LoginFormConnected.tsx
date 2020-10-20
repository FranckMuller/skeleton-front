import { connect, MapDispatchToProps } from "react-redux";
import { LoginForm, LoginFormDispatchProps } from "./LoginForm";
import { authentication } from "../../ducks/auth/auth";

const dispatchProps: MapDispatchToProps<LoginFormDispatchProps, {}> = {
    authentication: authentication,
};

export const LoginFormConnected = connect(
    undefined,
    dispatchProps,
)(LoginForm);
