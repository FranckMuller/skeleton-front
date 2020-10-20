import * as React from "react";
import { Button, Chip, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

import styles from "./EditUser.module.scss";
import { isRegisteredUser, NewUser, User, UserRole } from "../../ducks/users/users";

export type EditUserStateProps = Partial<User>;

export interface EditUserDispatchProps {
    onSave: (user: User | NewUser) => void;
    onCancel: () => void;
    onDelete: (id: string) => void;
}

export type EditUserProps = EditUserStateProps & EditUserDispatchProps;

export interface EditUserState extends Partial<User> {
    repeatPassword: string;
}

export class EditUser extends React.PureComponent<EditUserProps, EditUserState> {
    constructor(props: EditUserProps) {
        super(props);

        const { username = "", email = "", password = "", roles = [], id } = props;

        this.state = {
            id: id,
            username: username,
            email: email,
            roles: roles,
            password: password,
            repeatPassword: "",
        };
    }

    public render() {
        const { email, username, roles, password, repeatPassword } = this.state;

        const { onCancel } = this.props;

        return (
            <div>
                <div className={styles.editUserContainer}>
                    <TextField
                        value={username}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleChange("username")}
                    />
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="select-multiple-chip">Roles</InputLabel>
                        <Select
                            multiple
                            value={roles}
                            onChange={this.handleChange("roles")}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected: any) => (
                                <div>
                                    {(selected as string[]).map(value => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </div>
                            )}
                        >
                            {Object.values(UserRole).map(role => (
                                <MenuItem value={role} key={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        value={email}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        onChange={this.handleChange("email")}
                    />
                    <div className={styles.passwordsContainer}>
                        <TextField
                            value={password}
                            onChange={this.handleChange("password")}
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                        />
                        <TextField
                            value={repeatPassword}
                            onChange={this.handleChange("repeatPassword")}
                            label="Repeat password"
                            variant="outlined"
                            type="password"
                            fullWidth
                        />
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <div className={styles.buttonsGroup}>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth={false}
                            size="large"
                            onClick={this.onDelete}
                        >
                            Remove
                        </Button>
                    </div>
                    <div className={styles.buttonsGroup}>
                        <Button variant="contained" color="default" fullWidth={false} size="large" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth={false}
                            size="large"
                            onClick={this.onSave}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    private handleChange = (name: keyof EditUserState) => (
        event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>,
    ) => {
        event.preventDefault();
        this.setState({ ...this.state, [name]: event.target.value || event.target.name });
    };

    private getUser = (): User => {
        const { username, roles, password, email } = this.state;
        const { id } = this.props;

        const user = {
            id,
            email,
            username,
            roles,
            password,
        };

        return user as User;
    };

    private onDelete = () => {
        const user = this.getUser();

        if (isRegisteredUser(user)) {
            this.props.onDelete(user.id);
        }
    };

    private onSave = () => {
        this.props.onSave(this.getUser());
    };
}
