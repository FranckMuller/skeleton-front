import { storiesOf } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import React from "react";
import { action } from "@storybook/addon-actions";

storiesOf("LoginForm", module).add("default", () => {
    return (
        <div
            style={{
                margin: 40,
                maxWidth: 450,
            }}
        >
            <LoginForm authentication={action("authentication")} />
        </div>
    );
});
