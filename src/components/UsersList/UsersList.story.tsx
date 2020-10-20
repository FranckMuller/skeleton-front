import { storiesOf } from "@storybook/react";
import { UsersList } from "./UsersList";
import React from "react";
import { action } from "@storybook/addon-actions";
import { UserRole } from "../../ducks/users/users";

storiesOf("UsersList", module).add("default", () => {
    const users = [
        { id: "1", username: "Тест Тестович", email: "Wtf2019", roles: [UserRole.ROLE_ADMIN], password: "Master" },
        {
            id: "1",
            username: "Тест Тестович",
            email: "Wtf2019",
            roles: [UserRole.ROLE_CONTRIBUTOR, UserRole.ROLE_ADMIN],
            password: "Master",
        },
    ];

    const onEdit = action("onEdit");
    const onDelete = action("onDelete");
    const onQuery = action("onQuery");

    return <UsersList users={users} onEdit={onEdit} onDelete={onDelete} onQuery={onQuery} />;
});
