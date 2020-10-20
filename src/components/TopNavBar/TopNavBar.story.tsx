import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import { TopNavBar } from "./TopNavBar";
import React from "react";
import { action } from "@storybook/addon-actions";

storiesOf("TopNavBar", module).add("default", () => {
    return (
        <TopNavBar
            isAuthenticated={boolean("isAuthenticated", false)}
            logout={action("logout")}
            redirectToCreateUser={action("logout")}
        />
    );
});
