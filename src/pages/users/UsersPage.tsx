import * as React from "react";

import styles from "./UsersPage.module.scss";
import { UsersListConnected } from "../../components/UsersList/UsersListConnected";

export class UsersPage extends React.PureComponent {
    public render() {
        return (
            <div className={styles.container}>
                <UsersListConnected />
            </div>
        );
    }
}
