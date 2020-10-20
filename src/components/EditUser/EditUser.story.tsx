import { storiesOf } from "@storybook/react";
import { EditUser } from "./EditUser";
import React from "react";
import { action } from "@storybook/addon-actions";
import { User, UserRole } from "../../ducks/users/users";

storiesOf("EditUser", module).add("default", () => {
    const user: User = {
        username: "Denis",
        email: "rozum",
        roles: [UserRole.ROLE_ADMIN, UserRole.ROLE_CONTRIBUTOR],
        password: "",
        id: "1",
    };

    return (
        <div
            style={{
                margin: 40,
                maxWidth: 450,
            }}
        >
            <EditUser {...user} onSave={action("save")} onCancel={action("cancel")} onDelete={action("delete")} />
        </div>
    );
});
