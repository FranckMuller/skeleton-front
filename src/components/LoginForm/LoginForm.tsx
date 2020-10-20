import * as React from "react";
import { Button, TextField } from "@material-ui/core";

import styles from "./LoginForm.module.scss";

export interface LoginFormDispatchProps {
    authentication: (login: string, password: string) => void;
}

export type LoginFormProps = LoginFormDispatchProps;

export interface LoginFormState {
    login: string;
    password: string;
}

export class LoginForm extends React.PureComponent<LoginFormProps, LoginFormState> {
    state = {
        login: "",
        password: "",
    };

    public render() {
        return (
            <div className={styles.loginContainer}>
                <TextField
                    className={styles.input}
                    label="Логин"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("login")}
                />
                <TextField
                    className={styles.input}
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    onChange={this.handleChange("password")}
                    fullWidth
                />
                <Button
                    className={styles.loginContainer}
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    size="large"
                    onClick={this.authentication}
                >
                    Войти
                </Button>
            </div>
        );
    }

    private handleChange = (name: keyof LoginFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [name]: event.target.value || event.target.name });
    };

    private authentication = () => {
        const { authentication } = this.props;
        const { login, password } = this.state;

        if (!login || !password) {
            return;
        }

        authentication(login, password);
    };
}
