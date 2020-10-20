import * as React from "react";
import MaterialTable, { Column, QueryResult } from "material-table";
import { tableIcons } from "./tableIcons";
import Edit from "@material-ui/icons/Edit";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { User } from "../../ducks/users/users";

import styles from "./UsersList.module.scss";

export interface UsersListStateProps {
    users: User[];
}

export interface UsersListDispatchProps {
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
    onQuery: () => void;
}

export type UsersListProps = UsersListStateProps & UsersListDispatchProps;

const columns: Column<User>[] = [
    { title: "Email", field: "email" },
    { title: "Username", field: "username" },
    { title: "Roles", field: "roles" },
];

export class UsersList extends React.PureComponent<UsersListProps> {
    public componentDidMount(): void {
        this.props.onQuery();
    }

    public render() {
        const { onEdit, onDelete } = this.props;
        const updateMaterialTableKey = `MaterialTable_UPDATE_KEY${Math.random()}`;

        return (
            <div className={styles.container}>
                <MaterialTable
                    title="Users"
                    key={updateMaterialTableKey}
                    icons={tableIcons}
                    columns={columns}
                    data={this.getUsersData}
                    onChangePage={this.onChangePage}
                    actions={[
                        {
                            tooltip: "Edit",
                            icon: () => <Edit />,
                            onClick: (e, user) => onEdit(user as User),
                        },
                        {
                            tooltip: "Remove",
                            icon: () => <DeleteOutline />,
                            onClick: (e, user) => onDelete((user as User).id),
                        },
                    ]}
                />
            </div>
        );
    }

    private getUsersData = (): Promise<QueryResult<User>> => {
        return Promise.resolve({
            data: this.props.users,
            totalCount: 100,
            page: 0,
        });
    };

    private onChangePage = (page: number) => {
        // this.props.onQuery({ page: page });
    };
}
