import React from "react";
import { Button, AppBar, Toolbar } from "@material-ui/core";

import styles from "./TopNavBar.module.scss";

export interface TopNavBarStateProps {
    isAuthenticated: boolean;
}

export interface TopNavBarDispatchProps {
    logout: () => void;
    redirectToCreateUser: () => void;
}

export type TopNavBarProps = TopNavBarStateProps & TopNavBarDispatchProps;

export class TopNavBar extends React.PureComponent<TopNavBarProps> {
    public render() {
        const { isAuthenticated, logout, redirectToCreateUser } = this.props;

        return (
            <AppBar position="static">
                <Toolbar className={styles.toolbarContainer}>
                    <div>
                        {isAuthenticated && (
                            <Button color="inherit" href={"/users"}>
                                Users
                            </Button>
                        )}
                    </div>

                    {isAuthenticated && (
                        <div>
                            <Button color="inherit" onClick={redirectToCreateUser}>
                                Create user
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}
