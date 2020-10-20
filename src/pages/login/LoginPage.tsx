import * as React from "react";
import { LoginFormConnected } from "../../components/LoginForm/LoginFormConnected";
import styles from "./LoginPage.module.scss";

export class LoginPage extends React.PureComponent {
    public render() {
        return (
            <div className={styles.loginPageContainer}>
                <div className={styles.loginForm}>
                    <LoginFormConnected />
                </div>
            </div>
        );
    }
}
