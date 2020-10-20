import * as React from "react";
import { EditUserConnected } from "../../components/EditUser/EditUserConnected";

import styles from "./EditUserPage.module.scss";

export class EditUserPage extends React.PureComponent {
    public render() {
        return (
            <div className={styles.container}>
                <EditUserConnected />
            </div>
        );
    }
}
