import { withKnobs } from "@storybook/addon-knobs";
import { configure, addDecorator } from "@storybook/react";

const req = require.context("../src", true, /\.story\.tsx?$/);

function loadStories() {
    require("../src/index.scss");
    req.keys().forEach(req);
}

addDecorator(withKnobs);
configure(loadStories, module);
